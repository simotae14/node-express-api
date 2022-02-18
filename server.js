const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: 'Albert Einstein'
  },
  {
    id: 1,
    name: 'Sir Isaac Newtoon'
  }
];

// create custom middleware for loggin
app.use((req, res, next) => {
  // start time request
  const start =  Date.now();
  next();
  // actions executed after return route
  // time passed in milliseconds bewteen request and response
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

// middleware json parsing
app.use(express.json());

// POST request
app.post('/friends', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: "Missing friend name"
    });
  }
  const newFriend = {
    name: req.body.name,
    id: friends.length
  };
  friends.push(newFriend);

  res.json(newFriend);
});

// define a ROUTE
app.get('/friends', (req, res) => {
  res.json(friends);
});

// route with param
app.get('/friends/:friendId', (req, res) => {
  const friendId = Number(req.params.friendId);
  // validate values passed to avoix XSS
  const friend = friends[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist"
    });
  }
});

app.get('/messages', (req, res) => {
  res.send('<ul><li>Helloo Albert!</li></ul>');
});

app.post('/messages', (req, res) => {
  console.log('Updating messages...');
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
