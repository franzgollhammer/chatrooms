const express = require('express');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const socketio = require('socket.io');
const router = require('./router');
const { notFound, errorHandler } = require('./middlewares')

// Constants
const PORT = process.env.PORT || 1337;

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('New connection !')

    socket.on('disconnect', () => {
        console.log('User has left!');
    })
})

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
    origin: 'http://localhost:8080'
}));
app.use(router);
app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server up ⬆️  and runnig on port: ${PORT}`);
})