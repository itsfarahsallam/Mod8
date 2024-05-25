const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (request, response) {
    let q = url.parse(request.url, true);
    let filename = "." + q.pathname;

    if (q.pathname === "/") {
        filename = "./index.html";
    } 
    else if (q.pathname === "/about") {
        filename = "./about.html";
    } 
    else if (q.pathname === "/contact-me") {
        filename = "./contact-me.html";
    }

    /*
    else if (q.pathname === "/style") {
        filename = "./style.css"
    }
    */

    fs.readFile(filename, function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            return response.end("404 Not Found");
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        return response.end();
    });

}).listen(8080);

console.log("Server is listening on port 8080");