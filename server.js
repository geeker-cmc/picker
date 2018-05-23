const http = require('http');
const url = require('url');
const fs = require('fs');
const util = require('util')


var server = http.createServer((req,res) => {
    var pathname = url.parse(req.url).pathname;
    console.log(`${__dirname}${pathname}`)
    fs.readFile(`${__dirname}${pathname}`, (err,data) => {
        if(err){
            res.writeHead(404,{'Content-Type':'text/plain'})
            res.end()
        }else{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(data)
        }   
    })
})
server.listen(9999)

console.log('连接成功http://172.16.236.108:9999/')