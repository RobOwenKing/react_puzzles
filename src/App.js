import './App.css';

import { Puzzle } from './components/puzzle.jsx';

function App() {
  return (
    <div>
      <header>
        <h1>Pencil Puzzles Without Pencils</h1>
      </header>
      <Puzzle rows={3} cols={3} />
    </div>
  );
}

export default App;
