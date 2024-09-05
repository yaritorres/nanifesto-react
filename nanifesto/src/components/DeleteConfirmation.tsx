import React from "react";

export default function DeleteConfirmationModal(
  { handleDelete, deletedItem, setDeletedItem }:{ handleDelete:Function, deletedItem:Number, setDeletedItem:Function }) {
  return (
    <div
      className={
        `fixed w-screen h-screen backdrop-blur-sm items-center justify-center z-40
        transition-all duration-300 ${ deletedItem ? 'flex opacity-100' : 'hidden' }`
      }
      onClick={() => { setDeletedItem(0); }}
    >
      <div
        className={
          `flex flex-col w-5/6 sm:w-4/6 md:w-3/6 xl:w-2/6 h-2/6 bg-slate-900 rounded text-2xl text-lime-500 items-center justify-center font-mono space-y-4 z-50`
        }
      >
        <span className={`text-slate-100 text-3xl select-none`}> are you sure? </span>
        <button
          onClick={() => { setDeletedItem(0); }}
          className={
            `bg-green-900 text-lime-500 text-2xl rounded p-2 transition-all hover:bg-green-700 hover:cursor-pointer`
          }
        >
          cancel
        </button>
        <button
          onClick={ () => { handleDelete(deletedItem); setDeletedItem(0); } }
          className={
            `bg-green-900 text-lime-500 text-2xl rounded p-2 transition-all hover:bg-green-700 hover:cursor-pointer`
          }
        >
          delete
        </button>
      </div>
    </div>
  )
}