import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ adminStatus }) {
  const navigate = useNavigate();

  return (
    <div
      className={
        `flex w-screen h-screen bg-honey-50 dark:bg-slate-900 place-content-center place-items-center`
      }
    >
      <div
        className={
          `flex flex-col w-5/6 sm:w-2/4 sm:flex lg:w-4/6 xl:w-2/4 space-y-4`
        }
      >
        <p className={`text-center text-honey-900 text-4xl`}>
          Welcome to <b className="text-jungle-500">Nanifesto</b>, the premiere blogging app of the renowned Nani.
        </p>
        <p className={`place-self-center text-center text-honey-900 text-2xl w-5/6`}>
          Click below to get started reading world-class posts about the daily goings-on of this celebrity.
        </p>
        <button
          className={
            `w-2/3 bg-jungle-600 text-honey-50 font-mono text-2xl lg:text-3xl place-self-center text-center rounded p-4 hover:cursor-pointer transition-all hover:bg-jungle-400
            ${ adminStatus ? '' : 'hidden' }`
          }
          onClick={() => { navigate('/new-post') }}
        >
          make a new post
        </button>
        <button
          className={
            `w-2/3 bg-jungle-600 text-honey-50 font-mono text-2xl lg:text-3xl place-self-center text-center rounded p-4 hover:cursor-pointer transition-all hover:bg-jungle-400`
          }
          onClick={() => { navigate('/view-posts') }}
        >
          view posts
        </button>
      </div>
    </div>
  );
}