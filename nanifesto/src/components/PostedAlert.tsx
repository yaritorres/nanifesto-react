import React from "react";

export default function PostedAlert({ posted, setPosted, handleRouting }:{ posted:Boolean, setPosted:Function, handleRouting:Function }) {
  return (
    <div
      className={
        `flex fixed w-screen h-screen backdrop-blur-sm items-center justify-center z-50
        ${posted ? 'animate-fadeIn' : 'hidden'}`
      }
      onAnimationEnd={ () => { setPosted(false); handleRouting(); } }
    >
      <div
        className={
          `flex w-1/6 h-1/6 bg-green-900 rounded text-2xl text-lime-500 border-lime-500 border-solid border-2 items-center justify-center`
        }
      >
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-lime-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          >
          </path>
        </svg>
        <span> posting... </span>
      </div>
    </div>
  )
}