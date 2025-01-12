import { useEffect } from "react";

export default function Player({
  isEditing,
  playerName,
  isturn,
  setPlayerName,
  setIsEditing,
  symbol,
  socket,
}) {
  // Listen for playerNameUpdated event from the server
  useEffect(() => {
    const handlePlayerNameUpdated = ({
      symbol: updatedSymbol,
      playerName: updatedName,
    }) => {
      if (updatedSymbol === symbol) {
        setPlayerName(updatedName); // Update player name if symbol matches
      }
    };

    socket.on("playerNameUpdated", handlePlayerNameUpdated);

    // Clean up the event listener to avoid memory leaks and duplicate listeners
    return () => {
      socket.off("playerNameUpdated", handlePlayerNameUpdated);
    };
  }, [socket, symbol, setPlayerName]);

  // Toggle editing mode and emit player name update to the server
  function handleToggle() {
    if (isEditing) {
      socket.emit("updatePlayerName", { symbol, playerName }); // Emit updated player name
    }
    setIsEditing((prev) => !prev); // Toggle edit mode
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
          value={playerName || ""} // Bind player name to input value
          onChange={(e) => setPlayerName(e.target.value)} // Update player name in state
          disabled={!isEditing} // Disable input if not in editing mode
        />
        {/* Symbol display */}
        <p className="text-yellow-300 mr-2 text-2xl">{symbol}</p>
        {/* Edit/Save button */}
        <button className="text-yellow-300" onClick={handleToggle}>
          {isEditing ? "Save" : "Edit"} {/* Toggle between Edit and Save */}
        </button>
      </div>
    </div>
  );
}
