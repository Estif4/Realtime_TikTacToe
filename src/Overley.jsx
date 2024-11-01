import React from 'react';

export default function Overlay({ gameOver, winner,setPosition, player1Name, player2Name, setBoard, setCurrentPlayer, setGameOver, setWinner }) {
  return (
    <div className={`overlay absolute inset-0 ${gameOver ? '' : 'hidden'} flex flex-col justify-center items-center : bg-slate-900  p-12   z-10 opacity-90 space-y-4`}>
      <div className='text-4xl text-yellow-300 font-serif'>Game Over!</div>
      {winner && winner !== "Draw" ? (
        <div className='text-2xl text-yellow-300'>
          {winner === 'X' ? player1Name : player2Name} Wins!
        </div>
      ) : (
        <div className='text-2xl text-yellow-300'>It's a draw!</div>
      )}
      <button
        className='text-xl text-yellow-300 font-serif border border-yellow-300 hover:bg-yellow-300 shadow-[0_0_5px_5px_rgba(255,165,0,0.5)] hover:text-black'
        onClick={() => {
          setBoard(Array(9).fill(''));
          setCurrentPlayer('X');
          setGameOver(false);
          setWinner(null);
          setPosition([]);
          
        }}
      >
        Rematch!
      </button>
    </div>
  );
}
