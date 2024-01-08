import React, { useState, createContext } from "react";
import { API_URL } from '@Utils/constants'

export type IDashboardStateInfo = {
    image?: File,
    range?: string,
    name?: string,
    file?: string,
    reset?: boolean
};

const initalState: IDashboardStateInfo = {
    image: null,
    range: localStorage.getItem('variation_range') || '4',
    name: '',
    file: '',
}

export type IImageContext = {
    dashboardResult: IDashboardStateInfo;
    initalState: IDashboardStateInfo;
    setDashboardResult: (value: IDashboardStateInfo) => void
};

export const ImageContext = createContext<IImageContext>(null);
export const ConsumerContext = ({ children }: { children: JSX.Element }) => {
    const [dashboardResult, setDashboardResult] = useState<IDashboardStateInfo>(initalState);

    const socket = new WebSocket(API_URL.wss);

    socket.onopen = function (e) {
        console.log("[open] Connection established");
        console.log("Sending to server");
        socket.send("My name is John");
    };

    socket.onmessage = function (event) {
        console.log(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
    };

    socket.onerror = function (error) {
        console.log(`[error]`);
    };

    return (
        <ImageContext.Provider value={{
            dashboardResult,
            initalState,
            setDashboardResult: (arg: IDashboardStateInfo) => {
                if (arg?.reset) setDashboardResult(initalState);
                setDashboardResult({ ...dashboardResult, ...arg })
            }
        }}>
            {children}
        </ImageContext.Provider>
    )
}