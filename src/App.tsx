import React from 'react';

import './App.css';
import { BuscaCep } from './BuscaCep';
import { Crud } from './Crud';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BuscaCep />
        <div className='linha'></div>
        <Crud />
      </header>
    </div>
  );
}

export default App;
