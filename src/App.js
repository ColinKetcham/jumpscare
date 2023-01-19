import logo from './logo.svg';
import './App.css';

import List from './components/moviesList';
import TvList from './components/tvShowsList';
import Player from './components/player';
import TimeLine from './components/TimeLine';
import { Stopwatch } from './components/Stopwatch';

import React, { useState } from 'react';

console.log(process.env);

function App() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span style={{ color: 'white', alignSelf: 'center' }}>Jump Scare</span>
      <Stopwatch />
    </div>
  );
}

export default App;
