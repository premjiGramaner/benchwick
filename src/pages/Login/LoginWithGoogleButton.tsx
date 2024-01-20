import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast'

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import googlePlus from '@Assets/svg/google-plus.svg'

import { getUserInfoFromGoogle } from "@Reducers/signUpReducer";
import { login_with_google } from "@Reducers/loginReducer";
import { loadGapiInsideDOM, loadAuth2 } from 'gapi-script';
import AUTH_JSON from "@Utils/client_secret.json";
import { IDefaultPageProps } from "@Interface/PagesInterface";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import { IReducerState } from "@Interface/StoreInterface";

// btn btn-primary google-login-btn
export const LoginWithGoogleButton = (props: IDefaultPageProps & { validating: boolean, setValidating: (arg: boolean) => void }) => {
    const enableSSO = false;
    const { validating, setValidating } = props;
    const [useOneTap, setUseOneTap] = useState(true);
    const [gapi, setGapi] = useState(null);
    const { isError } = useSelector((state: IReducerState) => state.loginReducer)

    const onSuccess = (tokes: CredentialResponse) => {
        setValidating(true);
        try {
            const accessToken = gapi?.auth?.getToken()?.access_token;
            getUserInfoFromGoogle(accessToken).then(response => {
                props.dispatch(login_with_google({
                    name: response?.name,
                    email: response?.email,
                    client_id: tokes.clientId
                }))
            }).catch(() => {
                setValidating(false);
                toast.error('Failed to authorize your request, Plese try after sometimes.')
            })
        } catch (error) {
            setValidating(false);
            toast.error('Failed to authorize your request, Plese try after sometimes.')
        }
    };

    useEffect(() => {
        const loadGapi = async () => {
            const newGapi = await loadGapiInsideDOM();
            setGapi(newGapi);
        }

        loadGapi();
    }, []);

    useEffect(() => {
        if (isError && validating) {
            setValidating(false)
            setUseOneTap(false);
        }
    }, [isError]);

    useEffect(() => {
        if (!gapi) return;

        const setAuth2 = async () => {
            const auth2 = await loadAuth2(gapi, AUTH_JSON.web.client_id, '')
            if (auth2.isSignedIn.get()) auth2.currentUser.get()
        }
        setAuth2();
    }, [gapi, validating]);

    const SSO_Action = () => {
        toast('Google SSO is under development!.')
    }

    return (
        <div className="pb-0 pt-4 bg-transparent d-flex text-center">
            {enableSSO ? (<div>
                {validating ? (
                    <div className="btn google-login-btn">
                        <Loader type="spinner-default" bgColor='#7b7878' size={25} /> Validating your request.
                    </div>
                ) : (
                    <GoogleLogin
                        width="334px"
                        text="signin_with"
                        shape="pill"
                        useOneTap={useOneTap}
                        logo_alignment="center"
                        onSuccess={onSuccess}
                        onError={() => {
                            toast.error('Failed to authorize your request!')
                        }}
                    />
                )}
            </div>) : (
                <button className="btn btn-primary google-login-btn" type="button" onClick={SSO_Action}>
                    <img
                        className="px-2 mb-1"
                        src={googlePlus}
                        alt="google image"
                    />
                    Login with Google
                </button>
            )}
        </div>
    )
}