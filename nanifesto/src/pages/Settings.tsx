import React from 'react';
import { useState } from 'react';
import Credits from '../components/Credits.tsx';

export default function Settings({ dark, setDark }) {
  const [creditsOpen, setCreditsOpen] = useState(false);

  console.log('dark in settings', dark);
  console.log('theme in settings', window.localStorage.getItem('theme'));

  const handleLightSwitch = () => {
    if (dark) {
      setDark(false);
      window.localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setDark(true);
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }

  return(
    <>
      <Credits creditsOpen={creditsOpen} setCreditsOpen={setCreditsOpen} />
      <div className={`flex w-screen h-screen bg-honey-50 dark:bg-slate-900 place-content-center place-items-center`}>
        <div
          className={
            `flex flex-col justify-center items-center space-y-4 w-4/6 h-2/6 md:w-3/6 font-mono text-jungle-600 text-3xl lg:text-6xl`
          }
        >
          <span
            className={`hover:cursor-pointer transition hover:text-jungle-300`}
            onClick={handleLightSwitch}
          >
            { dark ? 'light mode' : 'dark mode' }
          </span>
          <span
            className={`hover:cursor-pointer transition hover:text-jungle-300`}
            onClick={() => { setCreditsOpen(true); }}
          >
            credits
          </span>
        </div>
      </div>
    </>
  )
}