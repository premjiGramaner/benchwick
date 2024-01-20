import { STORAGE_KEY } from "@Utils/constants";

export const getAuthToken = (updateToken?: string) => {
    if (updateToken) {
        sessionStorage.setItem(STORAGE_KEY.AUTH_TOKEN, updateToken);
        return updateToken;
    }

    return sessionStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
};

export const getUserKey = (key?: string) => {
    if (key) {
        localStorage.setItem(STORAGE_KEY.USER_KEY, key);
        return key;
    }

    return sessionStorage.getItem(STORAGE_KEY.USER_KEY);
};

export const getLoggedUserName = (userName?: string) => {
    if (userName) {
        sessionStorage.setItem(STORAGE_KEY.LOGGED_USER_NAME, userName);
        return userName;
    }
    return sessionStorage.getItem(STORAGE_KEY.LOGGED_USER_NAME);
}

export const IS_USER_AUTHENTICATED = (updateAuthenticated?: boolean | string) => {
    if (updateAuthenticated === 'cookie') {
        return localStorage.getItem('isUserAuthenticated') === "true";
    }

    if (updateAuthenticated) {
        return sessionStorage.setItem('isUserAuthenticated', String(updateAuthenticated));
    }

    return sessionStorage.getItem('isUserAuthenticated') === "true";
};

export const updateStorages = (data?: { name?: string, user_token?: string, auth?: boolean, moveSessionToLocal?: boolean, isCookie?: boolean }) => {
    if (data.isCookie) {
        localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, data.user_token);
        localStorage.setItem(STORAGE_KEY.LOGGED_USER_NAME, data.name);
        localStorage.setItem('isUserAuthenticated', String(data.auth));
        localStorage.setItem('persist:envision', sessionStorage.getItem('persist:envision'));
    }

    if (data.moveSessionToLocal) {
        getAuthToken(localStorage.getItem(STORAGE_KEY.AUTH_TOKEN))
        getLoggedUserName(localStorage.getItem(STORAGE_KEY.LOGGED_USER_NAME))
        IS_USER_AUTHENTICATED(localStorage.getItem('isUserAuthenticated'))
        sessionStorage.setItem('persist:envision', localStorage.getItem('persist:envision'));
    } else if (data.user_token) {
        getAuthToken(data.user_token)
        getLoggedUserName(data.name)
        IS_USER_AUTHENTICATED(data.auth)
    }
};