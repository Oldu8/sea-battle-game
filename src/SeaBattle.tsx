import React, { useState } from "react";
import "./SeaBattle.css";

interface Ship {
  x: number;
  y: number;
  size: number;
  horizontal: boolean;
}

interface BoardState {
  ships: Ship[];
  hits: { x: number; y: number }[];
  misses: { x: number; y: number }[];
}

const SeaBattle: React.FC = () => {
  const [board, setBoard] = useState<BoardState>({
    ships: [],
    hits: [],
    misses: [],
  });

  function myHandleClick(board: BoardState, x: number, y: number) {
    console.log("click" + x + y);
    const id = x.toString() + y.toString();
    console.log(id);
    const tag = document.getElementById(id)?.classList.add("hit");
  }

  const renderBoard = (board: BoardState) => {
    const { ships, hits, misses } = board;

    const rows = [];
    for (let y = 0; y < 10; y++) {
      const cells = [];
      for (let x = 0; x < 10; x++) {
        let cell = <div className="cell"></div>;
        cells.push(
          <td
            id={`${x}${y}`}
            key={x}
            onClick={() => myHandleClick(board, x, y)}
          >
            {cell}
          </td>
        );
      }
      rows.push(<tr key={y}>{cells}</tr>);
    }

    return (
      <table className="board">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  return (
    <div className="SeaBattle">
      <button onClick={() => console.log("Create ships")}>Place Ships</button>
      <div>{renderBoard(board)}</div>
    </div>
  );
};

export default SeaBattle;
