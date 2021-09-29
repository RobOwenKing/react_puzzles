import './App.css';

import React from 'react';

import { Puzzle } from './components/puzzle.jsx';

function App() {
  const [constraints, setConstraints] = React.useState({});

  return (
    <div>
      <header>
        <h1>Pencil Puzzles Without Pencils</h1>
      </header>
      <Puzzle
        rows={6} cols={6}
        constraints={constraints} setConstraints={setConstraints}
      />
    </div>
  );
}

export default App;
