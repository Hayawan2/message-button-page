const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const WEBHOOK = 'https://discord.com/api/webhooks/1472675351762305106/zrGmmYVIa4m8BxGQlvbeRxwCh-_elbgR_u8kSsXFrnox2YpXwNreeCmpXWuER0bf6bIt';

app.post('/send-message', async (req, res) => {
  console.log("Incoming message:", req.body);
  const { message, name } = req.body;

  if (!message) return res.status(400).send({ success: false, error: 'No message' });

  try {
    const response = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `**${name || 'Anonymous'}** says: ${message}` })
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
