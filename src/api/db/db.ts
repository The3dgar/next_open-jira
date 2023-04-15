import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongooseConnection = {
  isConnected: 0,
};

const mongoUri = process.env.DB_URL as string;

export const connect = async () => {
  if (mongooseConnection.isConnected) {
    console.log('ya estamos conectados');

    return;
  }

  if (mongoose.connections.length > 0) {
    mongooseConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooseConnection.isConnected === 1) {
      console.log('usando conexion anterior');
      return;
    }

    await disconnect()
  }

  
  await mongoose.connect(mongoUri);
  mongooseConnection.isConnected = 1;
  console.log('Conectado a mongo db:', mongoUri);
};

export const disconnect = async () => {
  if (mongooseConnection.isConnected !== 0) return;

  await mongoose.disconnect();
  console.log('Desconectando de MongoDB');
};
