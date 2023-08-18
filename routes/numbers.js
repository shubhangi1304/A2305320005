// Import required modules
const express = require('express');
const axios = require('axios');

// Create an instance of Express
const app = express();
const port = process.env.PORT || 8008;

// Define a route for handling the /numbers GET request
app.get('/numbers', async (req, res) => {
  try {
    const urls = req.query.url;
    if (!urls) {
      return res.status(400).json({ error: 'URLs parameter missing' });
    }

    const urlList = Array.isArray(urls) ? urls : [urls];

    const numberPromises = urlList.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers;
        return numbersData;
      } catch (error) {
        // Handle errors or timeouts here
        console.error(`Error fetching numbers from ${url}: ${error.message}`);
        return [];
      }
    });

    const numbersArray = await Promise.all(numberPromises);
    const mergedNumbers = numbersArray.flat().sort((a, b) => a - b);
    const uniqueNumbers = [...new Set(mergedNumbers)];

    return res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error(`Error fetching numbers from ${url}: ${error.message}`);
    return [];
  }
});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const urls = req.query.url;
    if (!urls) {
      return res.status(400).json({ error: 'URLs parameter missing' });
    }

    const urlList = Array.isArray(urls) ? urls : [urls];

    const numberPromises = urlList.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout: 500 });
        return response.data.numbers;
      } catch (error) {
        // Handle errors or timeouts here
        console.error(`Error fetching numbers from ${url}: ${error.message}`);
        return [];
      }
    });

    const numbersArray = await Promise.all(numberPromises);
    const mergedNumbers = numbersArray.flat().sort((a, b) => a - b);
    const uniqueNumbers = [...new Set(mergedNumbers)];

    return res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error('An error occurred:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
