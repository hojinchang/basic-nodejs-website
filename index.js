const http = require("http");
const { URL } = require("url");
const fs = require("fs");

// create a HTTP server
http.createServer((req, res) => {
    // Get the request URL
    let requestedURL = req.url;
    // Create a new response URL
    let parsedURL = new URL(requestedURL, "http://localhost:8080");
    // Desired file's path
    let filePath = "." + parsedURL.pathname;
    
    // Redirect initial load to index.html
    if (filePath === './') {
        filePath = './index.html';
    }
    
    let contentType = "text/html";
    fs.readFile(filePath, (error, content) => {
        if (error) {
            // ENONENT means the file was not found
            if (error.code === "ENOENT") {
                // Open 404.index
                fs.readFile("./404.index", (error, content) => {
                    res.writeHead(404, {'Content-Type': contentType});
                    res.write(content);
                    res.end();
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
            res.end();
        }
    })

}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});

