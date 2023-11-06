import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.jsx";
import './index.css';
import { useState } from "react";
import { WINNING_COMBINATIONS } from './winning-combinantions.js';

const PLAYERS = {
  X: 'PLayer 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() { 

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
        const currentPlayer = deriveActivePlayer(prevTurns);

        const updatedTurns = [
          {square: { row: rowIndex, col: colIndex}, player: currentPlayer },
          ...prevTurns,
        ];

        return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
          initialName={PLAYERS.X} 
          symbol="X" 
          isActive={activePlayer === 'X'} 
          onChangeName={handlePlayerNameChange} 
          />
          <Player 
          initialName={PLAYERS.O} 
          symbol="O" 
          isActive={activePlayer === 'O'} 
          onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare}
         board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
