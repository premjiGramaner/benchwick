import React, { useContext } from 'react'
import { ISideBarInterface } from '@Utils/interface/ReusableComponentInterface/SideBarInterface'
import upload from '@Assets/svg/upload.svg'
import { useRef } from 'react';
import { IDefaultPageProps } from '@Interface/PagesInterface';
import { imageVariation } from '@Reducers/imageVariationReducer';
import { ImageContext } from "src/router/context-provider";

const SideBarSection: React.FC<ISideBarInterface & IDefaultPageProps> = props => {
  const fileInput = useRef();
  const { dashboardResult, fetching, setFetching, setDashboardResult } = useContext(ImageContext);
  const { image, range } = dashboardResult || {};

  const handleUpload = event => {
    if (props.handleImage) {
      props.handleImage(event.target.files[0])
    } else {
      setDashboardResult({ image: event.target.files[0] })
    }
  }

  const { isFormValid } = props;
  const isFormDisabled = (fetching) ? fetching : (isFormValid === undefined ? !image : isFormValid);

  const imageEnvision = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isFormDisabled) {
      if (props?.envisionUploadHandle) {
        props.envisionUploadHandle(e);
      } else {
        let formData = new FormData()
        formData.append('image', image)
        formData.append('variants', range)
        props.dispatch(imageVariation({ body: formData, setFetching }))
      }
    }
  }

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
                  disabled={fetching}
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
