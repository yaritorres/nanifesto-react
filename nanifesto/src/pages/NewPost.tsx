import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostedAlert from "../components/PostedAlert.tsx";
import axios from 'axios';

export default function NewPost() {
  const [posted, setPosted] = useState<boolean>(false);
  const [titleExists, setTitleExists] = useState<boolean>(true);
  const [bodyExists, setBodyExists] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const navigate = useNavigate();

  const handleRouting = () => {
    return navigate('/view-posts');
  }

  const handleSubmit = () => {
    if (title && body) {
      setTitleExists(true);
      setBodyExists(true);
      savePost(title, body);
    } else if (!title && body) {
      setTitleExists(false);
      setBodyExists(true);
    } else if (title && !body) {
      setTitleExists(true);
      setBodyExists(false);
    }
  }

  const savePost = (title:string, body:string) => {
    const options = {
      url: 'http://localhost:3001/posts/save-new',
      headers: {
        "Authorization": `Bearer ${window.localStorage.accessToken}`
      }
    };

    axios.post(options.url, {title: title, body: body}, {headers: options.headers})
    .then(() => {
      setPosted(true);
      console.log('posted!');
    })
    .catch(err => {
      console.log('womp womp, no post:', err);
    })
  }

  // SETS CURRENT THEME (LIGHT OR DARK) ON PAGE USING LOCAL STORAGE,
  // OTHERWISE DEFAULTS TO DARKMODE IF NONE IS SET
  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add(savedMode || 'dark');
    }
  }, []);

  return (
    <>
      <PostedAlert posted={posted} setPosted={setPosted} handleRouting={handleRouting} />
      <div
        className={
          `flex w-screen h-screen bg-slate-100 dark:bg-slate-900 place-items-center place-content-center`
        }
      >
        <form
          className={
            `relative xl:top-10 flex w-5/6 sm:w-3/6 md:w-4/6 lg:w-4/6 xl:w-3/6 h-3/6 xl:h-4/6 rounded border-green-900 dark:border-lime-500 border-solid border-4 p-5 justify-center items-start flex-col space-y-2`
          }
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
        >
          <label className='font-mono text-green-900 dark:text-lime-500 select-none'> title </label>
          <input
            type='text'
            id='title'
            className={
              `dark:text-white bg-lime-400 dark:bg-green-900 rounded border-solid border-2 w-full sm:w-2/4 p-2 overflow-x-auto
              ${ titleExists ? 'border-green-900' : 'border-red-900' }`
            }
            onChange={(e) => { setTitle(e.target.value)} }
          >
          </input>
          <label className='font-mono text-green-900 dark:text-lime-500 select-none'> body </label>
          <textarea
            id='body'
            className={
              `dark:text-white bg-lime-400 dark:bg-green-900 rounded border-solid border-2 border-green-900 w-full h-full p-2 overflow-y-auto resize-none ${ bodyExists ? 'border-green-900' : 'border-red-900' }`
            }
            onChange={(e) => { setBody(e.target.value)} }
          >
          </textarea>
          <input
            type='submit'
            value='save and post'
            className={
              `bg-green-900 font-mono text-lime-500 rounded p-2 self-end transition-all hover:bg-green-700 hover:cursor-pointer`
            }
          >
          </input>
        </form>
      </div>
    </>
  )
}