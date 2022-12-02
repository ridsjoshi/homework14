var http = require('http');
var fs = require('fs');
var qs = require('querystring');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://riddhi:riddhi03@cluster0.zrgciu5.mongodb.net/test";
const client = new MongoClient(url); 
var port = process.env.PORT || 3000;


//crete the http server
http.createServer(async function (req, res) {
    if (req.url === "/process") {
         await connect();
         file = 'result.html';
         //read in result.html file
         fs.readFile(file, async function (err, txt) {
             res.writeHead(200, {'Content-Type': 'text/html'});
             res.write(txt);
             //get user input
             pdata = "";
             req.on('data', data => {
                 pdata += data.toString();
             });
 
             req.on('end', () => {
                 //parse user input
                 pdata = qs.parse(pdata);
                 //search for it in the db
                 search(pdata['the_name'], res, pdata['user'] === "company");
             });
         });
 
 
     } else {
         file = 'index.html';
         //read in index.html file
         fs.readFile(file, function (err, txt) {
             res.writeHead(200, {'Content-Type': 'text/html'});
             res.write(txt);
             res.end();
         });
     }
 
 
 }).listen(port);