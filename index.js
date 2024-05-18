const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;

// password  express-101 lBHLFAVpsNXbMmER
// middleware
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://express-101:lBHLFAVpsNXbMmER@cluster0.loknebs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //second step connection in mongodb
    const userCollection = client.db("myUserDB").collection("myUsers");

    //third step user create in mongodb database
    app.post('/users', async(req, res)=>{
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result)

    })
    // four step data display in frontend
    app.get('/users', async(req, res)=>{
      const result = await userCollection.find().toArray();
      console.log(result);
      res.send(result)
    })
    

    // five step delete operation 
    app.delete('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      console.log(result)
      res.send(result);

    })
    





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! 101')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})