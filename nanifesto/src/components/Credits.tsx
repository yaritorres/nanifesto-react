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
      <div className={`flex flex-col w-5/6 h-2/6 sm:w-4/6 md:w-3/6 md:h-1/6 lg:w-3/6 lg:h-1/6 xl:w-2/6 xl:h-2/6 space-y-2`}>
        <div
          className={
            `flex flex-col w-full h-full bg-slate-900 rounded border-solid border-lime-500 border-2 text-xl text-lime-500 text-center font-mono space-y-4 p-4`
          }
        >
          <span className={`text-slate-700`}> made by yari torres nicola </span>
          <a
            href='https://github.com/yaritorres'
            target='noreferrer'
            className={`font-mono text-lime-500 text-3xl hover:cursor-pointer transition hover:text-green-900`}
          >
            github
          </a>
          <a
            href='https://www.linkedin.com/in/yaritorresnicola/'
            target='noreferrer'
            className={`font-mono text-lime-500 text-3xl hover:cursor-pointer transition hover:text-green-900`}
          >
            linkedin
          </a>
        </div>
        <button
          onClick={() => { setCreditsOpen(false); }}
          className={
            `bg-green-900 text-lime-500 text-xl rounded p-2 transition-all hover:bg-green-700 hover:cursor-pointer self-end`
          }
        >
            close
        </button>
      </div>
    </div>
  )
}