import React, { useState, useEffect } from "react";
import "./ColorGame.css";

const allColors = [
  "#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A8", "#FFC300",
  "#8D33FF", "#33FFF5", "#FF3380", "#33A1FF", "#FF9A33", "#A833FF",
  "#33FF99", "#FF3333", "#3366FF", "#FF66B2", "#66FF33", "#FFD700"
];

const getRandomColors = () => {
  const shuffled = allColors.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
};

const ColorGame = () => {
  const [colors, setColors] = useState(getRandomColors());
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("Guess the correct color!");
  const [isGameActive, setIsGameActive] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setGameStatus("Guess the correct color!");
    setIsGameActive(true);
    setSelectedColor("");
    setShowLoader(true);
    
    setTimeout(() => {
      setShowLoader(false);
      const newColors = getRandomColors();
      setColors(newColors);
      setTargetColor(newColors[Math.floor(Math.random() * newColors.length)]);
    }, 500);
  };

  const handleGuess = (color) => {
    if (!isGameActive) return;

    setSelectedColor(color);

    if (color === targetColor) {
      setGameStatus("🎉 Correct! Click 'New Game' to play again.");
      setScore(score + 1);
    } else {
      setGameStatus("❌ Wrong! Try Again.");
    }

    setIsGameActive(false);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
      resetGame();
    }, 1000);
  };

  const handleNewGame = () => {
    setScore(0);
    resetGame();
  };

  const handleHelpClick = () => {
    setShowHelpModal(true);
  };

  const handleCloseModal = () => {
    setShowHelpModal(false);
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <h2 className="game-title">Color Guessing Game</h2>
        <p data-testid="gameStatus">{gameStatus}</p>

        {showLoader ? (
          <div className="loader"></div>
        ) : (
          <div data-testid="colorBox" className="color-box" style={{ backgroundColor: targetColor }}></div>
        )}

        <div data-testid="colorOption" className="color-options">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`color-button ${color === selectedColor ? (color === targetColor ? 'correct' : 'wrong') : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              disabled={!isGameActive}
            >
              {color === selectedColor && color === targetColor ? "✅" : ""}
              {color === selectedColor && color !== targetColor ? "❌" : ""}
            </button>
          ))}
        </div>

        <p data-testid="score" className="score-text">Score: {score}</p>

        <button data-testid="newGameButton" className="new-game-btn" onClick={handleNewGame}>New Game</button>
        <button data-testid="help" className="help-btn" onClick={handleHelpClick}>Help</button>
      </div>

      {showHelpModal && (
        <div data-testid="gameInstructions" className="modal">
          <div className="modal-content">
            <h3>How to Play</h3>
            <p>Guess the color of the square by selecting one of the buttons below.</p>
            <p>If you guess correctly, your score increases by 1!</p>
            <button className="close-btn" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
