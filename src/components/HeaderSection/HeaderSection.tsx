import React from 'react'
import { useDispatch } from 'react-redux'
import user from '@Assets/svg/user.svg'
import logoutIcon from '@Assets/svg/logout.svg'
import { useNavigate } from 'react-router-dom'
import { URLS } from '@Utils/constants'
import { logout } from '../../reducers/loginReducer'
import { getLoggedUserName } from '@Utils/storage'

const HeaderSection: React.FC<{}> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = getLoggedUserName();
  const handleLogout = () => {
    navigate(URLS.LOGIN)
    dispatch(logout({}))
    localStorage.clear()
  }
  
  return (
    <div className="header-section">
      <section className="bg-placeholder">
        <div className="mb-0 px-5 d-flex justify-content-end align-middle user-section">
          <p className="mb-0 fs-12 text-white user-align">Welcome, { userName }</p>
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
