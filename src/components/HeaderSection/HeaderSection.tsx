import React from 'react'
import { useDispatch } from 'react-redux'
import user from '@Assets/svg/user.svg'
import logoutIcon from '@Assets/svg/logout.svg'
import { useNavigate } from 'react-router-dom'
import { URLS } from '@Utils/constants'
import { logout } from '../../reducers/loginReducer'
import { getLoggedUserName } from '@Utils/storage'
import { EnvHeaderLogo } from '@Assets/images'
// import { socket } from '@Sw/default'

const HeaderSection: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = getLoggedUserName() || "Unknow user";

  const handleLogout = () => {
    dispatch(logout({}));
    localStorage.clear();
    sessionStorage.clear();
    navigate(URLS.LOGIN);
    // socket.disconnect()
  }

  return (
    <div className="header-section">
      <section className="bg-placeholder">
        <img src={EnvHeaderLogo} alt="envision logo" className='app-logo' />
        <div className="mb-0 px-5 d-flex justify-content-end align-middle user-section">
          <p className="mb-0 fs-12 text-white user-align">Welcome, {userName}</p>
          <img className="icon-size mt-1 px-2" alt="icons" src={user} />
          <img
            className="icon-size mt-1 px-2 mr-2"
            alt="icons"
            src={logoutIcon}
            onClick={() => handleLogout()}
          />
        </div>
      </section>
    </div>
  )
}

export default HeaderSection
