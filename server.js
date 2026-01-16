import http from "http";

const PORT = process.env.PORT

const server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({
        "welcomeText": "Hello world"
    }))
})

server.listen(PORT,()=>{
    console.log("The server is running on port ",PORT)
})