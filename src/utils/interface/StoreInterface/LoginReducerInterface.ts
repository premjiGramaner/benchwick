/*
* TODO::
* Make sure to remove the IUser on the actual development 
 */

export interface IUsers {
    id: string
    name: string
    website: string
    phone: number
}

export interface ILoginState {
    textCount: number;
    fetchUserLoading: boolean;
    users: IUsers[];
    fetchUserFailed: string;
}