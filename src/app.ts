import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes';
import { connectToDatabase, disconnectFromDatabase } from './config/db';
import { swaggerDoc, errorHandlers } from './utils';

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
app.listen(port, async () => {
  console.info("Server is successfully running on port " + port);
  // Connect to the database
  await connectToDatabase();
});

// Gracefully disconnect from the database when the application is terminated
process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default app;
