import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Header({ loggedAs, setLoggedAs }) {
  const path =  new URL(window.location.href).pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    const options = {
      url: 'http://localhost:4000/users/logout',
      headers: {}
    };

    axios.delete(options.url, {headers: options.headers})
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
        `fixed top-0 w-screen h-20 bg-honey-900 border-honey-500 border-solid border-b-4 font-mono text-2xl text-honey-100 p-4 items-center hidden sm:flex flex-row`
      }
    >
      <a href='/home' className={`transition text-jungle-400 hover:text-honey-300`}> nanifesto. </a>
      { path === '/' ?
        null
        :
        <span className={`flex place-content-end w-full text-jungle-400`}> {loggedAs} </span>
      }
      { loggedAs && path !== '/' ?
        <button className={`w-36 transition text-honey-500 hover:text-honey-300`} onClick={handleLogout}> log out </button>
        :
        null
      }
    </div>
  )
}