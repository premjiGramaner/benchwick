import io from "socket.io-client";
import { API_URL } from "@Utils/constants";
import { getAuthToken } from "@Utils/storage";
import { STORAGE_KEY } from "@Utils/constants";

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
        console.log('** initateWS info', info)
    });
}

export const postReq = (name, body = undefined) => {
    const token = getAuthToken();
    console.log('Emit done', name, { token: token, uuid, body })
    if (token && token != null && token != "") {
        return socket.emit(name, { token: token, uuid, body });
    }
}
