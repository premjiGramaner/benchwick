import React, { useState, createContext } from "react";
// import { initateWS } from '../socket';

export type ICurrentQueue = {
    variants: string,
    fileInfo: {
        name: string,
        size: string,
        contentType: string,
    },
    image: string
};

export type IDashboardStateInfo = {
    image?: File,
    range?: string,
    name?: string,
    file?: string,
    reset?: boolean,
    currentQueue?: ICurrentQueue
};

const initalState: IDashboardStateInfo = {
    image: null,
    range: localStorage.getItem('variation_range') || '4',
    name: '',
    file: '',
    currentQueue: null
}

export type IImageContext = {
    dashboardResult: IDashboardStateInfo;
    initalState: IDashboardStateInfo;
    fetching: boolean,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
    setDashboardResult: (value: IDashboardStateInfo) => void
};

export const ImageContext = createContext<IImageContext>(null);
export const ConsumerContext = ({ children }: { children: JSX.Element }) => {
    const [dashboardResult, setDashboardResult] = useState<IDashboardStateInfo>(initalState);
    const [fetching, setFetching] = useState<boolean>(false);

    // useEffect(() => {
    //     initateWS();
    // }, [])

    return (
        <ImageContext.Provider value={{
            dashboardResult,
            initalState,
            fetching,
            setFetching,
            setDashboardResult: (arg: IDashboardStateInfo) => {
                if (arg?.reset) setDashboardResult(initalState);
                setDashboardResult({ ...dashboardResult, ...arg })
            }
        }}>
            {children}
        </ImageContext.Provider>
    )
}