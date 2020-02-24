const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { notFound, errorHandler} = require('./middlewares')

const app = express();
const PORT = process.env.PORT || 1337;

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
}))
app.use(notFound())
app.use(errorHandler())

app.listen(PORT, () => {
    console.log(`Server up ⬆️  and runnig on port: ${PORT}`);
})