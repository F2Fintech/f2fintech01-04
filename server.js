const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "f2-website" directory
app.use(express.static(path.join(__dirname, 'F2 Fintech Website')));

// Serve static files from the "FLP WEBSITE" directory
app.use('/flp', express.static(path.join(__dirname, 'FLP Website')));
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
const Contact = require('./F2 Fintech Website/models/Contact');

// Define route to serve landing page
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

// Middleware to handle unknown URLs and respond with the custom 404 page
app.use((req, res, next) => {
  // If the request URL does not match any route and is not for a static file
  if (!res.headersSent) {
      res.status(404).sendFile(path.join(__dirname, 'F2 Fintech Website', '404.html'));
  } else {
      // If headers have already been sent, continue to the next middleware
      next();
  }
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
