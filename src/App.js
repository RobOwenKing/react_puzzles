import './App.css';

import { Puzzle } from './components/puzzle.jsx';

function App() {
  return (
    <div>
      <header>
        <h1>Pencil Puzzles Without Pencils</h1>
      </header>
      <Puzzle
        rows={6} cols={6}
        constraints={{}}
      />
    </div>
  );
}

export default App;
