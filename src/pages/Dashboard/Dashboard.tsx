import React, { useEffect, useState } from 'react'
import HeaderSection from '@Components/HeaderSection/HeaderSection'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { URLS } from '@Utils/constants'
import close from '@Assets/svg/close.svg'
import Download from '@Assets/images/Download.png'
import { login } from 'src/reducers'
import { useDispatch } from 'react-redux'
import { imageVariation } from 'src/reducers/imageVariationReducer'
import {
  IImageVariationReducerState,
  IReducerState,
} from '@Interface/StoreInterface'
import { useSelector } from 'react-redux'
import { saveEnvision } from 'src/reducers/saveEnvisionReducer'
import toast, { Toaster } from 'react-hot-toast'
const Dashboard: React.FC<IDefaultPageProps> = props => {
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')
  const [range, setRange] = useState('9')
  const [name, setName] = useState('')
  const [modal, setModal] = useState(false)
  const [variationmodal, setvariationModal] = useState(false)
  const [saveVariationDetails, setsaveVariationDetails] = useState([])
  const { imageInfo, statusCode } = useSelector(
    (state: IReducerState) => state.imageVariationReducer
  )
  const { envsionStatusCode } = useSelector(
    (state: IReducerState) => state.saveEnvisionReducer
  )
  useEffect(() => {
    if (statusCode === 200) {
      toast.success('Image uploaded Successfully!')
    } else {
      toast.error('Facing issue while uploading')
    }
    if (envsionStatusCode === 200) {
      toast.success('Variation saved successfully!')
    } else {
      toast.error('Facing issue while saving')
    }
  }, [statusCode, envsionStatusCode])
  const handleLogout = () => {
    // Do the logout API call and get the success result
    // localStorage.clear()
    // dispatch(
    //   login({
    //     userName: "",
    //     password: "",
    //   })
    // )

    props.navigate(URLS.LOGIN)
  }
  const handleViewHistory = e => {
    e.preventDefault()
    props.navigate(URLS.VIEWHISTORY)
  }
  const envisionUploadHandle = () => {
    let formData = new FormData()
    formData.append('image', image)
    formData.append('variants', range)
    props.dispatch(imageVariation(formData))
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
  const handleImageClose = () => {
    setFile('')
  }
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
  const handleImagepopup = e => {
    e.preventDefault()
    setvariationModal(!variationmodal)
  }
  const handleVariationCancel = e => {
    e.preventDefault()
    setvariationModal(!variationmodal)
  }
  const handleImageDownload = () => {
    var element = document.createElement('a')
    //If given url from api we have to use this
    // var imageFile = new Blob(
    //   [
    //     "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
    //   ],
    //   { type: "image/*" }
    // );
    // element.href = URL.createObjectURL(file);
    element.href = file
    element.download = 'image.png'
    element.click()
  }
  const handleSaveClick = () => {
    let formData = new FormData()
    formData.append('image', image)
    formData.append('variants', saveVariationDetails.length.toString())
    formData.append('variantList', saveVariationDetails.toString())
    formData.append('name', name)
    props.dispatch(saveEnvision(formData))
    //success failure close and tost
    // setModal(!modal)
  }

  return (
    <div className="dashboard-page-main-container">
      <HeaderSection handleLogout={handleLogout} />
      <div className="d-flex">
        <SideBarSection
          handleViewHistory={handleViewHistory}
          enable={true}
          handleImage={handleImage}
          envisionUploadHandle={envisionUploadHandle}
        />
        <div className="original-image-container">
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
              <div htmlFor="customRange2" className="variation-text">
                Number of Variations
              </div>
              <input
                type="range"
                className="form-range form-control"
                min="0"
                max="9"
                id="customRange2"
                onChange={handleRange}
              ></input>
            </div>
            <div className="d-flex justify-content-between">
              <div></div>
              <div>{range}</div>
            </div>
            <div className="btn-height pt-5" onClick={envisionUploadHandle}>
              <a href="#" className="btn btn-gramener">
                Generate Variations
              </a>
            </div>
            <div className="btn-height">
              <button
                className="btn btn-gramener"
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
              imageInfo?.data?.data?.info.map(value => {
                return (
                  <div className="variation-image">
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
                      src={value.image_url}
                      alt="original image"
                      onClick={handleImagepopup}
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
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      <div className="modal" style={{ display: modal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-container">
          <div className="">
            <div className="d-flex justify-content-between">
              <div className="">
                <div>
                  <h5
                    className="modal-title fs-12 fw-bold"
                    id="exampleModalLabel"
                  >
                    Save Selection
                  </h5>
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
            <div className="modalbody">
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
                  className="btn btn-gramener"
                  onClick={handleSaveClick}
                >
                  SAVE
                </button>
              </div>
              <div className="save-button">
                <button
                  type="button"
                  className="btn btn-gramener-border"
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
        style={{ display: variationmodal ? 'block' : 'none' }}
      >
        <div className="modal-dialog ">
          <div className="variation-modal-container">
            <div className="d-flex justify-content-between">
              <div className="">
                <div>
                  <h5
                    className="modal-title fs-12 fw-bold"
                    id="exampleModalLabel"
                  >
                    Variation
                  </h5>
                </div>
                <div className="d-flex">
                  <div className="fs-12">Number 1</div>
                  {/* <div className="fs-12 fw-bold">4</div> */}
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
                src={file}
                alt="original image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
