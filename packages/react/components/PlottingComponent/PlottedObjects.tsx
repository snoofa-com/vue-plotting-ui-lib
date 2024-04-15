import React from "react";
import { KeepScale } from "react-zoom-pan-pinch";

import { type Position, type PlaceableObject } from "./types";

type Props = {
  objects: PlaceableObject[];
  updateObjects: (updatedObjects: PlaceableObject[]) => void;
  imageWidth: number;
};

export default function PlottedObjects({
  objects,
  updateObjects,
  imageWidth,
}: Props) {
  const handleObjectMove = (index: number, newPosition: Position) => {
    if (objects?.[index] === undefined) return;

    const updatedObjects = [...objects];
    updatedObjects[index]!.position = newPosition;
    updateObjects(updatedObjects);
  };

  return objects.map((obj, index) => (
    <div
      key={index}
      className="absolute z-10 cursor-move"
      style={{
        left: obj.type === "line" ? undefined : obj.position.x,
        top: obj.position.y,
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        const initialPosition = { x: e.clientX, y: e.clientY };

        const handleMouseMove = (e: MouseEvent) => {
          const deltaX = e.clientX - initialPosition.x;
          const deltaY = e.clientY - initialPosition.y;

          const newPosition = {
            x: obj.position.x + deltaX,
            y: obj.position.y + deltaY,
          };

          handleObjectMove(index, newPosition);

          initialPosition.x = e.clientX;
          initialPosition.y = e.clientY;
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }}
    >
      {obj.type === "dot" ? (
        <KeepScale>
          <div
            className="object size-1 rounded-full bg-red-600"
            style={{ left: obj.position.x }}
          />
        </KeepScale>
      ) : null}
      {obj.type === "line" ? (
        <KeepScale>
          <div
            className="object h-px bg-red-600"
            style={{ width: imageWidth }}
          />
        </KeepScale>
      ) : null}
    </div>
  ));
}
