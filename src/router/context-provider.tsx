import { IReducerState } from "@Interface/StoreInterface";
import { resetImages, updateImages } from "@Reducers/imageVariationReducer";
import { urltoFile } from "@Utils/utils";
import React, { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
    imageId?: string,
    name?: string,
    file?: string,
    reset?: boolean,
    currentQueue?: ICurrentQueue
};

const initalState: IDashboardStateInfo = {
    image: null,
    imageId: null,
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
    const { socketData, isLoading } = useSelector((state: IReducerState) => state.imageVariationReducer)
    const [fetching, setFetching] = useState<boolean>(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dashboardResult.image && !isLoading && fetching) {
            dispatch(resetImages())
        }
    }, [])

    useEffect(() => {
        if (isLoading !== fetching) {
            setFetching(isLoading)
        }
    }, [isLoading])

    useEffect(() => {
        if (socketData) {
            if (socketData.response) {
                dispatch(updateImages(socketData.response))
            }

            if (socketData.uploadedFile?.data) {
                const { data } = socketData.uploadedFile;
                urltoFile(data.image, data.fileInfo.name, data.fileInfo.contentType)
                    .then((file) => {
                        setDashboardResult({ image: file, file: URL.createObjectURL(file), range: data.variants })
                    });
            }
        }
    }, [socketData])

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