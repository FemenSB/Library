const server = require('./routes/base_router');

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Server open on port ${port}!`));
