import io from "socket.io-client";
import { inflate } from 'react-zlib';

import { API_URL } from "@Utils/constants";
import { getAuthToken } from "@Utils/storage";
import { STORAGE_KEY } from "@Utils/constants";

import { store } from "../store/storeConfig";
import { updateSocketInfo } from "@Reducers/imageVariationReducer";

export const RECEIVE_QUEUE_INFO = "receiveQueueInfo";
export const GET_QUEUE_STATUS = "getQueueStatus";
export const UPDATE_QUEUE_STATUS = "updateQueueStatus";

export const socket = io(API_URL.wss, {
    transports: ['websocket'] // you need to explicitly tell it to use websockets
});

export const uuid = localStorage.getItem(STORAGE_KEY.USER_KEY) || Math.random().toString(36).substr(2);
if (!localStorage.getItem(STORAGE_KEY.USER_KEY)) localStorage.setItem(STORAGE_KEY.USER_KEY, uuid);

export const initateWS = () => {
    socket.on('connection', () => {
        socket.emit('init', { uuid });
    });

    socket.on('disconnect', () => {
        socket.emit('disconnected', { uuid });
    });

    socket.on(RECEIVE_QUEUE_INFO, (info) => {
        const queue = JSON.parse(inflate(info));
        switch (queue?.type) {
            case 1:
                store.dispatch(updateSocketInfo({ type: null, data: queue }))
                break;

            case 2:
                store.dispatch(updateSocketInfo({ type: "uploadedFile", data: queue }))
                break;

            default:
                store.dispatch(updateSocketInfo({
                    type: "response",
                    _state: store.getState()?.imageVariationReducer?.socketData?.uploadedFile?.data || {},
                    data: queue
                }))
                break;
        }
    });
}

export const postReq = (name, body = undefined) => {
    const token = getAuthToken();
    console.log(`--- Emitted for ${name} via socket ---`)
    if (token && token != null && token != "") {
        return socket.emit(name, { token: token, uuid, body });
    }
}
