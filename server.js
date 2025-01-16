const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/ask', async (req, res) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Answer this chemistry question concisely: ${req.body.question}`
        }],
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get answer' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
