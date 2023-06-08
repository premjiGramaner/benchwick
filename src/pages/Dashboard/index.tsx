import React from 'react';

import { IDefaultPageProps } from '@Utils/interface/PagesInterface';
import { URLS } from '@Utils/constants';


const DashboardComponent: React.FC<IDefaultPageProps> = (props) => {

    const sampleFunctionForOnLogOut = () => {
        // Do the logout API call and get the success result
        localStorage.clear();
        props.navigate(URLS.LOGIN)
    }

    return (
        <div className='dashboard-page-main-container'>
            Dashboard Component
            <button className='btn btn-primary' onClick={sampleFunctionForOnLogOut}>Logout</button>
        </div>
    )
};

export default DashboardComponent;