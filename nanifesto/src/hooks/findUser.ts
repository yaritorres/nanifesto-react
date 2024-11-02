import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:3001';

export default async function findUser(token:string) {
  try {
    let result;

    result = await axios.get('/find-user', {headers: {"Authorization": `Bearer ${token}`}});

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