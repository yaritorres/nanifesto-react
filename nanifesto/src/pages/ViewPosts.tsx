import React from "react";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "../components/DeleteConfirmation.tsx";
import axios from 'axios';
import cleanDate from "../hooks/cleanDate.ts";

export default function ViewPosts({ adminStatus }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [deletedItem, setDeletedItem] = useState(0);

  const handleDelete = ( id:number ) => {
    const options = {
      url: 'http://localhost:3001/posts/delete',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
    };

    document.getElementById(id.toString())?.classList.add('animate-fadeOut');

    axios.put(options.url, {id: id}, {headers: options.headers})
    .then(() => {
      console.log('Deleted!');
    })
    .catch(err => console.log(err))
  };

  // GRABS CURRENT POSTS FOUND IN DATABASE AND CUTS OFF PART OF THE DATE THAT
  // IS BEING ADDED ON BY THE DATABASE FOR SOME REASON (IT ADDS TIME POSTED BUT DEFAULTS TO 00:00:00)
  useEffect(() => {
    const options = {
      url: 'http://localhost:3001/posts',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
    };

    const retrievePosts = async () => {
      try {
        let database;

        database = await axios.get(options.url, {headers: options.headers})

        const adjustedData = cleanDate(database.data);
        setPosts(adjustedData.reverse());
      }
      catch (err) {
        console.log(err);
      }
    }

    retrievePosts();
  }, [])

  return (
    <>
      <DeleteConfirmationModal
        handleDelete={handleDelete} deletedItem={deletedItem} setDeletedItem={setDeletedItem}
      />
      <div
        className={
          `flex w-screen h-screen bg-honey-50 place-content-center place-items-center`
        }
      >
        <ul
          className={
            `relative top-6 sm:top-12 flex flex-col w-5/6 h-5/6 sm:h-4/6 xl:h-3/4 overflow-y-auto space-y-6 pr-4`
          }
        >
        {posts.map((post, postKey) =>
          <li
            key={postKey}
            id={post.id}
            className={
              `rounded bg-jungle-300 w-full h-fit-content`
            }
          >
            <div
              className={`flex flex-col rounded-t w-full h-content font-mono text-2xl bg-jungle-600 p-4 select-none`}
            >
              <label className={`font-mono text-jungle-100 text-2xl select-none`}>
                {post.title}
              </label>
              <button
                data-key={post.id}
                onClick={
                  e => {
                    const target = e.target as HTMLButtonElement;
                    setDeletedItem(Number(target.getAttribute('data-key')));
                  }
                }
                className={
                  `flex h-fit text-jungle-800 hover:cursor-pointer transition hover:text-slate-100 place-self-end
                  ${adminStatus ? '' : 'hidden'}`}
              >
                delete
              </button>
            </div>
            <div className={`border-solid border-slate-100 dark:border-slate-900 border-2 w-full mb-2`}></div>
            <p className={`w-full h-auto p-4 font-mono text-honey-900 text-xl select-none`}> {post.body} </p>
            <span
              className={
                `block w-fit h-auto font-mono text-lg text-jungle-100 select-none m-4 mt-0`
              }
            >
              posted: {post.date_posted}
            </span>
          </li>
        )}
        </ul>
      </div>
    </>
  )
}