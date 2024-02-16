export type ObjectTypes = "dot" | "line";

export type Position = {
  x: number;
  y: number;
};

export type PlaceableObject = {
  type: ObjectTypes;
  position: Position;
};
