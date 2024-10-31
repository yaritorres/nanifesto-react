import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostedAlert from "../components/PostedAlert.tsx";
import axios from 'axios';

export default function NewPost({ adminStatus }) {
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
      url: 'http://ec2-13-57-35-52.us-west-1.compute.amazonaws.com:9000/posts/save-new',
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

  return (
    <>
    { !adminStatus ?
      <div
        className={`flex w-screen h-screen bg-honey-50 place-items-center place-content-center text-jungle-500`}
      >
        henlo unauthorized user !! get out of here freak !
      </div>
      :
      <>
        <PostedAlert posted={posted} setPosted={setPosted} handleRouting={handleRouting} />
        <div
          className={
            `flex w-screen h-screen bg-matcha-50 place-items-center place-content-center`
          }
        >
          <form
            className={
              `relative xl:top-10 flex w-5/6 sm:w-3/6 md:w-4/6 lg:w-4/6 xl:w-3/6 h-3/6 xl:h-4/6 p-5 justify-center items-start flex-col space-y-2`
            }
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          >
            <label className='font-mono text-matcha-500 text-2xl select-none'> title </label>
            <input
              type='text'
              className={
                `text-matcha-900 bg-honey-200 rounded border-solid border-2 w-full sm:w-2/4 p-2 overflow-x-auto
                ${ titleExists ? 'border-honey-800' : 'border-red-900' }`
              }
              onChange={(e) => { setTitle(e.target.value)} }
            >
            </input>
            <label className='font-mono text-matcha-500 text-2xl select-none'> body </label>
            <textarea
              className={
                `text-matcha-900 bg-honey-200 rounded border-solid border-2 w-full h-full p-2 overflow-y-auto resize-none
                ${ bodyExists ? 'border-honey-800' : 'border-red-900' }`
              }
              onChange={(e) => { setBody(e.target.value)} }
            >
            </textarea>
            <input
              type='submit'
              value='save and post'
              className={
                `bg-matcha-500 font-mono text-matcha-50 rounded p-2 self-end hover:cursor-pointer transition-all hover:bg-matcha-300`
              }
            >
            </input>
          </form>
        </div>
      </>
    }
    </>
  )
}