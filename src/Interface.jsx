import React, { useState } from 'react';
import tikTacToe from './assets/tik-tac-toe.jpeg';
import Overlay from './Overley.jsx';
import Player from './Player.jsx';
import Board from './Board.jsx';

function Interface() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [isEditingPlayer1, setIsEditingPlayer1] = useState(false);
  const [isEditingPlayer2, setIsEditingPlayer2] = useState(false);
  const [Xturn, setXturn] = useState(true);
  const [Oturn, setOturn] = useState(false);
  const [position, setPosition] = useState([]);

  function clickHandler(index) {
    if (board[index] === '' && !gameOver) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      getPosition(currentPlayer, index);

      if (checkWinner(newBoard)) {
        setGameOver(true);
        return;
      }

      // Update turns and current player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setXturn(currentPlayer === 'X'); 
      setOturn(currentPlayer === 'O'); 
    }
  }

  function getPosition(currentPlayer, index) {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    setPosition(prev => [...prev,`${currentPlayer} Selected ${row},${col}`]);
  }

  function checkWinner(board) {
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return true;
      }
    }

    if (board.every(cell => cell !== '')) {
      setWinner("Draw");
      setGameOver(true);
    }

    return false;
  }

  return (
    <div className="relative h-screen w-full flex justify-center">
      
      <div className="absolute inset-0 bg-[url('./assets/tik-background.jpeg')] blur-sm bg-cover bg-center"></div>
      
      <div className="flex flex-col items-center relative">
        
        
        <div className="  flex  flex-col md:flex-row items-center mt-4 gap-4 w-full">
          
        <div className='flex  flex-col justify-center items-center'>
        <header className="">
          <img src={tikTacToe} alt="Tik Tac Toe" className="w-28 h-28 p-4" />
          <div className="font-serif text-2xl font-bold">Tik-Tac-Toe</div>
        </header>
          <div className="bg-black w-screen sm:w-full    p-4 rounded-md  relative">
            <div className="flex flex-row justify-around gap-4">
              <Player
                isEditing={isEditingPlayer1}
                playerName={player1Name}
                isturn={Xturn}
                setPlayerName={setPlayer1Name}
                toggleEdit={setIsEditingPlayer1}
                symbol="X"
              />
              <Player
                isEditing={isEditingPlayer2}
                playerName={player2Name}
                isturn={Oturn}
                setPlayerName={setPlayer2Name}
                toggleEdit={setIsEditingPlayer2}
                symbol="O"
              />
            </div>
            
            <Board board={board} clickHandler={clickHandler} />
            <Overlay
        gameOver={gameOver}
        winner={winner}
        player1Name={player1Name}
        player2Name={player2Name}
        setBoard={setBoard}
        setCurrentPlayer={setCurrentPlayer}
        setGameOver={setGameOver}
        setWinner={setWinner}
        setPosition={setPosition}
      />
          </div></div>

          <div className="text-black w-64 h-64 p-4 overflow-y-auto">
  {position.map((pos, i) => (
    <div
      key={i}
      className={`${
        i===0||1 ? ' left-to-right' : ''
      } font-bold text-blue-600`}
    >
      {pos}
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
}

export default Interface;
