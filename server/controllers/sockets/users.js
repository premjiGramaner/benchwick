const users = {};

exports.create = async (socket, id) => {
    console.log(id, "New user")
    users[id] = socket;
    return id;
};

exports.get = id => users[id] ? users[id] : undefined;
exports.getAll = () => users;
exports.remove = id => delete users[id];
