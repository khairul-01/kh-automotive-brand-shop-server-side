const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
   res.send('Automotive shop server is running');
})

// brandCars
// vjeMZuWmzOn5aia0

const uri = "mongodb+srv://brandCars:vjeMZuWmzOn5aia0@cluster0.evyc2iz.mongodb.net/?retryWrites=true&w=majority";

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

      const carCollection = client.db('carsDB').collection('cars');

      // const options = { ordered: true };
      // const result = await carCollection.insertMany(carBrands, options);
      // console.log(`${result.insertedCount}another documents were inserted`);
      app.post('/cars', async (req, res) => {
         // const newCars = carBrands;
         // console.log(carBrands);
         const result = await carCollection.insertMany(carBrands);
         console.log(`${result.insertedCount} documents were inserted`);
         res.send(result);
      })

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
   }
}
run().catch(console.dir);


app.listen(port, () => {
   console.log(`KH Automotive shop server is running on port ${port}`);
})
