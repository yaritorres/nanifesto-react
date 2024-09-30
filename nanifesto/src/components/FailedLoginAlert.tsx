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
          `flex w-5/6 lg:w-2/6 h-1/6 lg:h-2/6 bg-honey-50 rounded text-3xl lg:text-5xl text-matcha-500 items-center justify-center`
        }
      >
        <span className={`text-center`}> incorrect username or password </span>
      </div>
    </div>
  )
}