const express = require('express');

const friendsRouter = require('./router/friends.router');
const messagesRouter = require('./router/messages.router');

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
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

// middleware json parsing
app.use(express.json());

app.use('/friends', friendsRouter);

app.use('/messages', messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
