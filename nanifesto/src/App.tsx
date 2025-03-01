import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Login from '../src/pages/Login.tsx';
import Home from '../src/pages/Home.tsx';
import NewPost from '../src/pages/NewPost.tsx';
import ViewPosts from '../src/pages/ViewPosts.tsx';
import Settings from '../src/pages/Settings.tsx';
import Header from './components/Header.tsx';
import HamburgerMenu from './components/HamburgerMenu.tsx';

import findUser from './hooks/findUser.ts';

function App() {
  const [loggedAs, setLoggedAs] = useState<string>('');
  const [adminStatus, setAdminStatus] = useState<boolean>();
  const [dark, setDark] = useState<boolean>(true);
  const location = useLocation();

  // SETS CURRENT THEME (LIGHT OR DARK) ON PAGE USING LOCAL STORAGE,
  // OTHERWISE DEFAULTS TO DARKMODE IF NONE IS SET
  useEffect(() => {
    const savedMode = window.localStorage.getItem('theme');

    if (savedMode === '') {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else if (savedMode === 'dark') {
      document.documentElement.classList.add('dark');
      setDark(true);
    } else {
      document.documentElement.classList.add('light');
      setDark(false);
    }
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem('accessToken')) {
      return;
    }

    async function checkUser () {
      let result;

      result = await findUser(window.localStorage.getItem('accessToken') ?? '');

      if (!result) {
        setLoggedAs('Token Expired');
        setAdminStatus(false);
        return;
      }

      setLoggedAs(result.username);
      setAdminStatus(result.admin);
    }
    checkUser();
  }, [location])

  const path =  new URL(window.location.href).pathname;

  return (
    <>
      <Header loggedAs={loggedAs} setLoggedAs={setLoggedAs} />
      { path === '/' ? null : <HamburgerMenu adminStatus={adminStatus} /> }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<Home adminStatus={adminStatus} />}
        />
        <Route path="/new-post" element={<NewPost adminStatus={adminStatus} />} />
        <Route path="/view-posts" element={<ViewPosts adminStatus={adminStatus} />} />
        <Route path="/settings" element={<Settings dark={dark} setDark={setDark} />} />
      </Routes>
    </>
  );
}

export default App;
