import express from 'express';
import cors from 'cors';
import postgres from '../database/db.ts';
import jwt from 'jsonwebtoken';
import env from 'env-var';

const app = express();
const secret: string = env.get('TOKEN_SECRET').asString() as string;

app.use(express.json());
app.use(cors({
  origin: 'http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:9000/'
}));

app.listen(3001);
console.log(`Listening on port 3001`);


// GET EXISTING POSTS
app.get(`/posts`, authenticateToken, (req, res) => {
  postgres.getPosts()
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => console.log(err));
});


// ADD NEW POST
app.post('/posts/save-new', authenticateToken, (req, res) => {
  postgres.newPost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('cant post:', err);
  })
});


// DELETE POST
app.put('/posts/delete', authenticateToken, (req, res) => {
  postgres.deletePost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('couldnt delete:', err);
  })
});

app.get('/find-user', authenticateToken, (req, res) => {
  postgres.findUser(req.body.user.name)
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

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.body.user = user;
    next();
  })
}