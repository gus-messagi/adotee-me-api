import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@getpet-cluster.1lm9b.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((res) => {
    console.log('Connection is working');
  })
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello GetPet Api');
});

app.listen(3333);
