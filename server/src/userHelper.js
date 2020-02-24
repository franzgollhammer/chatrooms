const users = [];

const addUser = ({ id, username, chatroom }) => {
    username = username.trim().toLowerCase();
    chatroom = chatroom.trim().toLowerCase();

    const existingUser = users.find(user => {
        return user.chatroom === chatroom && user.username === username
    });

    existingUser !== null ? { error: 'Username is already taken!' } : null;

    const user = { id, username, chatroom };

    users.push(user);
}

const removeUser = id => {
    const idx = users.findIndex((user) => user.id === id);
    idx !== -1 ? users.splice(idx, 1)[0] : null;
}

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = chatroom => users.filter(user => user.chatroom === chatroom);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
