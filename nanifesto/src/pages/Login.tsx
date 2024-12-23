import React from "react";
import axios from 'axios';
import FailedLoginAlert from "../components/FailedLoginAlert.tsx";
import LoginAlert from "../components/LoginAlert.tsx";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:4000';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRouting = () => {
    return navigate('/home');
  }

  const handleLogin = () => {
    axios.post('/users/login', {username: username, password: password}, {headers: {}})
    .then(response => {
      console.log('Logged in!');
      window.localStorage.setItem('accessToken', response.data.accessToken);
      setIsLoggingIn(true);
    })
    .catch(() => {
      setFailedLogin(true);
      console.log('Incorrect username or password!');
    })
  }

  const handleGuestLogin = () => {
    axios.post('/users/login', {username: 'guest', password: 'guest'}, {headers: {}})
    .then(response => {
      console.log('Logged in!');
      window.localStorage.setItem('accessToken', response.data.accessToken);
      setIsLoggingIn(true);
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
      <LoginAlert isLoggingIn={isLoggingIn} setIsLoggingIn={setIsLoggingIn} handleRouting={handleRouting} />
      <FailedLoginAlert failedLogin={failedLogin} setFailedLogin={setFailedLogin} />
      <div
        className={
          `flex w-screen h-screen bg-matcha-50 dark:bg-matcha-800`
        }
      >
        <div className={`flex flex-col w-full h-full place-items-center place-content-center`}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className={
              `flex flex-col w-5/6 sm:w-2/4 lg:w-4/6 xl:w-2/6 rounded space-y-4 bg-honey-900 dark:bg-matcha-500 p-4 place-content-center mb-4`
            }
          >
            <span className={`text-3xl text-matcha-300 dark:text-matcha-200 font-mono text-center`}> welcome to nanifesto </span>
            <div className={``}>
              <label className={`text-matcha-300 dark:text-matcha-200 font-mono text-xl`}> username </label>
              <input
                id='username'
                type='text'
                className={`w-full h-12 rounded bg-matcha-300 dark:bg-matcha-200 mb-4 text-matcha-50 dark:text-matcha-900 p-4`}
                onChange={(e) => { setUsername(e.target.value); }}
              >
              </input>
              <label className={`text-matcha-300 dark:text-matcha-200 font-mono text-xl`}> password </label>
              <input
                id='password'
                type='password'
                className={`w-full h-12 rounded bg-matcha-300 dark:bg-matcha-200 text-matcha-50 dark:text-matcha-900 p-4`}
                onChange={(e) => { setPassword(e.target.value); }}
              >
              </input>
            </div>
            <input
                type='submit'
                value='log in'
                className={
                  `bg-matcha-500 dark:bg-matcha-600 font-mono text-matcha-50 dark:text-matcha-300 text-xl rounded p-2 self-end transition-all hover:bg-matcha-300 hover:dark:bg-matcha-300 hover:dark:text-matcha-50 hover:cursor-pointer`
                }
              >
            </input>
          </form>
          <button onClick={handleGuestLogin} className={`text-3xl lg:text-base text-matcha-500 dark:text-matcha-100`}> continue as guest </button>
        </div>
      </div>
    </>
  );
}