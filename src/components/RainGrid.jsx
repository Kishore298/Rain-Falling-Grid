import React, { useEffect, useState } from 'react';

const colorSequence = [
  'rgb(32, 20, 160)',
  'rgb(75, 5, 102)',
  'rgb(164, 11, 83)',
  'rgb(216, 20, 20)',
  'rgb(235, 59, 5)',
  'rgb(208, 122, 10)',
  'rgb(244, 188, 4)',
  'rgb(86, 208, 10)',
  'rgb(10, 208, 116)',
  'rgb(10, 208, 201)',
  'rgb(10, 108, 173)',  
];

const RainGrid = ({ rows = 15, columns = 20 }) => {
  const [grid, setGrid] = useState([]);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [fallCount, setFallCount] = useState(0);

  // Initialize empty grid
  useEffect(() => {
    const initialGrid = Array.from({ length: rows }, () => Array(columns).fill(null));
    setGrid(initialGrid);
  }, [rows, columns]);

  // Raindrop effect
  useEffect(() => {
    if (fallCount >= 20) { 
      setFallCount(0);
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colorSequence.length);
      return;
    }

    const intervalId = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.slice()); // Create a copy of the grid

        // Shift down previous raindrop positions
        for (let row = rows - 1; row > 0; row--) {
          for (let col = 0; col < columns; col++) {
            newGrid[row][col] = newGrid[row - 1][col];
          }
        }

        // Clear the top row
        for (let col = 0; col < columns; col++) {
          newGrid[0][col] = null;
        }

        // Determine which columns to drop blocks in
        const color = colorSequence[currentColorIndex];
        const selectedColumns = [];

        // alternate columns based on currentColorIndex
        const startColumn = currentColorIndex % 2 === 0 ? 0 : 1;
        for (let i = startColumn; i < columns; i += 4) { // Increased gap between selected columns
          selectedColumns.push(i);
        }

        // Randomly select fewer columns to drop grids
        const selectedFallColumns = [];
        while (selectedFallColumns.length < 2) {  // Reduced the number of falling columns
          const col = selectedColumns[Math.floor(Math.random() * selectedColumns.length)];
          if (!selectedFallColumns.includes(col)) {
            selectedFallColumns.push(col);
          }
        }

        // Add the new color blocks at the top row in the selected columns
        selectedFallColumns.forEach((col) => {
          newGrid[0][col] = color;
        });

        return newGrid;
      });

      // Update the fall count
      setFallCount((prevCount) => prevCount + 1);
    }, 200); 

    return () => clearInterval(intervalId);
  }, [currentColorIndex, fallCount, rows, columns]);

  // Animation for the falling letters
  const text = "Falling Rain Grids"; // Text to animate
  return (
    <div className="flex flex-col items-center justify-center min-h-screen z-10 space-y-5">
      <h1
        className="text-5xl sm:text-6xl font-extrabold text-white text-shadow-md mb-8"
        style={{ color: colorSequence[currentColorIndex], textShadow: '0 0 15px rgba(255, 255, 255, 0.8)' }}
      >
        {text.split("").map((char, index) => (
          <span
            key={`${index}-${currentColorIndex}`}
            className="falling-letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
      <div
        className="grid gap-1 sm:gap-2"
        style={{
          gridTemplateColumns: `repeat(${columns}, 16px)`,
          gridTemplateRows: `repeat(${rows}, 16px)`,
          backgroundColor: 'black',
          border: '1px solid gray',
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 transform hover:scale-110"
              style={{
                backgroundColor: color || 'black',
                border: '0.5px solid #444',
                transition: 'background-color 0.3s',
                boxShadow: `0 0 5px ${color || 'black'}`,
              }}
            ></div>
          ))
        )}
      </div>
      <div className="absolute bottom-10 text-white text-center text-xl sm:text-2xl">
        <p>Enjoy the vibrant, falling rain animation!</p>
      </div>
    </div>
  );
};
export default RainGrid;

