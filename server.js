const express = require('express');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// OpenAI API setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint to generate story chapters
app.post('/generate', async (req, res) => {
  const { genre, tone, setting, alignment } = req.body;

  try {
    const prompt = `Write a ${tone} ${genre} story set in ${setting} featuring a character who is ${alignment.replace('-', ' ')}.`;
    
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500,
    });

    const story = response.data.choices[0].text.trim();
    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`malfiction app listening at http://localhost:${port}`);
});
