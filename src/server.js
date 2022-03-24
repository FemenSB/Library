const express = require('express');
const server = express();
const cors = require('cors');
const fs = require('fs');

const baseRouter = require('./routes/base_router');

const port = process.env.port || 3000;
server.listen(port, () => console.log(`Server open on port ${port}!`));

server.use(cors({
    origin: '*'
}));

server.use(baseRouter);
