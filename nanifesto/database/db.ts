/* eslint-disable import/no-anonymous-default-export */
import pg from 'pg';
import env from 'env-var';
import * as dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const db = new Pool({
  user: env.get('DB_USER').asString(),
  host: env.get('DB_HOST').asString(),
  database: env.get('DB_NAME').asString(),
  password: env.get('DB_PASSWORD').asString(),
  port: env.get('DB_PORT').asString()
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

const addUser = (username:string, password:string) => {
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

export default {
  getPosts: getPosts,
  newPost: newPost,
  deletePost: deletePost,
  addUser: addUser,
  findUser: findUser,
};