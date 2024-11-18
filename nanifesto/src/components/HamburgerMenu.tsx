import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function HamburgerMenu({ adminStatus }) {
  const [hamOpen, setHamOpen] = useState(false);
  const navigate = useNavigate();

  const handleHam = () => { setHamOpen(!hamOpen); };

  return (
    <>
      <button
        onClick={handleHam}
        className={
          `fixed top-2 sm:top-24 left-4 flex flex-col space-y-1 h-12 w-14 bg-matcha-300 dark:bg-matcha-300 rounded justify-center items-center
          transition hover:bg-matcha-400 hover:dark:bg-matcha-100 z-40`
        }
      >
        <span
          className={
            `block h-1 w-8 rounded bg-matcha-500`
          }
        >
        </span>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-matcha-500 block transition-all ${ hamOpen ? 'w-6 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-matcha-500 block transition-all ${ hamOpen ? 'w-4 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
      </button>
      <ul
        className={
          `fixed top-16 sm:top-40 left-2 bg-matcha-500 dark:bg-matcha-400 p-4 h-fit-content w-40 rounded flex flex-col justify-center items-center z-40 text-xl font-mono text-matcha-50
          transition-all ${ hamOpen ? '' : 'delay-200 opacity-0'}`
        }
      >
        <button
          onClick={() => { handleHam(); navigate('/home'); }}
          className={
            `relative transition-all hover:text-matcha-800 delay-50 ${ hamOpen ? 'opacity-100' : 'opacity-0' }`
          }
        >
          Home
        </button>
        <button
          onClick={() => { handleHam(); navigate('/new-post'); }}
          className={`
            relative transition-all hover:text-matcha-800
            ${ hamOpen ? 'opacity-100' : 'opacity-0' }
            ${ adminStatus ? '' : 'hidden' }`
          }
        >
          New Post
        </button>
        <button
          onClick={() => { handleHam(); navigate('/view-posts'); }}
          className={`
            relative transition hover:text-matcha-800 transition-all ${ hamOpen ? 'opacity-100' : 'opacity-0' }`
          }
        >
          View Posts
        </button>
        <button
          onClick={() => { handleHam(); navigate('/settings'); }}
          className={`
            relative transition hover:text-matcha-800 transition-all ${ hamOpen ? 'opacity-100' : 'opacity-0' }`
          }
        >
          Settings
        </button>
        <button
          onClick={() => { handleHam(); navigate('/'); }}
          className={`
            lg:hidden relative transition hover:text-matcha-800 transition-all ${ hamOpen ? 'opacity-100' : 'opacity-0' }`
          }
        >
          Log Out
        </button>
      </ul>
      <div
        className={
          `fixed w-screen h-screen bg-transparent inset-0 transition-all duration-50 z-30
          ${ hamOpen ? '' : 'hidden' }`
        }
        onClick={handleHam}
      >
      </div>
    </>
  );
}