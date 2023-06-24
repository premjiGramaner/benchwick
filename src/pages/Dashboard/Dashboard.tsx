import React, { useEffect, useState } from 'react'
import HeaderSection from '@Components/HeaderSection/HeaderSection'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { URLS } from '@Utils/constants'
import close from '@Assets/svg/close.svg'
import 
  Download
from '@Assets/images/Download.png';
import { login } from 'src/reducers'
import { useDispatch } from 'react-redux'
const Dashboard: React.FC<IDefaultPageProps> = props => {
  const [file, setFile] = useState('')
  const [range, setRange] = useState(9)
  const [name, setName] = useState('')
  const [modal, setModal] = useState(false)
  const [variationmodal, setvariationModal] = useState(false)
  const dispatch=useDispatch();
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
  const handleImage = data => {
    setFile(data)
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
  var selectedVariation = []
  const handleSelectedVariation = event => {
    var formData
    if (event.target.checked) {
      formData = {
        image_id: event?.target?.value,
        checked: true,
      }
      selectedVariation.push(formData)
    } else {
      selectedVariation = selectedVariation.filter(
        item => item.image_id !== event?.target?.value
      )
    }
  }
  const handleImagepopup = (e) =>{
    e.preventDefault()
    setvariationModal(!variationmodal)
  }
  const handleVariationCancel=(e)=>{
    e.preventDefault()
    setvariationModal(!variationmodal)
  }
  const handleImageDownload=()=>{
    var element = document.createElement("a");
    //If given url from api we have to use this
    // var imageFile = new Blob(
    //   [
    //     "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
    //   ],
    //   { type: "image/*" }
    // );
    // element.href = URL.createObjectURL(file);
    element.href = file;
    element.download = "image.png";
    element.click();
  }

  const variationdummyData = [
    {
      id: 1,
      image: file,
    },
    {
      id: 2,
      image: file,
    },
    {
      id: 3,
      image: file,
    },
    {
      id: 4,
      image: file,
    },
    {
      id: 5,
      image: file,
    },
    {
      id: 6,
      image: file,
    },
    {
      id: 7,
      image: file,
    },
    {
      id: 8,
      image: file,
    },
    {
      id: 9,
      image: file,
    },
  ]

  return (
    <div className="dashboard-page-main-container">
      <HeaderSection handleLogout={handleLogout} />
      <div className="d-flex">
        <SideBarSection
          handleViewHistory={handleViewHistory}
          enable={true}
          handleImage={handleImage}
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
            <div className="btn-height pt-5">
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
            {variationdummyData.length > 0 ? (
              variationdummyData.map(value => {
                return (
                  <div className="variation-image">
                    <div className="circle-style">
                      <input
                        type="checkbox"
                        value={value.id}
                        onChange={handleSelectedVariation}
                      />
                    </div>
                    <img
                      className="vimage-style"
                      src={value.image}
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
                  <div className="fs-12">Number of variation selected:</div>
                  <div className="fs-12 fw-bold">4</div>
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
                <button type="button" className="btn btn-gramener">
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
      </div>

      <div className="modal mt-5" style={{ display: variationmodal ? 'block' : 'none' }}>
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
              <div >
              <img
                    className="download-style"
                    src={Download}
                    alt="original image"
                  onClick={handleImageDownload}
                  />
                 <button type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleVariationCancel}
              ></button></div>
           
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
