const express = require("express");
const MongoClient = require("mongodb").MongoClient;   
const app = express();
const bodyParser = require('body-parser');
 
const mongoClient = new MongoClient("mongodb://localhost:27017/");
 
let dbClient;
 
app.use(
    express.json()
);

app.use(bodyParser.json());

//app.use(express.static(__dirname + "/app"));

let urlDictionary = {
    checkUser: "/checkUser"
}
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("users").collection("name");

});

app.get(urlDictionary.checkUser, function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });

app.post(urlDictionary.checkUser, async (req,res) => {
    console.log(req.body.name);
    const collection = req.app.locals.collection;
    collection.find({name: req.body.name}).toArray(function(err, result){
         
        if(err) return console.log(err);
        console.log(result);
        res.send(result[0])
    });

});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});