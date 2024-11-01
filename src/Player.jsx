import React from 'react';

export default function Player({ isEditing, playerName, isturn, setPlayerName, toggleEdit, symbol }) {
  return (
    <div className={`w-52 h-12 m-4 ${isturn ? 'border-pulse ' : ''} rounded`}>
      <div className="w-full h-full flex items-center">
        <input 
          type='text' 
          className={`w-24 h-full outline-none text-yellow-300 p-4 ${isEditing ? 'bg-slate-800  h-4 m-4 border-blue-300 focus:outline-blue-400' : 'bg-transparent'}`}
          placeholder={`Player ${symbol}`} 
          value={playerName} 
          onChange={(e) => setPlayerName(e.target.value)} 
          disabled={!isEditing}
        />
        <p className='text-yellow-300 mr-2 text-2xl'>{symbol}</p>
        <button className='text-yellow-300' onClick={() => toggleEdit(prev => !prev)}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}
