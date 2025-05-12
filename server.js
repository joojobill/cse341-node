const express = require('express');
const connectDB = require('./database/connection');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

connectDB();
// Connect to MongoDB
mongoose.connect('mongodb://localhost:8080/professionalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create schema that matches our data structure
const professionalSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  nameLink: {
    firstName: String,
    url: String
  },
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String
  },
  githubLink: {
    text: String,
    link: String
  }
});

const Professional = mongoose.model('Professional', professionalSchema);

// Updated endpoint with MongoDB
app.get('/professional', async (req, res) => {
  try {
    const data = await Professional.findOne();
    if (!data) {
      // Insert initial data if collection is empty
      const newProfessional = new Professional(professionalData);
      await newProfessional.save();
      res.json(professionalData);
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use(cors());
app.use(express.json());

// Data structure that exactly matches frontend requirements
const professionalData = {
  professionalName: "John Doe",
  base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", // small transparent image
  nameLink: {
    firstName: "John",
    url: "https://example.com"
  },
  primaryDescription: "Full Stack Developer",
  workDescription1: "Experienced in JavaScript, Node.js, React, and MongoDB.",
  workDescription2: "Passionate about creating efficient and scalable applications.",
  linkTitleText: "Connect with me:",
  linkedInLink: {
    text: "LinkedIn Profile",
    link: "https://linkedin.com"
  },
  githubLink: {
    text: "GitHub Profile",
    link: "https://github.com"
  }
};

// Endpoint that matches the frontend's expected URL
app.get('/professional', (req, res) => {
  res.json(professionalData);
});

const PORT = process.env.Port || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

