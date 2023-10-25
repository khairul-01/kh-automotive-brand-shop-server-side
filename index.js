const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const carBrands = [
   {
      "brand_name": "Toyota",
      "brand_image": "https://i.ibb.co/hy5GhRG/31750.jpg"
   },
   {
      "brand_name": "Ford",
      "brand_image": "https://i.ibb.co/8YhQ2jj/23399.jpg"
   },
   {
      "brand_name": "BMW",
      "brand_image": "https://i.ibb.co/n7j6Mjv/BMW-i5-review.jpg"
   },
   {
      "brand_name": "Mercedes Benz",
      "brand_image": "https://i.ibb.co/gmLDcHZ/big-with-watermark-mercedes-benz-s-class-dhaka-dhaka-2865.jpg"
   },
   {
      "brand_name": "Tesla",
      "brand_image": "https://i.ibb.co/Fbcntt2/2018-Tesla-Model-S-75-D.jpg"
   },
   {
      "brand_name": "Honda",
      "brand_image": "https://i.ibb.co/2kVryL3/Honda-Civic-Hybrid-2022-Europe-IAA-2023-1-X7-A0545-2.jpg"
   }
]

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
   console.log(`coffee shop server is running on port ${port}`);
})
