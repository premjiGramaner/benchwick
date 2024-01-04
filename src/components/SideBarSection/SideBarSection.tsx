import React, { useState } from 'react'
import { ISideBarInterface } from '@Utils/interface/ReusableComponentInterface/SideBarInterface'
import upload from '@Assets/svg/upload.svg'
import { useRef } from 'react';
import { IDefaultPageProps } from '@Interface/PagesInterface';
import { imageVariation } from '@Reducers/imageVariationReducer';

const SideBarSection: React.FC<ISideBarInterface & IDefaultPageProps> = props => {
  const fileInput = useRef();
  const [imageItem, setImageItem] = useState<File | null>(null)
  const range = localStorage.getItem('variation_range') || "4";

  const handleUpload = event => {
    if (props.handleImage) {
      props.handleImage(event.target.files[0])
    } else {
      setImageItem(event.target.files[0])
    }
  }

  const imageEnvision = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (props?.envisionUploadHandle) {
      props.envisionUploadHandle(e);
    } else {
      let formData = new FormData()
      formData.append('image', imageItem)
      formData.append('variants', range)
      props.dispatch(imageVariation(formData))
    }
  }

  const { isFormValid } = props;
  const isFormDisabled = isFormValid === undefined ? !imageItem : isFormValid;

  return (
    <div className="sidebar-section"  >
      <div className="card card-section">
        <div className="text-center inner-card-section">
          <div className="fs-19">Upload Images</div>
          <label htmlFor="input-file" className="text-center upload-image">
            <img src={upload} alt="img" />
          </label>

          <div className="card-body">
            <div className="d-flex fs-13 fw-bold align-items-center ">
              <h5 className="px-2 card-title">or</h5>
              <h5 className="card-title">Drag files to</h5>
              <div>
                <label htmlFor="input-file" className="px-2 upload-text">
                  upload
                </label>
                <input
                  disabled={!props.enable}
                  value=""
                  ref={fileInput}
                  id="input-file"
                  type="file"
                  className="d-none"
                  onChange={handleUpload}
                />
              </div>
            </div>

            <p className="card-text fs-10">Limit 200MB per file | PNG</p>
            <div className="btn-height" onClick={imageEnvision}>
              <a href="#" className={`btn btn-envision ${(isFormDisabled) && 'disabled'}`}>
                ENVISION
              </a>
            </div>
          </div>
        </div >
      </div >
      <div className="view-history">
        <button
          className={
            props.enable
              ? 'btn btn-envision-border'
              : 'btn btn-envision-border opacity'
          }
          onClick={props.handleViewHistory}
          disabled={!props.enable}
        >
          View History
        </button>
      </div>
    </div >
  )
}

export default SideBarSection
