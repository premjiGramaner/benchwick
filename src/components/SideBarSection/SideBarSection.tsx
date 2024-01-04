import React,{ useRef} from 'react'
import { ISideBarInterface } from '@Utils/interface/ReusableComponentInterface/SideBarInterface'
import upload from '@Assets/svg/upload.svg'

const SideBarSection: React.FC<ISideBarInterface> = props => {

  const fileInput = useRef()
  const handleUpload = event => {
    props.handleImage(event.target.files[0])
  }
  const { isFormValid } = props;
  
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
            <div className="btn-height" onClick={props.envisionUploadHandle}>
              <a href="#"  className={`btn btn-envision ${(isFormValid ) && 'disabled'} `}>
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
              ? 'btn btn-envision-border'
              : 'btn btn-envision-border opacity'
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
