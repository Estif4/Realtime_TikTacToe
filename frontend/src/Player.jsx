import { useEffect } from "react";

export default function Player({
  isEditing,
  playerName,
  isturn,
  setPlayerName,
  toggleEdit,
  symbol,
  socket,
}) {
  useEffect(() => {
    // Listen for playerNameUpdated event
    const handlePlayerNameUpdated = ({
      symbol: updatedSymbol,
      playerName: updatedName,
    }) => {
      if (updatedSymbol === symbol) {
        setPlayerName(updatedName);
      }
    };

    socket.on("playerNameUpdated", handlePlayerNameUpdated);

    // Clean up to avoid duplicate listeners
    return () => {
      socket.off("playerNameUpdated", handlePlayerNameUpdated);
    };
  }, [socket, symbol, setPlayerName]);

  function handleToggle() {
    if (isEditing) {
      socket.emit("updatePlayerName", { symbol, playerName });
    }
    toggleEdit((prev) => !prev);
  }

  return (
    <div
      className={`w-52 h-12 m-4 ${
        isturn ? "border-pulse border-2 border-yellow-300" : ""
      } rounded`}>
      <div className="w-full h-full flex items-center">
        {/* Input field for player name */}
        <input
          type="text"
          className={`w-24 h-full outline-none text-yellow-300 p-4 ${
            isEditing
              ? "bg-slate-800 border-blue-300 focus:outline-blue-400"
              : "bg-transparent"
          }`}
          placeholder={`Player ${symbol || "?"}`}
          value={playerName || ""}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={!isEditing}
        />
        {/* Symbol display */}
        <p className="text-yellow-300 mr-2 text-2xl">{symbol}</p>
        {/* Edit/Save button */}
        <button className="text-yellow-300" onClick={handleToggle}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
