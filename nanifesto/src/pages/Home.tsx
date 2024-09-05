import React from "react";
import { useState, useEffect } from "react";
const axios = require('axios').default;

export default function Home() {
  const [adminStatus, setAdminStatus] = useState();
  // SETS CURRENT THEME (LIGHT OR DARK) ON PAGE USING LOCAL STORAGE,
  // OTHERWISE DEFAULTS TO DARKMODE IF NONE IS SET
  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode || 'dark');
    }
  }, []);

  useEffect(() => {
    const options = {
      url: 'http://localhost:3000/find-user',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
    };

    async function findUser () {
      try {
        let result;

        result = await axios.get(options.url, {headers: options.headers});

        setAdminStatus(result.data.admin);
      }
      catch (err) {
        console.log(err);
      }
    };

    findUser()
  }, [])

  return (
    <div
      className={
        `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`
      }
    >
      <div
        className={
          `flex flex-col w-5/6 sm:w-2/4 sm:flex lg:w-4/6 xl:w-2/4 space-y-4`
        }
      >
        <a
          className={
            `bg-green-900 text-lime-500 font-mono text-2xl lg:text-3xl text-center rounded p-4 hover:cursor-pointer transition hover:bg-green-700
            ${ adminStatus ? '' : 'hidden' }`
          }
          href='/pages/new-post'
        >
          make a new post
        </a>
        <a
          className={
            `bg-green-900 text-lime-500 font-mono text-2xl lg:text-3xl text-center rounded p-4 hover:cursor-pointer transition hover:bg-green-700`
          }
          href='/pages/view-posts'
        >
          view posts
        </a>
      </div>
    </div>
  );
}