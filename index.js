const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evyc2iz.mongodb.net/?retryWrites=true&w=majority`;

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

      const carCollection = client.db('carsDB');
      const cars = carCollection.collection('cars')
      const brandCars = carCollection.collection('brandCars')
      const carCarts = carCollection.collection('carCarts')

      // const options = { ordered: true };
      // const result = await carCollection.insertMany(carBrands, options);
      // console.log(`${result.insertedCount}another documents were inserted`);
      app.get('/cars', async (req, res) => {
         const cursor = cars.find();
         const result = await cursor.toArray();
         res.send(result);
      })
      app.get('/cars/carCarts', async (req, res) => {
         const cursor = carCarts.find();
         const result = await cursor.toArray();
         res.send(result);
      })
      app.get('/cars/brandCars', async (req, res) => {
         const cursor = brandCars.find();
         const result = await cursor.toArray();
         res.send(result);
      });
      // app.get('/cars/carCarts/:id', async(req, res) => {
      //    const id = req.params.id;
      //    const query = {_id: new ObjectId(id)};
      //    result = await carCarts.findOne(query);
      //    res.send(result);
      // })
      app.get('/cars/brandCars/:id', async (req, res) => {
         const id = req.params.id;
         const query = {_id: new ObjectId(id)};
         const cursor = await brandCars.findOne(query);
         res.send(cursor)
      });
      app.get('/cars/brandCars/:name', async (req, res) => {
         const name = req.params.name;
         const query = { brandName: name };
         const cursor = brandCars.find(query);
         const result = await cursor.toArray();
         res.send(result);
      });
      
      app.post('/cars/brandCars', async (req, res) => {
         const brandCar = req.body;
         // console.log(brandCar);
         const result = await brandCars.insertOne(brandCar);
         res.send(result);
      })
      app.post('/cars/carCarts', async (req, res) => {
         const cart = req.body;
         // console.log(brandCar);
         const result = await carCarts.insertOne(cart);
         res.send(result);
      })
      app.put('/cars/brandCars/:id', async (req, res) => {
         const id = req.params.id;
         const filter = {_id: new ObjectId(id)};
         const updatedProduct = req.body;
         const car = {
            $set: {
               image: updatedProduct.image,
               name: updatedProduct.name,
               brandName: updatedProduct.brandName,
               type: updatedProduct.type,
               price: updatedProduct.price,
               rating: updatedProduct.rating,
            }
         }
         const result = await brandCars.updateOne(filter, car);
         res.send(result);
      });

      app.delete('/cars/carCarts/:id', async(req, res) => {
         const id = req.params.id;
         const query = {_id: id}
         const result = await carCarts.deleteOne(query);
         res.send(result);
         console.log('deleted', id)
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


app.listen(port, () => {
   console.log(`KH Automotive shop server is running on port ${port}`);
})
