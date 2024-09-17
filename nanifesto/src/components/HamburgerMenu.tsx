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
          `fixed top-2 sm:top-24 left-2 flex flex-col space-y-1 h-12 w-14 bg-honey-900 dark:bg-sapphire-700 rounded justify-center items-center
          transition hover:bg-honey-700 hover:dark:bg-sapphire-400 z-40`
        }
      >
        <span
          className={
            `block h-1 w-8 rounded bg-honey-500 dark:bg-sapphire-200`
          }
        >
        </span>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-honey-500 dark:bg-sapphire-200 block transition-all ${ hamOpen ? 'w-6 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
        <div className='w-8'>
          <span
            className={
              `h-1 rounded bg-honey-500 dark:bg-sapphire-200 block transition-all ${ hamOpen ? 'w-4 place-self-start' : 'w-8' }`
            }
          >
          </span>
        </div>
      </button>
      <ul
        className={
          `fixed top-16 sm:top-40 left-2 bg-jungle-600 dark:bg-sapphire-300 p-4 h-fit-content w-40 rounded flex flex-col justify-center items-center z-40
          text-xl font-mono text-honey-100 dark:text-sapphire-950
          transition-all ${ hamOpen ? '' : 'delay-200 opacity-0'}`
        }
      >
        <button
          onClick={() => { handleHam(); navigate('/home');  }}
          className={
            `relative transition-all hover:text-honey-300 delay-50 ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          Home
        </button>
        <button
          onClick={() => { handleHam(); navigate('/new-post');  }}
          className={`
            relative transition-all hover:text-honey-300
            ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }
            ${ adminStatus ? '' : 'hidden' }`
          }
        >
          New Post
        </button>
        <button
          onClick={() => { handleHam(); navigate('/view-posts');  }}
          className={`
            relative transition hover:text-honey-300 transition-all ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          View Posts
        </button>
        <button
          onClick={() => { handleHam(); navigate('/settings');  }}
          className={`
            relative transition hover:text-honey-300 transition-all ${ hamOpen ? 'left-0 opacity-100' : '-left-24 opacity-0' }`
          }
        >
          Settings
        </button>
      </ul>
      <div
        className={
          `fixed w-screen h-screen bg-transparent inset-0 transition-all duration-300
          ${ hamOpen ? '' : 'hidden' }`
        }
        onClick={handleHam}
      >
      </div>
    </>
  );
}