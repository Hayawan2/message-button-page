const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // allow requests from any origin
app.use(express.json());

const WEBHOOK = 'https://discord.com/api/webhooks/1472675351762305106/zrGmmYVIa4m8BxGQlvbeRxwCh-_elbgR_u8kSsXFrnox2YpXwNreeCmpXWuER0bf6bIt';

app.post('/send-message', async (req, res) => {
  const { message, name } = req.body;
  if (!message) return res.status(400).send({ success: false, error: 'No message' });

  try {
    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `**${name || 'Anonymous'}** says: ${message}` })
    });
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
