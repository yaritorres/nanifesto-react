import React from "react"

export default function FailedLoginAlert(
  { failedLogin, setFailedLogin }:{ failedLogin:Boolean, setFailedLogin:Function }
) {
  return (
    <div
      onClick={() => { setFailedLogin(false) }}
      className={
        `flex fixed w-screen h-screen backdrop-blur-sm items-center justify-center z-50
        ${failedLogin ? '' : 'hidden'}`
      }
    >
      <div
        className={
          `flex w-1/6 h-1/6 bg-green-900 rounded text-2xl text-lime-500 border-lime-500 border-solid border-2 items-center justify-center`
        }
      >
        <span className={`text-center`}> incorrect username or password </span>
      </div>
    </div>
  )
}