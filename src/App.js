import './App.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import TvList from './components/TvShowsList';
import Header from './components/Header';
import MovieList from './components/MoviesList';
import Player from './components/Player';

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
          <Route path='movies' element={<MovieList />} />
        </Route>
        <Route path='/player' element={<Player />}></Route>
      </Routes>
    </div>
  );
}

export default App;
