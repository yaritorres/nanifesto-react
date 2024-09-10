import axios from 'axios';

const options = {
  url: 'http://localhost:3001/find-user',
  headers: {}
};

export default async function findUser(token) {
  try {
    let result;

    result = await axios.get(options.url, {headers: {"Authorization": `Bearer ${token}`}});

    return result.data;
  }
  catch (err) {
    console.log(err);
  }
};