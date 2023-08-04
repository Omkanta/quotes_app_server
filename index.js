// index.js
const express = require('express');
const axios = require('axios');
const app = express();
require("dotenv").config();

const PORT = process.env.port; // You can use any available port
const cors=require("cors");
app.use(express.json());
app.use(cors());
// index.js

// ... (previous code)

// POST request to generate a quote
app.post('/quote', async (req, res) => {
    const { theme } = req.body;
    // console.log(theme);
    // Call the function to generate the quote
    const quote = await generateQuote(theme);
  
    // Return the generated quote as the response
    res.json({ quote });
  });
  
  // Function to generate the quote using GPT-3.5 API
  async function generateQuote(theme) {
    // Replace 'YOUR_API_KEY' with your actual GPT-3.5 API key
    const apiKey = process.env.YOUR_OPENAI_API_KEY;
  
    // Set up the API endpoint
    const apiUrl = 'https://api.openai.com/v1/chat//completions';
  
    try {
      // Make a request to the GPT-3.5 API
      const response = await axios.post(
        apiUrl,
        {
            messages:[{"role":"user","content":`Generate an inspirational quote about ${theme}.`}],
            model:"gpt-3.5-turbo",
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      // Extract the generated quote from the API response
      const quote = response.data.choices[0].message.content;
      return quote;
    } catch (error) {
      console.error('Error generating quote:', error.message);
      return error.message;
    }
  }
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
