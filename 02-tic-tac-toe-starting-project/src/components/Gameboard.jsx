import { act, useState } from "react"

const initialGB = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function Gameboard({ onSelectSq, turns }) {

  let gb = initialGB
  for (const turn of turns) {
    const { sq, player } = turn
    const { row, col } = sq
    gb[row][col] = player
  }

  // const [gb, setgb] = useState(initialGB)
  // function handleSelect(rowIndex, colindx) {
  //   setgb((prev) => {
  //     const updatedBoard = [...prev.map(innerArry => [...innerArry])]
  //     updatedBoard[rowIndex][colindx] = activePlayerSym
  //     return updatedBoard
  //   })
  //   onSelectSq()
  // }
  return (
    <ol id="game-board">
      {gb.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colindx) => (
              <li key={colindx}>
                <button onClick={() => handleSelectSq(rowIndex, colindx)}>{col}</button>
              </li>
            ))}
          </ol>
        </li >
      ))
      }
    </ol >
  )
}