require('dotenv').config();
  const express = require('express');
  const app = express();
  
  const helmet = require('helmet');
  
  const morgan = require('morgan');


  const userRoute = require('./routes/users');
  const authRoute = require('./routes/auth');
  const postRoute = require('./routes/posts');
  
  
  
  
  const mongoose = require('mongoose');
  //const mongoUrl=;
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
  
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('common'));


  app.use("/api/posts",postRoute,);
  app.use("/api/users",userRoute);
  app.use("/api/auth",authRoute);
  

  
  app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
  });
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
  


  
  

  
  
 