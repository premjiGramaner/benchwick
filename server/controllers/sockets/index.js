const users = require('./users');
const { createQueueInfo, deleteQueueInfo, getQueueInfo, updateQueueInfo } = require('./cache');

const RECEIVE_QUEUE_INFO = "receiveQueueInfo";
const GET_QUEUE_STATUS = "getQueueStatus";

const UPDATE_QUEUE_STATUS = "updateQueueStatus";

const formatResponse = async (req, socket) => {
    const id = req.uuid;
    if (!users.get(id)) {
        await users.create(socket, id)
    }

    return { userSocket: users.get(id), id, body: req.body };
}

const loadInstance = (socket) => {
    console.log('connection Initiated');

    socket.on('init', async (req) => {
        await users.create(socket, req.uuid)
    });

    socket.on('disconnect status', (info) => {
        console.log('server disconnected', info);
    });

    socket.on('disconnected', async (info) => {
        console.log('user disconnected token', info);
        if (info) await users.remove(info.uuid)
    });

    socket.on(GET_QUEUE_STATUS, async (req) => {
        console.log('user GET_QUEUE_STATUS', req, socket.id);
        const fr = await formatResponse(req, socket);
        const formatedResponse = getQueueInfo(fr.id);
        console.log('user RECEIVE_QUEUE_INFO', fr.userSocket.id);
        fr.userSocket.emit(RECEIVE_QUEUE_INFO, JSON.stringify(formatedResponse || { message: 'No Data' }));
    });

    socket.on(UPDATE_QUEUE_STATUS, async (req) => {
        const { id, body, userSocket } = await formatResponse(req, socket);
        if (body) {
            createQueueInfo(id, body);
            userSocket.emit(RECEIVE_QUEUE_INFO, getQueueInfo(id));
        }
    });
}

const queueCompleted = (uuid, APIResponse, isError) => {
    const socket = users.get(uuid);
    deleteQueueInfo(uuid);
    console.log('queueCompleted', uuid, APIResponse)
    socket.emit(RECEIVE_QUEUE_INFO, JSON.stringify({ status: isError ? 'Error' : 'Completed', message: 'Image variations generated successfully', data: APIResponse }))
}


module.exports = { loadInstance, queueCompleted };