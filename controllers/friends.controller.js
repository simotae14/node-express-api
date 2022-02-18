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

function postFriend(req, res) {
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
}

function getFriend(req, res) {
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
}

function getFriends(req, res) {
  res.json(friends);
}

module.exports = {
  postFriend,
  getFriends,
  getFriend
};
