import React from 'react'
import { ISideBarInterface } from '@Utils/interface/ReusableComponentInterface/SideBarInterface'
import upload from '@Assets/svg/upload.svg'

const SideBarSection: React.FC<ISideBarInterface> = props => {
  return (
    <div className="sidebar-section">
      <div className="card card-section">
        <div className="text-center inner-card-section">
          <div className="fs-19">Upload Images</div>
          <div className="text-center upload-image">
            <img src={upload} alt="img" />
          </div>

          <div className="card-body">
            <div className="d-flex align-items-center fs-13">
              <h5 className="card-title">Drag files to</h5>
              <a className="px-1 mt-2" href="#" type="file">
                <u> upload</u>
              </a>
              <h5 className="px-1 card-title">or</h5>
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
      <div className='view-history'>
        <button
         className={
          props.enable
            ? 'btn btn-gramener-border'
            : 'btn btn-gramener-border opacity'
        }
          onClick={props.handleViewHistory}
          disabled ={!props.enable}
        >
          View History
        </button>
      </div>
    </div>
  )
}

export default SideBarSection
