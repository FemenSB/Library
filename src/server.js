const mongoose = require('mongoose');

const server = require('./routes/base_router');
const {userName, password} = require('./dbCredentials'); // Credentials for the database. Replace it with yours
const MONGO_URL =  `mongodb+srv://${userName}:${password}@librarycluster.nc3rt.mongodb.net/libraryDB?retryWrites=true&w=majority`
const port = process.env.port || 3000;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(port, () => console.log(`Server open on port ${port}!`));
}

startServer();
