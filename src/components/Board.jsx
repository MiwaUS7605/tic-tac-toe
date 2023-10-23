import React from 'react';
import Square from './Square';

const Board = ({ xIsNext, squares, onPlay, isBoardFull, trace }) => {

    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) { return; }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }
        trace.push(`${nextSquares[index]} at (${Math.floor(index/3)},${index%3})`)
        onPlay(nextSquares);
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return [squares[a], [a,b,c]];
            }
        }
        return null;

    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner[0];

    } else if (!isBoardFull) {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    else {
        status = "Draw! Nice play!";
    }


    return (
        <>
            <div className="status">{status}</div>
            {
                [0, 1, 2].map((row) => {
                    return (
                        <div className="board-row" key={row}>
                            {[0, 1, 2].map(col => (
                                <Square
                                    key={col}
                                    position={row*3+col}
                                    value={squares[row * 3 + col]}
                                    onSquareClick={() => handleClick(row * 3 + col)}
                                    highlight={winner}
                                />
                            ))}
                        </div>);
                })
            }
        </>
    )
}
export default Board;