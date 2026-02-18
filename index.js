const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const WEBHOOK = 'https://discord.com/api/webhooks/1472675351762305106/zrGmmYVIa4m8BxGQlvbeRxwCh-_elbgR_u8kSsXFrnox2YpXwNreeCmpXWuER0bf6bIt';

// ⚠️ Replace this with your Discord user ID
const YOUR_USER_ID = '719218818747990038';

// Rate limiting per IP
const ipTimestamps = {};
const LIMIT = 2; // messages
const WINDOW_MS = 60 * 1000; // 1 minute

app.post('/send-message', async (req, res) => {
  const ip = req.ip;
  const now = Date.now();

  // Initialize IP array if first request
  if (!ipTimestamps[ip]) ipTimestamps[ip] = [];

  // Keep only timestamps within last minute
  ipTimestamps[ip] = ipTimestamps[ip].filter(ts => now - ts < WINDOW_MS);

  // Check if limit exceeded
  if (ipTimestamps[ip].length >= LIMIT) {
    return res.status(429).send({ 
      success: false, 
      error: 'Rate limit exceeded. Max 2 messages per minute.' 
    });
  }

  ipTimestamps[ip].push(now);

  console.log("Incoming message:", req.body);
  const { message, name } = req.body;

  if (!message) return res.status(400).send({ success: false, error: 'No message' });

  try {
    // Send message to Discord with optional ping
    const response = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        content: `<@${YOUR_USER_ID}> **${name || 'Anonymous'}** says: ${message}` 
      })
    });

    console.log("Discord response status:", response.status);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
