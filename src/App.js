import logo from './logo.svg';
import './App.css';

import List from './components/moviesList';
import TvList from './components/tvShowsList';

import React, { useState } from 'react';

console.log(process.env);

function App() {
  return (
    <div>
      Movie shit
      <TvList />
    </div>
  );
}

export default App;
