export const BOARD_SIZE = 10;
export const range = (length = BOARD_SIZE) =>
  Array.from({ length }, (_, i) => i); // arr from 1-10 as default
