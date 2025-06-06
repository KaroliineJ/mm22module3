const express = require('express');
const path = require('path');
const app = express();

// Serveeri public kausta
app.use(express.static(path.join(__dirname, 'public')));

// Kui tahad testida, kas kõik töötab:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server töötab pordil ${PORT}`);
});
