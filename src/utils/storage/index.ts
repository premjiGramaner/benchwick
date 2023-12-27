import { STORAGE_KEY } from "@Utils/constants";

export const getAuthToken = (updateToken?: any) => {
    if (updateToken) {
        localStorage.setItem(STORAGE_KEY.AUTH_TOKEN, updateToken);
        return updateToken;
    }

    return localStorage.getItem(STORAGE_KEY.AUTH_TOKEN);
};

export const getLoggedUserName = (userData?:any) => {
    if(userData) {
        debugger;
       localStorage.setItem(STORAGE_KEY.LOGGED_USER_NAME,userData?.data.name);
       return userData?.data.name;
    }
    return  localStorage.getItem(STORAGE_KEY.LOGGED_USER_NAME);
}

export const IS_USER_AUTHENTICATED = (updateAuthenticated?: boolean) => {
    if (updateAuthenticated) {
        return localStorage.setItem('isUserAuthenticated', String(updateAuthenticated));
    }

    return localStorage.getItem('isUserAuthenticated') === "true";
};  