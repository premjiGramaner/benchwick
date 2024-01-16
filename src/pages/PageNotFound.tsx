import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { URLS } from '@Utils/constants'
import { IDefaultPageProps } from '@Utils/interface';
import { Oops } from "@Images/index";
import { IS_USER_AUTHENTICATED } from '@Utils/storage';

const pageNotFound: React.FC<IDefaultPageProps> = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!IS_USER_AUTHENTICATED()) {
            navigate(URLS.DEFAULT)
        }
    }, [])

    return (
        <div className='page-not-found'>
            <div className='image-container'><img src={Oops} alt="page-not-found" /></div>
            <div className='page-not-available-label'>Page your are looking is not found</div>
            <div className='back-to-home' onClick={() => navigate(URLS.DEFAULT)}>back to home?</div>
        </div>
    )
};

export default pageNotFound;