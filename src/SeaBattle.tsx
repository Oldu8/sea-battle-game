import React, { useState } from "react";
import { Coordinate } from "./interfaces";
import { ShipsCreator } from "./modules/ShipsCreator";

const createShips = new ShipsCreator();

const SeaBattle: React.FC = () => {
  const [hitLocation, setHitLocation] = useState<Coordinate[] | []>([]);
  const [missedLocation, setMissedLocation] = useState<Coordinate[] | []>([]);

  function addLocation(coordinate: Coordinate) {
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
        //Sorry, guys, I don't get why there is a problem there.
        //id is Coordinate and hitLocation is array of Coordinates, so it shoud be good.
        //@ts-ignore
        const isHit: boolean = hitLocation.includes(id);
        //@ts-ignore
        const isMiss: boolean = missedLocation.includes(id);
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
