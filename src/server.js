const server = require('./routes/base_router');
const db = require('./util/mongo');

const port = process.env.port || 3000;

async function startServer() {
  await db.connectToDB();
  server.listen(port, () => console.log(`Server open on port ${port}!`));
}

startServer();
