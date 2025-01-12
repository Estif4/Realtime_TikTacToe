import React, { useState, useEffect } from "react";
import tikTacToe from "./assets/tik-tac-toe.jpeg";
import Overlay from "./Overley.jsx";
import Player from "./Player.jsx";
import Board from "./Board.jsx";
import { io } from "socket.io-client";

function Interface() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [Xturn, setXturn] = useState(true);
  const [Oturn, setOturn] = useState(false);
  const [position, setPosition] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const socket = io("https://realtime-tiktactoe.onrender.com");

  useEffect(() => {
    socket.emit("playerConnected");
    socket.emit("newPlayerJoined");
    socket.on("playerConnected", (data) => {
      setMessage(data.message);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    });

    socket.on("newPlayerJoined", (data) => {
      setMessage(data.message); // Set the new player message
      setShowMessage(true); // Show the message
      setTimeout(() => {
        setShowMessage(false); // Hide the message after 3 seconds
      }, 3000);
    });

    socket.on("moveMade", (data) => {
      setBoard(data.newBoard);
      setCurrentPlayer(data.current);
      setXturn(data.Xbackturn);
      setOturn(data.Obackturn);
    });

    socket.on("madegamefinaldisplay", (data) => {
      if (data.draw) {
        setWinner(data.draw);
      } else {
        setWinner(data.winner);
      }
      setGameOver(true);
    });

    socket.on("madeposition", (data) => {
      setPosition((prev) => [...prev, data]);
    });

    return () => {
      socket.off("moveMade");
      socket.off("madegamefinaldisplay");
      socket.off("madeposition");
      socket.off("playerConnected");
      socket.off("playerConnected");
      socket.off("newPlayerJoined");
    };
  }, []);

  const clickHandler = (index) => {
    if (board[index] === "" && !gameOver) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      getPosition(currentPlayer, index);

      if (checkWinner(newBoard)) {
        socket.emit("makegamefinaldisplay", { draw: currentPlayer });
        return;
      }

        let current = "";
        let turnx;
        let turno
      if (currentPlayer === "X") {
        current = "O";
        turnx = false;
        turno = true;
      } else {
        current = "X";
        turnx = true;
        turno = false;
      }

      socket.emit("makeMove", { index, newBoard, current, turnx, turno });
    }
  };

  const getPosition = (currentPlayer, index) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    socket.emit("makeposition", `${currentPlayer} Selected ${row},${col}`);
  };

  const checkWinner = (board) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        socket.emit("makegamefinaldisplay", { winner: board[a] });
        return true;
      }
    }

    if (board.every((cell) => cell !== "")) {
      socket.emit("makegamefinaldisplay", { draw: "draw" });
      return true;
    }

    return false;
  };

  return (
    <div className="relative h-screen w-full flex justify-center">
      <div className="absolute h-[1000px] inset-0 bg-[url('./assets/tik-background.jpeg')] blur-sm bg-cover bg-center"></div>
      <div className="flex flex-col items-center relative">
        {showMessage && (
          <div className="absolute top-0 sm:top-5  left-32 sm:left-10 transform -translate-x-1/2 bg-black text-white sm:py-2 px-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center space-x-2">
              <span>{message}</span>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center mt-4 gap-4 w-full">
          <div className="flex flex-col justify-center items-center">
            <header>
              <img
                src={tikTacToe}
                alt="Tik Tac Toe"
                className="w-28 h-28 p-4"
              />
              <div className="font-serif text-2xl  font-bold">
                Tik-Tac-Toe
              </div>
            </header>
            <div className="bg-black w-screen sm:w-full p-4 rounded-md relative">
              <div className="flex flex-row justify-around gap-4">
                <Player
                  isEditing={false}
                  playerName={player1Name}
                  isturn={Xturn}
                  setPlayerName={setPlayer1Name}
                  symbol="X"
                  socket={socket}
                />
                <Player
                  isEditing={false}
                  playerName={player2Name}
                  isturn={Oturn}
                  setPlayerName={setPlayer2Name}
                  symbol="O"
                  socket={socket}
                />
              </div>

              <Board board={board} clickHandler={clickHandler} currentplayer={currentPlayer} Oturn={Oturn} Xturn={Xturn} />
              <Overlay
                gameOver={gameOver}
                winner={winner}
                player1Name={player1Name}
                player2Name={player2Name}
                setBoard={setBoard}
                setCurrentPlayer={setCurrentPlayer}
                setGameOver={setGameOver}
                setWinner={setWinner}
                socket={socket}
                setPosition={setPosition}
              />
            </div>
          </div>

          <div className="text-black w-64 h-64 p-4 overflow-y-auto">
            {position.map((pos, i) => (
              <div key={i} className="font-bold text-blue-600">
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
