import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [disableChoices, setDisableChoices] = useState(false);

  const choices = [
    { id: 'rock', label: 'Piedra', icon: 'fas fa-hand-rock' },
    { id: 'paper', label: 'Papel', icon: 'fas fa-hand-paper' },
    { id: 'scissors', label: 'Tijeras', icon: 'fas fa-hand-scissors' }
  ];

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const computer = generateComputerChoice()    
    determineWinner(choice, computer);
    setDisableChoices(true);
  };

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computer = choices[randomIndex];
    setComputerChoice(computer)
    return computer
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice.id) {
      setResult('¡Es un empate!');
    } else if (
      (playerChoice === 'rock' && computerChoice.id === 'scissors') ||
      (playerChoice === 'paper' && computerChoice.id === 'rock') ||
      (playerChoice === 'scissors' && computerChoice.id === 'paper')
    ) {
      setResult('¡Ganaste!');
    } else {
      setResult('¡La computadora gana!');
    }
  };

  const playAgain = () => {
    setPlayerChoice('');
    setResult('');
    setDisableChoices(false);
  };

  return (
    <div className="container">
      <h1>Piedra, Papel, Tijeras</h1>
      <p>Selecciona tu opción:</p>
      <div className="choices">
        {choices.map(choice => (
          playerChoice === '' || playerChoice === choice.id ? (
            <button
              key={choice.id}
              className={`choice ${playerChoice === choice.id ? 'selected' : ''}`}
              onClick={() => handlePlayerChoice(choice.id)}
              disabled={disableChoices}
            >
              <i className={choice.icon}></i>
              <span>{choice.label}</span>
            </button>
          ) : null
        ))}
      </div>
      {playerChoice && (
        <div className="result">
          <h2>Tu elección: <i className={choices.find(choice => choice.id === playerChoice).icon}></i></h2>
          <h2>Elección de la computadora: <i className={computerChoice.icon}></i></h2>
          <h2 className={`game-result ${result === '¡Ganaste!' ? 'win' : result === '¡La computadora gana!' ? 'lose' : ''}`}>{result}</h2>
          <button className="play-again" onClick={playAgain}>
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
