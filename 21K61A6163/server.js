const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colorPickerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the color data
const colorSchema = new mongoose.Schema({
  hexValue: String,
  rgbValue: String,
});

// Create a model based on the schema
const Color = mongoose.model('Color', colorSchema);

// Handle POST request to store color data
app.post('/storeColor', async (req, res) => {
  const { hexValue, rgbValue } = req.body;

  try {
    // Create a new document in the Color collection
    const newColor = new Color({
      hexValue,
      rgbValue,
    });

    // Save the document to the database
    const savedColor = await newColor.save();
    console.log(`Color stored successfully. Object ID: ${savedColor._id}`);

    res.status(201).json({ message: 'Color stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
