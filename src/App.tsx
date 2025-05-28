import { useState } from 'react';
import './App.css';
import Board, { type Marks } from './Board';

export default function App() {
  //
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);

  const marks: Marks = history[step];
  const isNextX: boolean = step % 2 === 0;
  const winner: string | null = whoWinner(marks);

  function handlePlay(m: Marks): void {
    //
    const nextHistory = history.slice(0, step + 1);
    nextHistory.push(m);
    setHistory(nextHistory);
    setStep(step + 1);
  }

  function whoWinner(m: Marks) : string | null {
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

    for(const [a, b, c] of lines) {
      if(m[a] === m[b] && m[b] === m[c]) {
        return m[a];
      }
    }
    return null;
  }

  function jumpTo(step: number) : void{
    setStep(step);
  } 

  const historyView = history.map((marks: Marks, idx) => {
    let className = 'jump-btn';
    if(idx === step) className += ' current';
    let label = (idx === 0 ? 'Go to start' : `Go to #${idx}`);
    return (
      <li>
        <button className={className} onClick={() => jumpTo(idx)}>{label}</button>
      </li>
    );
  });

  return (
    <div className='game-app'>
      <div className="board">
        <Board marks={marks} isNextX={isNextX} winner={winner} onPlay={handlePlay} />
      </div>
      <div className="history">
        <ol>{historyView}</ol>
      </div>
    </div>
    );
}