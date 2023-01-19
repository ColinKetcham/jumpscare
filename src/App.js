import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

import List from './components/MoviesList';
import TvList from './components/tvShowsList';
import Player from './components/player';
import TimeLine from './components/TimeLine';
import { Stopwatch } from './components/Stopwatch';
import Header from './components/Header';
import MovieList from './components/MoviesList';

import React, { useState } from 'react';

console.log(process.env);

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
      </Routes>
    </div>
  );
}

export default App;
