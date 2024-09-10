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
  const location = useLocation();

  useEffect(() => {
    if (!window.localStorage.getItem('accessToken')) {
      console.log('running in app...');
      return;
    }

    async function checkUser () {
      let result;

      result = await findUser(window.localStorage.getItem('accessToken'));

      setLoggedAs(result.username);
      setAdminStatus(result.admin);
    }
    checkUser();
  }, [location])

  const path =  new URL(window.location.href).pathname;
  console.log('PATH:', path);

  return (
    <>
      <Header loggedAs={loggedAs} setLoggedAs={setLoggedAs} />
      { path === '/' ? null : <HamburgerMenu adminStatus={adminStatus} loggedAs={loggedAs} /> }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={<Home findUser={findUser} setLoggedAs={setLoggedAs} adminStatus={adminStatus} setAdminStatus={setAdminStatus} />}
        />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/view-posts" element={<ViewPosts adminStatus={adminStatus} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
