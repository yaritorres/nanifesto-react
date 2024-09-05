import React from "react";
const axios = require('axios').default;
import FailedLoginAlert from "../components/FailedLoginAlert.tsx";
import LoginAlert from "../components/LoginAlert.tsx";
import { useState, useEffect } from 'react';

export default function Login() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRouting = () => {
    // router.push('/pages/home');
  }

  const handleLogin = () => {
    const options = {
      url: 'http://localhost:4000/users/login',
      headers: {}
    };

    let password = `${(document.getElementById('password') as HTMLInputElement).value}`;

    axios.post(options.url, {username: username, password: password}, {headers: options.headers})
    .then(response => {
      console.log(response);
      console.log('Logged in!');
      window.localStorage.setItem('accessToken', response.data.accessToken);
      setLoggedIn(true);
    })
    .catch(() => {
      setFailedLogin(true);
      console.log('Incorrect username or password!');
    })
  }

  const handleGuestLogin = () => {
    const options = {
      url: 'http://localhost:4000/users/login',
      headers: {}
    };

    axios.post(options.url, {username: 'guest', password: 'guest'}, {headers: options.headers})
    .then(response => {
      console.log(response);
      console.log('Logged in!');
      window.localStorage.setItem('accessToken', response.data.accessToken);
      setLoggedIn(true);
    })
    .catch(() => {
      setFailedLogin(true);
      console.log('Incorrect username or password!');
    })
  }

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

  return (
    <>
      <LoginAlert loggedIn={loggedIn} setLoggedIn={setLoggedIn} handleRouting={handleRouting} />
      <FailedLoginAlert failedLogin={failedLogin} setFailedLogin={setFailedLogin} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-content-center place-items-center`
        }
      >
        <div className={`flex flex-col w-full h-full place-items-center place-content-center`}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className={
              `flex flex-col w-3/6 sm:w-2/4 lg:w-4/6 xl:w-2/6 rounded space-y-4 bg-green-900 p-4 place-content-center mb-4`
            }
          >
            <span className={`text-3xl text-lime-500 font-mono place-self-center`}> welcome to nanifesto </span>
            <div className={``}>
              <label className={`text-lime-500 font-mono text-xl`}> username </label>
              <input
                id='username'
                type='text'
                className={`w-full h-12 rounded bg-green-600 mb-4 dark:text-white p-4`}
                onChange={(e) => { setUsername(e.target.value); }}
              >
              </input>
              <label className={`text-lime-500 font-mono text-xl`}> password </label>
              <input
                id='password'
                type='password'
                className={`w-full h-12 rounded bg-green-600 dark:text-white p-4`}
                onChange={(e) => { setPassword(e.target.value); }}
              >
              </input>
            </div>
            <input
                type='submit'
                value='log in'
                className={
                  `bg-green-900 font-mono text-lime-500 text-xl rounded p-2 self-end transition-all hover:bg-green-700 hover:cursor-pointer`
                }
              >
            </input>
          </form>
          <button onClick={handleGuestLogin} className={`text-lime-500`}> continue as guest </button>
        </div>
      </div>
    </>
  );
}