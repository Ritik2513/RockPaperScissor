import React, { useState, useEffect } from "react";

const App = () => {
  const [userPoints, setUserPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [userChoice, setUserChoice] = useState("rock");
  const [computerChoice, setComputerChoice] = useState("rock");
  const [turnResult, setTurnResult] = useState(null);
  const [result, setResult] = useState("Let's see who wins");
  const [gameOver, setGameOver] = useState(false);

  const choices = ["rock", "paper", "scissors"];

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    const comboMoves = userChoice + computerChoice;
    if (userPoints <= 4 && computerPoints <= 4) {
      // user wins
      if (
        comboMoves === "rockscissors" ||
        comboMoves === "paperrock" ||
        comboMoves === "scissorspaper"
      ) {
        const updateUserPoints = userPoints + 1;
        setUserPoints(updateUserPoints);
        setTurnResult("User got the Point");
        if (updateUserPoints === 5) {
          setGameOver(true);
          setResult("User Wins");
        }
      }

      // computer wins
      if (
        comboMoves === "rockpaper" ||
        comboMoves === "paperscissors" ||
        comboMoves === "scissorsrock"
      ) {
        const updateComputerPoints = computerPoints + 1;
        setComputerPoints(updateComputerPoints);
        setTurnResult("Computer got the Point");
        if (updateComputerPoints === 5) {
          setGameOver(true);
          setResult("Computer Wins");
        }
      }

      if (
        comboMoves === "rockrock" ||
        comboMoves === "paperpaper" ||
        comboMoves === "scissorsscissors"
      ) {
        setTurnResult("No One got a Point");
      }
    }
  }, [userChoice, computerChoice]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-extrabold mb-8 tracking-wider">Rock Paper Scissors</h1>

      {/* Points */}
      <div className="flex justify-around w-full mb-8">
        <h1 className="text-3xl font-semibold">User Points: {userPoints}</h1>
        <h1 className="text-3xl font-semibold">
          Computer Points: {computerPoints}
        </h1>
      </div>

      {/* Images */}
      <div className="flex justify-center items-center mb-6 space-x-8">
        <div className="flex flex-col items-center">
          <h2 className="text-lg mb-2">User Choice</h2>
          <img
            src={`../images/${userChoice}.png`}
            alt={userChoice}
            className="w-36 h-36 transform rotate-180 border-2 border-white rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg mb-2">Computer Choice</h2>
          <img
            src={`../images/${computerChoice}.png`}
            alt={computerChoice}
            className="w-36 h-36 border-2 border-white rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Buttons for userChoice */}
      <div className="flex space-x-4 mb-6">
        {choices.map((choice, index) => {
          return (
            <button
              key={index}
              onClick={() => handleUserChoice(choice)}
              className="bg-blue-500 hover:bg-blue-700 active:scale-95 text-white font-bold py-2 px-6 rounded-lg shadow-md transform transition-all duration-200 ease-in-out hover:shadow-lg"
            >
              {choice.charAt(0).toUpperCase() + choice.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="text-center mb-8">
        <h1 className="text-xl mb-2">Turn Result: <span className="font-semibold">{turnResult}</span></h1>
        <h1 className="text-3xl font-bold tracking-wide">{result}</h1>
      </div>

      {/* Restart button */}
      {gameOver && (
        <button
          onClick={() => reset()}
          className="bg-red-500 hover:bg-red-700 active:scale-95 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all transform duration-200 ease-in-out hover:shadow-lg"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;
