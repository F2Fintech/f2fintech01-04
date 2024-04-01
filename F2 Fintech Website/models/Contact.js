const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'F2 Fintech Website')));
app.use('/flp', express.static(path.join(__dirname, 'FLP Website')));

// Enable CORS for all routes
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/f2Website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Import contact model
const Contact = require('../models/Contact');


// Routes
app.get('/flp', (req, res) => {
  res.sendFile(path.join(__dirname, 'FLP Website', 'landingpage.html'));
});

// Define routes to serve individual HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'F2 Fintech Website', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'F2 Fintech Website', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'F2 Fintech Website', 'contact.html'));
});

// Route to handle form submission
app.post('/contact', (req, res) => {
  const newContact = new Contact({
    name: req.body.txtName,
    email: req.body.txtEmail,
    phone: req.body.txtPhone,
    message: req.body.txtMsg
  });

  newContact.save()
    .then(() => {
      console.log('Contact saved successfully');
      res.send('Form submitted and contact saved successfully!');
    })
    .catch(err => {
      console.error('Error saving contact:', err);
      res.status(500).send('Error saving contact');
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

