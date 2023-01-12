import React, { useState } from "react";
import { Coordinate, Location } from "./interfaces";
import { ShipsCreator } from "./modules/ShipsCreator";

const createShips = new ShipsCreator();

const SeaBattle: React.FC = () => {
  const [hitLocation, setHitLocation] = useState([]);
  const [missedLocation, setMissedLocation] = useState([]);

  function addLocation(coordinate: Coordinate) {
    console.log(coordinate);
    for (let ship of createShips.ships) {
      if (ship.location.includes(coordinate)) {
        setHitLocation([...hitLocation, coordinate]);
        return;
      }
    }
    setMissedLocation([...missedLocation, coordinate]);
  }

  const renderBoard = () => {
    const rows = [];
    for (let y = 0; y < 10; y++) {
      const cells = [];
      for (let x = 0; x < 10; x++) {
        const id: Coordinate = `${x + 1}-${y + 1}`;
        const isHit = hitLocation.includes(id);
        const isMiss = missedLocation.includes(id);
        const className = `cell ${isHit ? "hit" : ""} ${isMiss ? "miss" : ""}`;
        cells.push(
          <td
            id={id}
            key={x}
            onClick={() => addLocation(id)}
            className={className}
          >
            {id}
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
      <div>{renderBoard()}</div>
    </div>
  );
};

export default SeaBattle;
