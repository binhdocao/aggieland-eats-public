const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 4000;
const apiRoutes = require('./routes/api');  


mongoose.model
app.use(cors()); 
app.use(express.json()); 
app.use('/api', apiRoutes);  

//unhardcode this value
mongoose.connect('mongodb+srv://admin:aggielandeats@cluster0.icy50r5.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas...'))
  .catch(err => console.error('Could not connect to MongoDB Atlas...', err));

// Default route
app.get('/', (req, res) => {
  res.send('Aggieland Eats is currently under development.')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
