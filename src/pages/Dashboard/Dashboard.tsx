import React, { useState } from 'react'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { URLS, API_URL } from '@Utils/constants'
import close from '@Assets/svg/close.svg'
import Download from '@Assets/svg/variant-download.svg'
import { imageVariation } from 'src/reducers/imageVariationReducer'
import {
  IImageVarient,
  IReducerState,
  IVarientModal,
} from '@Interface/StoreInterface'
import { useSelector } from 'react-redux'
import { saveEnvision } from 'src/reducers/saveEnvisionReducer'
import { getFileNameFromURL } from '@Utils/utils'
import toast, { Toaster } from 'react-hot-toast'

const Dashboard: React.FC<IDefaultPageProps> = props => {
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')
  const [range, setRange] = useState('9')
  const [name, setName] = useState('')
  const [modal, setModal] = useState(false)
  const [variationmodal, setvariationModal] = useState<IVarientModal>({
    status: false,
  })
  const [saveVariationDetails, setsaveVariationDetails] = useState([])
  const { imageInfo } = useSelector(
    (state: IReducerState) => state.imageVariationReducer
  )

  const handleViewHistory = e => {
    e.preventDefault()
    props.navigate(URLS.VIEWHISTORY)
  }

  const envisionUploadHandle = () => {
    if (!image) {
      toast.error('Please select an image!')
    } else {
      let formData = new FormData()
      formData.append('image', image)
      formData.append('variants', range)
      props.dispatch(imageVariation(formData))
    }
  }

  const handleImage = data => {
    setFile(URL.createObjectURL(data))
    setImage(data)
  }

  const handleRange = e => {
    setRange(e.target.value)
  }

  const handleSaveSelection = e => {
    e.preventDefault()
    setModal(!modal)
  }

  const handleCancel = e => {
    e.preventDefault()
    setModal(!modal)
  }

  const handleImageClose = () => setFile('')

  let selectedVariation = saveVariationDetails
  const handleSelectedVariation = event => {
    var formData
    if (event.target.checked) {
      formData = {
        image_url: event?.target?.name,
        key: event?.target?.value,
      }
      selectedVariation.push(formData)
    } else {
      selectedVariation = selectedVariation.filter(
        item => item.key !== event?.target?.value
      )
    }

    setsaveVariationDetails(selectedVariation)
  }

  const handleImagepopup = ({ index, image_url }: IImageVarient) => {
    setvariationModal({
      status: true,
      itemIndex: index + 1,
      imageURL: image_url,
    })
  }

  const handleVariationCancel = e => {
    e.preventDefault()
    setvariationModal({ status: false })
  }

  const handleImageDownload = () => {
    //image path required to change
    fetch(API_URL.host+"/"+ variationmodal?.imageURL)
      .then(response => response.blob())
      .then(blob => {
        const element = document.createElement('a')
        element.href = URL.createObjectURL(blob)
        element.download = getFileNameFromURL(API_URL.host+"/"+variationmodal?.imageURL)
        document.body.appendChild(element)
        element.click()

        document.body.removeChild(element)
      })
  }

  const handleSaveClick = () => {
    let formData = new FormData()
    formData.append('image', image)
    formData.append('variants', saveVariationDetails.length.toString())
    formData.append('variantList', JSON.stringify(saveVariationDetails))
    formData.append('name', name)
    props.dispatch(saveEnvision(formData))
    setModal(false)
  }

  return (
    <div className="dashboard-page-main-container">
      <div className="d-flex">
        <SideBarSection
          handleViewHistory={handleViewHistory}
          enable={true}
          handleImage={handleImage}
          envisionUploadHandle={envisionUploadHandle}
        />
        <div className="original-image-container col-md-2">
          <div>
            <div className="image-holder">
              {file ? (
                <div className="original-image">
                  <img
                    className="close-style"
                    src={close}
                    alt="original image"
                    onClick={handleImageClose}
                  />
                  <img
                    className="image-style"
                    src={file}
                    alt="original image"
                  />
                </div>
              ) : (
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Image will appear here
                  </div>
                </div>
              )}
            </div>
            <div className="image-text">Original Image</div>
            <div>
              <div className="variation-text">Number of Variations</div>
              <div className="variation-section">
                <input
                  type="range"
                  className="form-range form-control"
                  min="0"
                  max="9"
                  onChange={handleRange}
                ></input>
                <div>{range}</div>
              </div>
            </div>
            <div className="btn-height pt-5" onClick={envisionUploadHandle}>
              <button className="btn btn-envision" disabled={!range || range && range.toString() == "0"}>
                Generate Variations
              </button>
            </div>
            <div className="btn-height">
              <button
                className="btn btn-envision"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={handleSaveSelection}
              >
                Save Selection
              </button>
            </div>
          </div>
        </div>
        <div className="variation-image-container">
          <div className="variationcontent">
            {imageInfo?.data?.data?.info.length > 0 ? (
              imageInfo?.data?.data?.info.map((value, index) => {
                return (
                  <div className="variation-image" key={index + value.key}>
                    <div className="variation-image-index-circle">
                      <span>{ index+1 }</span>
                    </div>
                    <div className="circle-style">
                      <input
                        type="checkbox"
                        name={value.image_url}
                        value={value.key}
                        onChange={handleSelectedVariation}
                      />
                    </div>
                    <img
                      className="vimage-style"
                      src={`${API_URL.host}/${value.image_url}`}
                      alt="original image"
                      onClick={() => handleImagepopup({ ...value, index })}
                    />
                  </div>
                )
              })
            ) : (
              <div className="variationcontent">
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
                <div className="original-image">
                  <div className="text-center card-details fs-14">
                    Variation will appear here
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="modal" style={{ display: modal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-container">
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <div>
                  <h4
                    className="modal-title fs-12 fw-bold"
                    id="exampleModalLabel"
                  >
                    Save Selection
                  </h4>
                </div>
                <div className="d-flex">
                  <div className="fs-12">Number of variation selected : </div>
                  <div className="fs-12 fw-bold">
                    {' '}
                    {saveVariationDetails.length}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="save-varient-modal-body">
              <div className="fs-12">Name</div>
              <input
                className="name-style"
                type="text"
                placeholder="Selection Name 1"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="footer d-flex justify-content-between">
              <div className="save-button">
                <button
                  type="button"
                  disabled={!(saveVariationDetails.length && !!name)}
                  className="btn btn-envision"
                  onClick={handleSaveClick}
                >
                  SAVE
                </button>
              </div>
              <div className="save-button">
                <button
                  type="button"
                  className="btn btn-envision-border"
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      <div
        className="modal mt-5"
        style={{ display: variationmodal.status ? 'block' : 'none' }}
      >
        <div className="modal-dialog ">
          <div className="variation-modal-container">
            <div className="d-flex justify-content-between">
              <div>
                <div>
                  <h5
                    className="modal-title fs-12 fw-bold"
                    id="exampleModalLabel"
                  >
                    Variation
                  </h5>
                </div>
                <div className="d-flex">
                  <div className="fs-12">
                    Number {variationmodal?.itemIndex || 0}
                  </div>
                </div>
              </div>
              <div>
                <img
                  className="download-style"
                  src={Download}
                  alt="original image"
                  onClick={handleImageDownload}
                />
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleVariationCancel}
                ></button>
              </div>
            </div>
            <div className="variation-modal mt-3">
              <img
                className="variation-style"
                src={`${API_URL.host}/${variationmodal?.imageURL}`}
                alt="original image"
              />
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default Dashboard
