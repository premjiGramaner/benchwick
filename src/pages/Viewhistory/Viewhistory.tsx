import React from 'react'
import HeaderSection from '@Components/HeaderSection/HeaderSection'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { URLS } from '@Utils/constants'

const Viewhistory: React.FC<IDefaultPageProps> = props => {
  const handleLogout = () => {
    // Do the logout API call and get the success result
    localStorage.clear()
    props.navigate(URLS.LOGIN)
  }
const handleBackToDashBoard = () => {
    props.navigate(URLS.DASHBOARD)
}
  return (
    // <div className='dashboard-page-main-container'>
    <div>
      <HeaderSection handleLogout={handleLogout} />
      <div className="d-flex">
        <SideBarSection  enable={false}/>
        <div>
            <button onClick={handleBackToDashBoard}>Back to dashboard</button>
        View History Component</div>
      </div>
    </div>
  )
}

export default Viewhistory
