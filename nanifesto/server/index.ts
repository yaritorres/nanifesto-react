require('dotenv').config();
import express from 'express';
import cors from 'cors';
import postgres = require('../database/db.tsx');
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000);
console.log(`Listening on port 5000`);


// GET EXISTING POSTS
app.get(`/posts`, authenticateToken, (req, res) => {
  postgres.getPosts()
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => console.log(err));
});


// ADD NEW POST
app.post('/posts', authenticateToken, (req, res) => {
  postgres.newPost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('cant post:', err);
  })
});


// DELETE POST
app.put('/posts', authenticateToken, (req, res) => {
  postgres.deletePost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('couldnt delete:', err);
  })
});

app.get('/find-user', authenticateToken, (req, res) => {
  postgres.findUser(req.user.name)
  .then(response => {
    res.send({username: response.rows[0].username, admin: response.rows[0].admin})
  })
  .catch(err => {
    console.log(err)
  })
})

function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}