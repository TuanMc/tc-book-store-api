const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');
const { connectToDatabase, disconnectFromDatabase } = require('./config/db');
const { swaggerDoc, errorHandlers } = require('./utils');

const app = express();
dotenv.config();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// API Routes
routes(app);

// Set up Swagger UI
swaggerDoc(app);

// Handle generic error
errorHandlers(app);

// Start the server
const port = process.env.PORT;
app.listen(port, async (error) => {
  if (error) console.error("Error occurred, server can't start", error);
  else {
    console.info("Server is successfully running on port " + port);
    // Connect to the database
    await connectToDatabase();
  }
});

// Gracefully disconnect from the database when the application is terminated
process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});



module.exports = app;
