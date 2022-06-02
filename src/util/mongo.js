const mongoose = require('mongoose');

const {userName, password} = require('./dbCredentials'); // Credentials for the database. Replace it with yours
const MONGO_URL =  `mongodb+srv://${userName}:${password}@librarycluster.nc3rt.mongodb.net/libraryDB?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function connectToDB() {
    await mongoose.connect(MONGO_URL);
}

async function disconnectFromDB() {
  await mongoose.disconnect();
}

module.exports = {
  connectToDB,
  disconnectFromDB
};
