import mongoose, { ConnectOptions } from 'mongoose';

async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect((process.env.DB_CONNECTION_STRING as string), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        console.info('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        // Handle the error appropriately (e.g., exit the application, retry connection, etc.)
    }
}

async function disconnectFromDatabase(): Promise<void> {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
    }
}

export { mongoose, connectToDatabase, disconnectFromDatabase };
