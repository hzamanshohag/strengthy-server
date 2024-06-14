const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


// test
// wKet9xwmdmZp9B4e

const uri =
  "mongodb+srv://test:wKet9xwmdmZp9B4e@cluster0.dydwv3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const adminCollection = client.db("strengthyDB").collection("data");
    const adminCollectionTrainer = client.db("trainerDB").collection("data");
    const userDataCollection = client.db("user").collection("data");

    // Admin
    app.post("/addclases", async (req, res) => {
      const data = req.body;
      const result = await adminCollection.insertOne(data);
      console.log(result);
      res.send(result);
    });

    app.get("/allclases", async (req, res) => {
      const result = await adminCollection.find().toArray();
      res.send(result);
    });

    app.get("/allclases/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await adminCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    app.delete("/allclases/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await adminCollection.deleteOne(query);
      res.send(result);
    });

     app.post("/addtrainer", async (req, res) => {
       const data = req.body;
       const result = await adminCollectionTrainer.insertOne(data);
       console.log(result);
       res.send(result);
     });

     app.get("/addtrainer", async (req, res) => {
       const result = await adminCollectionTrainer.find().toArray();
       res.send(result);
     });

     app.get("/addtrainer/:id", async (req, res) => {
       const id = req.params.id;
       const query = {
         _id: new ObjectId(id),
       };
       const result = await adminCollectionTrainer.findOne(query);
       console.log(result);
       res.send(result);
     });

     app.delete("/addtrainer/:id", async (req, res) => {
       const id = req.params.id;
       const query = {
         _id: new ObjectId(id),
       };
       const result = await adminCollectionTrainer.deleteOne(query);
       res.send(result);
     });

    // My Bids
    app.post("/mybids", async (req, res) => {
      const data = req.body;
      const result = await mybidsCollection.insertOne(data);
      console.log(result);
      res.send(result);
    });
    
     app.get("/mybids/:email", async (req, res) => {
       const emailId = req.params.email;
       const query = {
         jobEmail: emailId,
       };
       const result = await mybidsCollection.find(query).toArray();
       res.send(result);
     });
     
     app.delete("/mybids/:id", async (req, res) => {
       const id = req.params.id;
       const query = {
         _id: new ObjectId(id),
       };
       const result = await mybidsCollection.deleteOne(query);
       res.send(result);
     });

    app.get("/", (req, res) => {
      res.send("Strengthy Server Is Running!");
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});