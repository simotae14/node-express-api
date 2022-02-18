const express = require('express');

const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');

const app = express();

const PORT = 3000;

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
app.post('/friends', friendsController.postFriend);
// define a ROUTE
app.get('/friends', friendsController.getFriends);
// route with param
app.get('/friends/:friendId', friendsController.getFriend);

app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
