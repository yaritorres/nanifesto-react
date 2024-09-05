import React from 'react';
import { useState, useEffect } from "react";
const axios = require('axios').default;

export default function HamburgerMenu() {
  const [hamOpen, setHamOpen] = useState(false);
  const [adminStatus, setAdminStatus] = useState();
  const handleHam = () => { setHamOpen(!hamOpen) };

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
    <>
      <button
        onClick={handleHam}
        className={
          `fixed top-2 sm:top-24 left-2 flex flex-col space-y-1 h-12 w-14 bg-green-900 rounded justify-center items-center
          transition hover:bg-green-700 z-40`
        }
      >
        <span
          className={
            `block h-1 w-8 rounded bg-lime-500 transition-all`
          }
        >
        </span>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-lime-500 block transition-all ${ hamOpen ? 'w-6 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-lime-500 block transition-all ${ hamOpen ? 'w-4 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
      </button>
      <ul
        className={
          `fixed top-16 sm:top-40 left-2 bg-lime-500 p-4 h-fit-content w-40 rounded flex flex-col justify-center items-center z-40
          transition-all duration-300 ${ hamOpen ? 'left-2' : 'delay-300 opacity-0'}`
        }
      >
        <Link
          onClick={handleHam}
          href='/pages/home'
          className={
            `relative text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all delay-50 ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          Home
        </Link>
        <Link
          onClick={handleHam}
          href='/pages/new-post'
          className={`
            relative text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all delay-100
            ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }
            ${ adminStatus ? '' : 'hidden' }`
          }
        >
          New Post
        </Link>
        <Link
          onClick={handleHam}
          href='/pages/view-posts'
          className={`
            relative text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all delay-200 ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          View Posts
        </Link>
        <Link
          onClick={handleHam}
          href='/pages/login'
          className={`
            relative text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all delay-300 ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          Log In
        </Link>
        <Link
          onClick={handleHam}
          href='/pages/settings'
          className={`
            relative text-xl block font-mono text-green-900 transition hover:text-green-700
            transition-all delay-500 ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          Settings
        </Link>
      </ul>
      <div
        className={
          `fixed w-screen h-screen bg-transparent inset-0 transition-all duration-300
          ${ hamOpen ? 'backdrop-blur-sm animate-fastFadeIn' : 'hidden' }`
        }
        onClick={handleHam}
      >
      </div>
    </>
  );
}