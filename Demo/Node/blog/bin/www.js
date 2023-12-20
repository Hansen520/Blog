/*
 * @Date: 2023-12-20 10:49:16
 * @Description: description
 */
const http = require('http');

const PORT = 8000;
const serverHandle = require('../app');

const server = http.createServer(serverHandle);
server.listen(PORT); 