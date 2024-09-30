import React from "react";

export default function Credits({ creditsOpen, setCreditsOpen }:{ creditsOpen:Boolean, setCreditsOpen:Function }) {
  return (
    <div
      className={
        `fixed w-screen h-screen backdrop-blur-sm items-center justify-center z-50
        transition all ${ creditsOpen ? 'flex flex-col' : 'hidden' }`
      }
      onClick={() => { setCreditsOpen(false); }}
    >
      <div className={`flex flex-col w-5/6 h-1/4 sm:w-4/6 md:w-3/6 md:h-1/6 lg:w-3/6 lg:h-1/6 xl:w-2/6 xl:h-2/6 space-y-2`}>
        <div
          className={
            `flex flex-col w-full h-full bg-matcha-50 rounded border-solid border-matcha-500 border-4 text-matcha-500 text-center font-mono space-y-4 p-4`
          }
        >
          <span className={`text-xl`}> made by yari torres nicola </span>
          <a
            href='https://github.com/yaritorres'
            target='noreferrer'
            className={`text-3xl hover:cursor-pointer transition hover:text-matcha-300`}
          >
            github
          </a>
          <a
            href='https://www.linkedin.com/in/yaritorresnicola/'
            target='noreferrer'
            className={`text-3xl hover:cursor-pointer transition hover:text-matcha-300`}
          >
            linkedin
          </a>
        </div>
        <button
          onClick={() => { setCreditsOpen(false); }}
          className={
            `bg-matcha-500 text-matcha-50 text-xl font-mono rounded p-2 transition-all hover:bg-matcha-300 hover:cursor-pointer self-end`
          }
        >
            close
        </button>
      </div>
    </div>
  )
}