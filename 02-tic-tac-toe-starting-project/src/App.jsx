import { useState } from "react";
import Gameboard from "./components/Gameboard";
import Playerr from "./components/Playerr";
import Log from "./components/Log";

function App() {
  const [gameTurns, setgameturns] = useState([])

  const [activePlayer, setActive] = useState("X")
  function handleSelectSq(rowIndex, colIndex) {
    setActive((currAct) =>
      currAct === 'X' ? 'O' : 'X'
    )
    setgameturns(preturns => {
      let currPlayer = 'X'
      if (preturns.length > 0 && preturns[0].player === 'X') {
        currPlayer = 'O'
      }
      const updatedturns = [{ sq: { row: rowIndex, col: colIndex }, player: currPlayer }, ...preturns]
      return updatedturns
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Playerr name="Player 1" symbol="X" isActive={activePlayer === 'X'} />;
          <Playerr name="Player 2" symbol="O" isActive={activePlayer === 'O'} />;
        </ol>
        <Gameboard onSelectSq={handleSelectSq} turns={gameTurns} />
      </div>
      <Log />
    </main>
  );
}

export default App;
