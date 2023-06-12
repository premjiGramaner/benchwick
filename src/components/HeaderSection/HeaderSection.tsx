import React from 'react'
import { IHeaderInterface } from '@Utils/interface/ReusableComponentInterface/HeaderInterface'
import headerImage from '@Assets/svg/header@1.5x.svg'
import user from '@Assets/svg/user.svg'
import logout from '@Assets/svg/logout.svg'

const HeaderSection: React.FC<IHeaderInterface> = props => {
  return (
    <div className="header-section">
      <section className="bg-placeholder">
        <div className="mb-0 px-5 d-flex justify-content-end align-middle user-section">
            <p className="mb-0 fs-12 text-white user-align">Welcome, Peter</p>
            <img className="icon-size mt-1 px-2" alt="icons" src={user} />
          <img
            className="icon-size mt-1 px-2 mr-2"
            alt="icons"
            src={logout}
            onClick={props.handleLogout}
          />
        </div>
      </section>
    </div>
  )
}

export default HeaderSection
