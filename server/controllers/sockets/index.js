const users = require('./users');
var zlib = require('zlib')
const { createQueueInfo, deleteQueueInfo, getQueueInfo, updateQueueInfo } = require('./cache');

const RECEIVE_QUEUE_INFO = "receiveQueueInfo";
const GET_QUEUE_STATUS = "getQueueStatus";

const UPDATE_QUEUE_STATUS = "updateQueueStatus";

const formatResponse = async (req, socket) => {
    const id = req.uuid;
    if (!users.get(id) || (users.get(id) && users.get(id).id !== socket.id)) {
        await users.create(socket, id)
    }

    return { userSocket: users.get(id), id, body: req.body };
}

const formatReq = (arg) => {
    const reqData = zlib.deflateSync(JSON.stringify(arg)).toString('base64');
    return reqData;
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
        if (info.uuid) await users.remove(info.uuid)
    });

    socket.on(GET_QUEUE_STATUS, async (req) => {
        const fr = await formatResponse(req, socket);
        const formatedResponse = getQueueInfo(fr.id);
        fr.userSocket.emit(RECEIVE_QUEUE_INFO, formatReq({
            type: formatedResponse ? 2 : 1,
            data: (formatedResponse || { message: 'No Data' })
        }));
    });

    socket.on(UPDATE_QUEUE_STATUS, async (req) => {
        const { id, body } = await formatResponse(req, socket);
        if (body) {
            createQueueInfo(id, body);
        }
    });
}

const queueCompleted = (uuid, APIResponse, isError) => {
    const socket = users.get(uuid);
    deleteQueueInfo(uuid);
    if (socket) {
        socket.emit(RECEIVE_QUEUE_INFO, formatReq({
            type: 3,
            data: {
                status: isError ? 'Error' : 'Completed',
                message: 'Image variations generated successfully',
                data: APIResponse
            }
        }))
    }
}


module.exports = { loadInstance, queueCompleted };