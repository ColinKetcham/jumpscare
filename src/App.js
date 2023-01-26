import './App.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import TvList from './components/TvShowsList';
import Header from './components/Header';
import MovieList from './components/MoviesList';
import Player from './components/Player';
import { AddMedia } from './components/AddMedia';
import SignInSide from './components/SignIn';

import React, { useState } from 'react';

function App() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='tvshows' element={<TvList />} />
          {/* <Route path='movies' element={<MovieList />} /> */}
          <Route path='AddMedia' element={<AddMedia />} />
        </Route>
        <Route path='/player' element={<Player />} />
        <Route path='/signin' element={<SignInSide />} />
      </Routes>
    </div>
  );
}

export default App;
