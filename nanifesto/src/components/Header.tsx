import React from "react";
import { useState, useEffect } from "react";
const axios = require('axios').default;

export default function Header() {
  const [loggedAs, setLoggedAs] = useState();

  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/find-user',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
    };

    async function findUser() {
      try {
        let result;

        result = await axios.get(options.url, {headers: options.headers});

        console.log('logged in as:', result.data.username);
        setLoggedAs(result.data.username);
      }
      catch (err) {
        console.log(err);
      }
    };

    findUser()
  }, [loggedAs])

  return (
    <div
      className={
        `fixed top-0 w-screen h-20 dark:bg-green-900 border-lime-500 border-solid border-b-4 font-mono text-2xl text-lime-500 p-4 items-center hidden sm:flex flex-row`
      }
    >
      <span className={`w-2/3`}> nanifesto. </span>
      <span className={`flex place-content-end w-1/3`}> logged in as: {loggedAs} </span>
    </div>
  )
}