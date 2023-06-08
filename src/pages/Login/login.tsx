import React from 'react';
import { useSelector } from 'react-redux';

import { URLS } from '@Utils/constants';
import actions from "@Store/logIn/actions";
import { getAuthToken, IS_USER_AUTHENTICATED } from '@Utils/storage';
import { IDefaultPageProps, ILoginPageProps, IReducerState } from '@Utils/interface';

const LoginComponent: React.FC<IDefaultPageProps & ILoginPageProps> = (props) => {
    const result = useSelector((state: IReducerState) => state.loginReducer)

    const { users: totalUsers, textCount } = result;

    const sampleFunctionForOnLogin = () => {
        // Do the login API call and get the success result
        // Update the token into "getAuthToken" and follow the rest
        IS_USER_AUTHENTICATED(true);
        props.navigate(URLS.DASHBOARD)
    }

    return (
        <div className='login-page-main-container'>
            <p>Test count {textCount} </p>
            <p>total users {totalUsers?.length} </p>

            <button onClick={() => props.dispatch(actions.addTextRequested())}>Add Text</button>
            <button onClick={() => props.dispatch(actions.fetchUserRequested('demo payload id'))}>Get Users</button>
            <table>
                <tr>
                    <th>name</th>
                    <th>website</th>
                    <th>phone</th>
                </tr>

                <tbody>
                    {totalUsers?.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.website}</td>
                                <td>{user.phone}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {totalUsers?.length && (
                <button className='btn btn-primary' onClick={sampleFunctionForOnLogin}>Login</button>
            )}
        </div>
    )
};

export default LoginComponent;