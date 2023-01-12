export type Coordinate = `${number}-${number}`;

export type Location = Coordinate[];
export interface IshipsTypeCount {
  [key: number]: number;
}

export interface IShip {
  location: Location;
}

export interface IShipCreator {
  ships: IShip[];
  boardSize: number;
  shipCount: number;
  generateShips: () => void;
  generateShipLocation: (shipLength: number) => Location;
  checkCollision: ({ ships, ship }: { ships: IShip[]; ship: IShip }) => void;
  getForbiddenZone: (value: Coordinate) => Location;
}

export interface IBoard {
  ships: IShip[];
  hitLocation: Location;
  missedLocation: Location;
  addLocation: (value: Coordinate) => void;
}

export interface IView {
  mountNode: HTMLElement;
  size: number;
  board: IBoard;
  render: () => void;
}
