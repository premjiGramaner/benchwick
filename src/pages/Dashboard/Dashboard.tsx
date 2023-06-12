import React from 'react'
import HeaderSection from '@Components/HeaderSection/HeaderSection'
import SideBarSection from '@Components/SideBarSection/SideBarSection'
import { IDefaultPageProps } from '@Utils/interface/PagesInterface'
import { URLS } from '@Utils/constants'

const Dashboard: React.FC<IDefaultPageProps> = props => {
  const handleLogout = () => {
    // Do the logout API call and get the success result
    localStorage.clear()
    props.navigate(URLS.LOGIN)
  }
  const handleViewHistory=(e) =>{
    e.preventDefault()
    props.navigate(URLS.VIEWHISTORY)
  }

  return (
    // <div className='dashboard-page-main-container'>
    <div>
      <HeaderSection handleLogout={handleLogout} />
      <div className="d-flex">
      <SideBarSection handleViewHistory={handleViewHistory} enable={true}/>
        <div>
        Dashboard Component</div>
      </div>
    </div>
  )
}

export default Dashboard
