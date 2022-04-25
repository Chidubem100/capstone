// Require all the module needed
const http = require("http");
const fs = require("fs");
const os = require("os")

// Declare a variable that will contain all the os info required
const osInfo = {
    "uptime": os.uptime(),
    "architecture": os.arch(),
    "numberOfCPUS": os.cpus(),
    "hostname": os.hostname(),
    "netorkInterfaces": os.networkInterfaces(),
    "platform": os.platform(),
}

// console.log(osInfo);


// get all the files
const homePage = fs.readFileSync('./pages/index.html')
const aboutPage = fs.readFileSync('./pages/about.html')
const errorPage = fs.readFileSync('./pages/404.html')

// create a server using the createServer method
const server = http.createServer((req, res) => {
    const url = req.url;
    // Home route
    if (url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(homePage)
        res.end();
        // About route
    } else if (url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(aboutPage)
        res.end();
        // System route
    } else if (url === '/sys' && req.method === "GET") {
        res.writeHead(201, { 'content-type': 'text/plain' })

        const jsonString = JSON.stringify(osInfo);
        // console.log(jsonString)
        fs.writeFile('./osinfo.json', jsonString, err => {
            if (err) {
                console.log(err)
            } else {
                console.log('successfully created')
                res.end(JSON.stringify({ message: "Your OS info has been saved successfully" }));
            }
        });
        //404 route
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write(errorPage)
        res.end();
    }


});

//create the server port using the http listen method
server.listen(5000, () => {
    console.log("serever have startd")
});