import {
  IShip,
  IShipCreator,
  Location,
  Coordinate,
  IshipsTypeCount,
} from "../interfaces";
import { BOARD_SIZE, range } from "../utils";

class Ship implements IShip {
  location: Location;
  constructor(location: Location) {
    this.location = location;
  }
}

export class ShipsCreator implements IShipCreator {
  ships: IShip[];
  boardSize: number;
  shipCount: number;
  constructor(boardSize = BOARD_SIZE) {
    this.ships = [];
    this.boardSize = boardSize;
    this.shipCount = 10;

    this.generateShips();
  }

  generateShips() {
    const shipsTypeCount: IshipsTypeCount = {
      1: 4, // single ship
      2: 3, // double ship
      3: 2, // triple ship
      4: 1, // ship for 4 places
    };

    const pushShips = (shipSize: number) => {
      if (shipsTypeCount[shipSize] > 0) {
        const ship = new Ship(this.generateShipLocation(shipSize));
        if (!this.checkCollision({ ships: this.ships, ship })) {
          this.ships.push(ship);
          shipsTypeCount[shipSize] = shipsTypeCount[shipSize] - 1;
        }
      }
    };

    while (this.ships.length < this.shipCount) {
      pushShips(1);
      pushShips(2);
      pushShips(3);
      pushShips(4);
    }
  }

  generateShipLocation(shipLength: number): Location {
    const { random, round, floor } = Math;
    const direction = round(random());
    const xCoordinate = floor(random() * this.boardSize);
    const yCoordinate = floor(random() * (this.boardSize - shipLength));
    const row = (!!direction ? xCoordinate : yCoordinate) + 1;
    const column = (!!direction ? yCoordinate : xCoordinate) + 1;

    return range(shipLength).map((_, i): Coordinate => {
      return !!direction ? `${row}-${column + i}` : `${row + i}-${column}`;
    });
  }
  //@ts-ignore
  checkCollision({ ships, ship }) {
    if (!ships.length) return false;
    const shipsPlaces: Location = ships.reduce((acc: Location, item: IShip) => {
      return [...acc, ...item.location];
    }, []);

    const forbiddenZone = shipsPlaces.reduce(
      (acc: string[], item: Coordinate) => {
        return [...acc, ...this.getForbiddenZone(item)];
      },
      []
    );

    const forbiddenZoneSet = new Set(forbiddenZone);

    for (let i = 0; i < ship.location.length; i++) {
      if (forbiddenZoneSet.has(ship.location[i])) return true;
    }
    return false;
  }

  getForbiddenZone(value: Coordinate) {
    if (!value) return [];
    let [row, column] = value.split("-");
    const forbiddenZone: Location = [value];

    let rowN = Number(row);
    let columnN = Number(column);

    forbiddenZone.push(`${rowN - 1}-${columnN}`); // top cell
    forbiddenZone.push(`${rowN + 1}-${columnN}`); // bottom cell
    forbiddenZone.push(`${rowN}-${columnN - 1}`); // left cell
    forbiddenZone.push(`${rowN}-${columnN + 1}`); // right cell
    forbiddenZone.push(`${rowN - 1}-${columnN - 1}`); // top left cell
    forbiddenZone.push(`${rowN + 1}-${columnN + 1}`); // bottom  right cell
    forbiddenZone.push(`${rowN - 1}-${columnN + 1}`); // top right cell
    forbiddenZone.push(`${rowN + 1}-${columnN - 1}`); // bottom left cell

    return forbiddenZone;
  }
}
