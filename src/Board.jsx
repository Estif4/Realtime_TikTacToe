export default function Board({ board, clickHandler }) {
  return (
    <div className='bg-black flex justify-center items-center w-full h-96'>
      <div className='grid grid-cols-3 gap-4'>
        {board.map((value, index) => (
          <button
            key={index}
            className='w-24 h-24 cursor-pointer bg-slate-600 text-white text-5xl flex justify-center items-center'
            onClick={() => clickHandler(index)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
