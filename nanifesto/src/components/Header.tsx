import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:4000';

export default function Header({ loggedAs, setLoggedAs }) {
  const path =  new URL(window.location.href).pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    const options = {
      headers: {}
    };

    axios.delete('/users/logout', {headers: options.headers})
    .then(response => {
      console.log(response);
      window.localStorage.removeItem('accessToken');
      setLoggedAs('');
      navigate('/');
    })
    .catch(() => {
      console.log('Something went wrong and you could not be logged out.');
    })
  }

  return (
    <div
      className={
        `fixed top-0 w-screen h-20 bg-honey-900 dark:bg-sapphire-900 border-matcha-300 dark:border-sapphire-500 border-solid border-b-4 font-mono text-2xl text-honey-100 p-4 items-center hidden sm:flex flex-row`
      }
    >
      <a
        href={ path === '/' ? '/' : '/home' }
        className={
          `transition text-matcha-300 dark:text-sapphire-500 hover:text-matcha-100 hover:dark:text-sapphire-300`
        }
      >
        nanifesto.
      </a>
      { path === '/' ?
        null
        :
        <span className={`flex place-content-end w-full text-matcha-300 dark:text-sapphire-500`}> {loggedAs} </span>
      }
      { loggedAs && path !== '/' ?
        <button
          className={
            `w-36 transition text-matcha-500 dark:text-sapphire-700 hover:text-matcha-100 hover:dark:text-sapphire-300`
          }
          onClick={handleLogout}
        >
          log out
        </button>
        :
        null
      }
    </div>
  )
}