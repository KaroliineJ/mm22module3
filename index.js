const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'salajane-voti',
  resave: false,
  saveUninitialized: true,
}));

// Avaleht
app.get('/', (req, res) => {
  res.send('Tere tulemast moodul 4 backendi lehele!');
});

app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});
