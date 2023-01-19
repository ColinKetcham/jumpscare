import logo from './logo.svg';
import './App.css';

import List from './components/moviesList';
import TvList from './components/tvShowsList';
import Player from './components/player';
import TimeLine from './components/TimeLine';
import { Stopwatch } from './components/Stopwatch';
import Header from './components/Header';

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
      <Header />
      <TvList />
    </div>
  );
}

export default App;
