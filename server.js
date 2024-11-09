// server.js
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
  console.log('Received a request to /generate');
  console.log('Request Body:', req.body);
  const { genre, tone, setting, alignment, storySoFar, chosenOption } = req.body;

  try {
    let messages = [];

    if (storySoFar && chosenOption) {
      // Continuation prompt
      messages = [
        { role: 'system', content: 'You are a creative story generator.' },
        {
          role: 'user',
          content: `${storySoFar}\n\n${chosenOption}\n\nContinue the story in the same style.`,
        },
      ];
    } else {
      // Initial prompt
      messages = [
        { role: 'system', content: 'You are a creative story generator.' },
        {
          role: 'user',
          content: `Write the beginning of a ${tone} ${genre} story set in ${setting} featuring a character who is ${alignment.replace('-', ' ')}.`,
        },
      ];
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const story = response.data.choices[0].message.content.trim();
    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate story.' });
  }
});

app.get('/generate', (req, res) => {
  res.status(405).send('Method Not Allowed');
});

// Start the server
app.listen(port, () => {
  console.log(`malfiction app listening at http://localhost:${port}`);
});
