const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://riddhi:riddhi03@cluster0.zrgciu5.mongodb.net/test";
const client = new MongoClient(url); 

async function main(){
     // Connect the client to the server 
     await client.connect();
     // Establish and verify connection
     await client.db("db").command({ping: 1});
     console.log("Connected successfully to server");
}

async function insert(name, ticker) {
     const database = client.db("db");
     const equities = database.collection("equities");
     //make a new doc
     const doc = {
         name: name,
         ticker: ticker,
     }
     //insert it
     const result = await equities.insertOne(doc);
     console.log(`A document was inserted with the _id: ${result.insertedId}`);
 
 }

async function readData() {
     //conenct to db
     await main()

     //read the data and call insert on the information recieved
     var fs = require('fs'),
         path = './companies.csv';
      await fs.readFile(path, {encoding: 'utf-8'}, async function (err, data) {
         var lines = data.split("\n");
         for (let i = 1; i < lines.length; i++) {
             var data = lines[i].split(",")
             console.log(data)
             //insert the line
             await insert(data[0], data[1])
         }
         await client.close();
 
     });
 }
 //run it all
 readData()