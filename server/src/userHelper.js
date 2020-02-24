/**
 * Helper functions for users:
 * User = {
 *  username: '',
 *  chatroom: ''
 * }
 */

const users = [];

//TODO: Error handling, type checks

/**
 * Adds a user to the users list
 * @param id - this is the client socket id 
 * @param username - client username
 * @param chatroom - chatroom name
 * @returns {error} - if username already exists else,
 * @returns {null} - and adds the user to the userlist
 */
const addUser = ({ id, username, chatroom }) => {
    username = username.trim().toLowerCase();
    chatroom = chatroom.trim().toLowerCase();

    const existingUser = users.find(user => {
        return user.chatroom === chatroom && user.username === username
    });

    // check if username already exists
    existingUser !== null ? { error: 'Username is already taken!' } : null;

    const user = { id, username, chatroom };

    users.push(user);
}

/**
 * Removes a user from the userlist.
 * @param id - this is the client socket id
 */
const removeUser = id => {
    const idx = users.findIndex((user) => user.id === id);
    idx !== -1 ? users.splice(idx, 1)[0] : null;
}

/**
 * Finds a user in the userlist with the client socket id
 * @param id - this is the client socket id
 * @returns - A single user
 */
const getUser = id => users.find(user => user.id === id);

/**
 * Finds all users in a given chatroom.
 * @param chatroom - Name of a chatroom
 * @returns {List} - List of users in the chatroom
 */
const getUsersInRoom = chatroom => users.filter(user => user.chatroom === chatroom);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
