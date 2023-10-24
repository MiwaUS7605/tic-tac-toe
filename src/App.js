// import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import { useState } from 'react';
import { FaForward, FaBackward, FaSort } from 'react-icons/fa6';


function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [traces] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isBoardFull, setIsBoardFull] = useState(false);
  const [reversed, setReversed] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  let totalMove = currentMove;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    totalMove = currentMove + 1;
    if (totalMove === 9) { setIsBoardFull(true); }
    else { setIsBoardFull(false); }
  }

  function jumpTo(nextMove) {
    if (nextMove < 0 || nextMove >= history.length) return;
    setCurrentMove(nextMove);
    totalMove = nextMove;
    if (totalMove === 9) { setIsBoardFull(true); }
    else { setIsBoardFull(false); }
  }

  function sortMove() {
    setReversed(!reversed);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Move #${move}: ${traces[move-1]}`;
    } else {
      description = 'Game start';
    }
    return (
      <li key={move}>
        {move !== currentMove ?
          <button onClick={() => jumpTo(move)}>{description}</button>
          :
          move > 0 ? <span>You are at move #{move}: {traces[move-1]}</span> : <span>You are at game start</span>

        }
      </li>
    );
  })

  return (
    <div className="game row container">
      <div className="game-board col-md-auto">
        <Board xIsNext={xIsNext}
          squares={currentSquares}
          traces={traces}
          onPlay={handlePlay}          
          isBoardFull={isBoardFull}
          currentMove={currentMove}/>
      </div>
      <div className="game-history col">
        <div className="history-info">
          <div className="d-flex">
            <div>Logs</div>
            <button onClick={() => sortMove()}>
              <FaSort />
            </button>
          </div>
          <ol>{reversed ? moves.reverse() : moves}</ol>
        </div>
        <div className="history-navigate d-flex justify-content-between">
          <button onClick={() => jumpTo(currentMove - 1)}>
            <FaBackward />
          </button>
          <button onClick={() => jumpTo(currentMove + 1)}>
            <FaForward />
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
