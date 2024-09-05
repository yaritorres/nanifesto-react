import React from 'react';
import { Route } from "react-router-dom";
import Login from '../src/pages/Login.tsx';
import Home from '../src/pages/Home.tsx';
import NewPost from '../src/pages/NewPost.tsx';
import ViewPosts from '../src/pages/ViewPosts.tsx';
import Settings from '../src/pages/Settings.tsx';
import './App.css';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Login />}>
//       <Route path="home" element={<Home />} />
//       <Route path="new-post" element={<NewPost />} />
//       <Route path="view-posts" element={<ViewPosts />} />
//       <Route path="settings" element={<Settings />} />
//     </Route>
//   )
// );

function App() {
  return (
    <div className="App">
      <Route path="/" element={<Login />}>
        <Route path="home" element={<Home />} />
        <Route path="new-post" element={<NewPost />} />
        <Route path="view-posts" element={<ViewPosts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </div>
  );
}

export default App;
