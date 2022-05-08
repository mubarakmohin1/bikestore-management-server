const express = require('express');
const cors = require('cors'); 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware

app.use(cors());
app.use(express.json());

// bikestore
// JS96rmgWJ3lB05TO


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hvtj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
try{
    await client.connect();
    const stockCollection = client.db('bikestore-different-brand').collection('stock');
   app.get('/stock',async(req,res)=>{
    const query = {};
    const cursor = stockCollection.find(query);
    const stockes = await cursor.toArray();
    res.send(stockes);
   });
   app.get('/stock/:id',async(req,res)=>{
       const id = req.params.id;
       const query = {_id:ObjectId(id)};
       const stock = await stockCollection.findOne(query);
       res.send(stock);
   });
   app.post('/stock',async(req,res)=>{
       const newStock = req.body;
       const result = await stockCollection.insertOne(newStock);
       res.send(result);
   });
   app.delete('/stock/:id', async(req,res)=>{
       const id = req.params.id;
       const query = {_id:ObjectId(id)};
       const result = await stockCollection.deleteOne(query);
       res.send(result);
   })
}
finally{
// comment
}
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('running bike server');
});

app.listen(port,()=>{
    console.log('listening bike port')
});