'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const initialBoard = Array(9).fill(null);

export default function TicTacToe() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ x: 0, o: 0, draw: 0 });
  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleNewGame = () => {
    if (!winner && board.every(Boolean)) {
      setScore(prev => ({ ...prev, draw: prev.draw + 1 }));
    } else if (winner) {
      setScore(prev => ({
        ...prev,
        [winner.toLowerCase()]: prev[winner.toLowerCase() as 'x' | 'o'] + 1,
      }));
    }
    setBoard(initialBoard);
    setXIsNext(true);
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setScore({ x: 0, o: 0, draw: 0 });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-1">Tic-Tac-Toe</h1>
          <p className="text-base text-gray-500">Challenge your friend in classic game!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 lg:col-span-2 p-6 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700 text-center mb-4">
                {winner ? `🏆 Player ${winner} wins!` : board.every(Boolean) ? 'Draw! 🤝' : `🎮 Player ${xIsNext ? 'X' : 'O'}'s Turn`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {board.map((cell, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleClick(idx)}
                    className="aspect-square w-full flex items-center justify-center rounded-xl border border-gray-300 bg-slate-50 hover:bg-slate-100 transition text-5xl font-bold cursor-pointer select-none"
                  >
                    <span className={cn(cell === 'X' && 'text-blue-600', cell === 'O' && 'text-red-500')}>{cell}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700 text-center">Score Board</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-blue-600">Player X</span>
                <span className="text-blue-600 font-bold text-lg">{score.x}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-yellow-500">Draws</span>
                <span className="text-yellow-500 font-bold text-lg">{score.draw}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-red-500">Player O</span>
                <span className="text-red-500 font-bold text-lg">{score.o}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={handleNewGame} className="w-full">New Game</Button>
                <Button variant="outline" onClick={handleReset} className="w-full">Reset All</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Built with React 19, Next.js 15, Tailwind CSS, and shadcn/ui
        </p>
      </div>
    </main>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
