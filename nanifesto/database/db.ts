const { Pool } = require('pg');
import env from 'env-var';

const db = new Pool({
  user: env.get('DB_USER'),
  host: env.get('DB_HOST'),
  database: env.get('DB_NAME'),
  password: env.get('DB_PASSWORD'),
  port: env.get('DB_PORT')
});

db.connect();

const getPosts = () => {
  return db.query(`
    SELECT * FROM posts
  `);
};

const newPost = ({ title, body }) => {
  return db.query(`
    INSERT INTO posts (username, title, body, date_posted)
      VALUES ('nani', '${title}', '${body}', CURRENT_DATE)
  `);
};

const deletePost = ({ id }) => {
  return db.query(`
    DELETE FROM posts WHERE id = ${id}
  `);
};

const addUser = (username, password) => {
  return db.query(`
    INSERT INTO authenticated (username, password, admin)
      VALUES ('${username}', '${password}', false)
  `);
};

const findUser = (username) => {
  return db.query(`
    SELECT * FROM authenticated WHERE username = '${username}'
  `);
};


export = {
  getPosts: getPosts,
  newPost: newPost,
  deletePost: deletePost,
  addUser: addUser,
  findUser: findUser,
};