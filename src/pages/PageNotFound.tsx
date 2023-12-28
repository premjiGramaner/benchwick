import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { URLS } from '@Utils/constants'

import { logout } from '../reducers/loginReducer'

import { IDefaultPageProps } from '@Utils/interface';

const pageNotFound: React.FC<IDefaultPageProps> = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        navigate(URLS.LOGIN)
        dispatch(logout({}))
        localStorage.clear()
    }, []);
    
    return (
        <>
        </>
    )
};

export default pageNotFound;