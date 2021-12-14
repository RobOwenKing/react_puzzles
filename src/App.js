import './App.css';

import React from 'react';

import { Puzzle } from './components/Puzzle.jsx';

import { puzzleToConstraints } from './helpers/puzzleToConstraints.js';
import { puzzleToInputMaps } from './helpers/puzzleToInputMaps.js';
import { setDefaultRegions } from './helpers/setDefaultRegions.js';

function App() {
  const rows = 6;
  const cols = 6;
  const [puzzle, setPuzzle] = React.useState({ 'starbattle': 1, rows: rows, cols: cols });
  const [inputMaps, setInputMaps] = React.useState(puzzleToInputMaps());
  const [regions, setRegions] = React.useState(setDefaultRegions(rows, cols));
  const [constraints, setConstraints] = React.useState({});
  const constraintCount = React.useRef(0);

  React.useEffect(() => {
    setInputMaps(puzzleToInputMaps());
  }, [puzzle]);

  React.useEffect(() => {
    setConstraints(puzzleToConstraints(puzzle, rows, cols, regions, constraintCount));
  }, [puzzle, regions]);

  return (
    <div>
      <header>
        <h1>Pencil Puzzles Without Pencils</h1>
      </header>
      <Puzzle
        rows={puzzle.rows} cols={puzzle.cols}
        constraints={constraints} setConstraints={setConstraints}
        puzzle={puzzle} setPuzzle={setPuzzle}
        regions={regions} inputMaps={inputMaps}
      />
    </div>
  );
}

export default App;
