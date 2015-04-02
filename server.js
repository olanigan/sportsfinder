var http = require('http'),
    express = require("express"),
    app = express();
    

app.listen(8080);
/*Simple HTTP Server for the App
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(process.env.PORT, process.env.IP);*/