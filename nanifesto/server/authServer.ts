import env from 'env-var';
import express from 'express';
import cors from 'cors';
import postgres from '../database/db.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const secret = env.get('TOKEN_SECRET').default('').asString();

app.use(express.json());
app.use(cors());

app.listen(4000);
console.log(`Listening on port 4000`);

app.post('http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:4000/users/create', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  try {
    postgres.addUser(req.body.username, hashedPassword)
    .then(() =>
      res.status(201).send('User saved successfully.')
    )
    .catch((error) => {
      console.log(error)
      res.status(500).send('User unable to be saved successfully.')
    })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});

app.post('http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:4000/users/login', async (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const password = req.body.password;

  if (username == null) {
    return res.status(400).send('User not found.');
  }
  try {
    postgres.findUser(username)
    .then(async response => {
      if (response.rows[0]) {
        if (await bcrypt.compare(password, response.rows[0].password)) {
          const accessToken = jwt.sign(user, secret, { expiresIn: '1hr'});
          res.json({ accessToken: accessToken });
        } else {
          res.status(500).send('Incorrect username or password')
        }
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).send('Something went wrong.')
    })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});

app.delete('http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:4000/users/logout', (req,res) => {
  res.status(203).send('Successfully logged out.');
});