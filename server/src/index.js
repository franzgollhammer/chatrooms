const express = require('express');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const socketio = require('socket.io');
const router = require('./router');
const { notFound, errorHandler } = require('./middlewares')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./userHelper');

// Constants
const PORT = process.env.PORT || 1337;

const app = express();
const server = http.Server(app);
const io = socketio(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

/**
 * Middlewares:
 * - Morgan - for logging
 * - Helmet - for more security
 * - CORS - for cross origin requests from vue frontend
 * 
 * Custom middlewares:
 * - notFound - for not found error handling
 * - errorHandler - for overall error handling
 */

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8080"
}));
app.use(router);
app.use(notFound);
app.use(errorHandler);

//                               ========== SOCKET ==========
io.on('connection', socket => {
    // On Joining a chatroom
    socket.on('join', ({ username, chatroom }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, chatroom });

        // If an error occured send it back to client (i.e. username exists)
        if (error) return callback(error);

        // Send welcome message to the new connected client
        socket.emit('serverMessage', { user: 'admin', message: `${user.username}, welcome to the room ${user.chatroom} 🎉` });
        // Broadcast message to all other users in the room that a user has joined
        socket.broadcast.to(user.chatroom).emit('serverMessage', { user: 'admin', message: `${user.username} has joined the room! 🧐` });

        // Join the chatroom
        socket.join(user.chatroom);
    })

    // On receiving a user message
    socket.on('userMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log('user: ', user);
        console.log('message: ', message);
        io.to(user.chatroom).emit('serverMessage', { user: user.username, message: message });

        callback();
    })

    // On disconnect
    socket.on('disconnect', () => {
        console.log('User has left!');
    });
})

// Server listen
server.listen(PORT, () => {
    console.log(`Server up ⬆️  and runnig on port: ${PORT}`);
});
