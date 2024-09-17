import axios from 'axios';

const options = {
  url: 'http://localhost:3001/find-user',
  headers: {}
};

export default async function findUser(token:string) {
  try {
    let result;

    result = await axios.get(options.url, {headers: {"Authorization": `Bearer ${token}`}});

    if (!result.data.username) {
      return {
        username: 'Token Expired'
      }
    }

    return result.data;
  }
  catch (err) {
    console.log(err);
  }
};