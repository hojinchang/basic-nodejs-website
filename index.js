// const http = require("http");
// const { URL } = require("url");
// const fs = require("fs");

// // create a HTTP server
// http.createServer((req, res) => {
//     // Get the request URL
//     let requestedURL = req.url;
//     // console.log(requestedURL);
//     // Create a new response URL
//     let parsedURL = new URL(requestedURL, "http://localhost:8080");     // parsedURL = "http://localhost:8080/requestedURL" = "http://localhost:8080/about"
//     // Desired file's path
//     let filePath = "." + parsedURL.pathname;
    
//     // Redirect initial load to index.html
//     if (filePath === './') {
//         filePath = './index.html';
//     }
    
//     let contentType = "text/html";
//     fs.readFile(filePath, (error, content) => {
//         if (error) {
//             // ENONENT means the file was not found
//             if (error.code === "ENOENT") {
//                 // Open 404.index
//                 fs.readFile("./404.index", (error, content) => {
//                     res.writeHead(404, {'Content-Type': contentType});
//                     res.write(content);
//                     res.end();
//                 })
//             } else {
//                 res.writeHead(500);
//                 res.end(`Server Error: ${error.code}`);
//             }
//         } else {
//             res.writeHead(200, {'Content-Type': contentType});
//             res.write(content);
//             res.end();
//         }
//     })

// }).listen(8080, () => {
//     console.log('Server running at http://localhost:8080/');
// });

const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));


app.get("./", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("./about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("./contact-me", (req, res) => {
    res.sendFile(path.join(__dirname, "contact-me.html"));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(__dirname);
});
