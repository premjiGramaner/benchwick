const NodeCache = require("node-cache");
const envCache = new NodeCache();

const getQueueInfo = (user_id = "") => {
    return envCache.get(user_id);
}

const createQueueInfo = (user_id, body) => {
    return envCache.set(user_id, body, 1800);
}

const updateQueueInfo = (user_id = "", body) => {
    let value = envCache.take(user_id);
    if (value) {
        value = { ...value, ...body };
    } else {
        value = body;
    }

    return envCache.set(user_id, value, 1800)
}

const deleteQueueInfo = (user_id = "") => {
    return envCache.del(user_id)
}

module.exports = {
    getQueueInfo,
    createQueueInfo,
    updateQueueInfo,
    deleteQueueInfo
}