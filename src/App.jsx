import React, { useState, useEffect } from "react";
import "./ColorGame.css"; 

const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A8", "#FFC300"];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("Guess the correct color!");
  const [isGameActive, setIsGameActive] = useState(true);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setGameStatus("Guess the correct color!");
    setIsGameActive(true);
  };

  const handleGuess = (color) => {
    if (!isGameActive) return;

    if (color === targetColor) {
      setGameStatus("🎉🎉🎉 Correct! Click 'New Game' to play again.");
      setScore(score + 1);
      setIsGameActive(false);
    } else {
      setGameStatus("❌❌❌ Wrong! Try Again.");
    }
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h2 className="game-title">Color Guessing Game</h2>
        <p data-testid="gameInstructions">{gameStatus}</p>
        
        <div 
          className="color-box"
          style={{ backgroundColor: targetColor }} 
          data-testid="colorBox"
        ></div>

        <div className="color-options">
          {colors.map((color, index) => (
            <button
              key={index}
              className="color-button"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              data-testid="colorOption"
              disabled={!isGameActive}
            ></button>
          ))}
        </div>

        <p data-testid="score" className="score-text">Score: {score}</p>

        <button 
          className="new-game-btn"
          onClick={resetGame} 
          data-testid="newGameButton"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default ColorGame;
