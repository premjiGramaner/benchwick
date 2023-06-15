import React, { useState } from 'react'
import { ISideBarInterface } from '@Utils/interface/ReusableComponentInterface/SideBarInterface'
import upload from '@Assets/svg/upload.svg'
import { useRef } from 'react'
const SideBarSection: React.FC<ISideBarInterface> = props => {
  const fileInput = useRef()
  const handleUpload = event => {
    props.handleImage(URL.createObjectURL(event.target.files[0]))
  }

  return (
    <div className="sidebar-section">
      <div className="card card-section">
        <div className="text-center inner-card-section">
          {/* <img src={file} alt="img" /> */}
          <div className="fs-19">Upload Images</div>
          <div className="text-center upload-image">
            <img src={upload} alt="img" />
          </div>

          <div className="card-body">
            <div className="d-flex fs-13 fw-bold align-items-center ">
              <h5 className="card-title">Drag files to</h5>
              <div>
                <label htmlFor="input-file" className="px-2 upload-text">
                  upload
                </label>
                <input
                  ref={fileInput}
                  id="input-file"
                  type="file"
                  className="d-none"
                  onChange={handleUpload}
                />
              </div>
              <h5 className="px-2 card-title">or</h5>
            </div>

            <p className="card-text fs-10">Limit 200MB per file | PNG</p>
            <div className="btn-height">
              <a href="#" className="btn btn-gramener">
                ENVISION
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="view-history">
        <button
          className={
            props.enable
              ? 'btn btn-gramener-border'
              : 'btn btn-gramener-border opacity'
          }
          onClick={props.handleViewHistory}
          disabled={!props.enable}
        >
          View History
        </button>
      </div>
    </div>
  )
}

export default SideBarSection
