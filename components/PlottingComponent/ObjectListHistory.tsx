import React from "react";

import { type PlaceableObject } from "./types";

type Props = {
  currentHistory: PlaceableObject[][];
  updateObjects: (updatedObjects: PlaceableObject[]) => void;
};

export default function ObjectListHistory({
  currentHistory,
  updateObjects,
}: Props) {
  if (currentHistory.length <= 1) return null;

  return (
    <section className="absolute right-0 top-0 max-h-[50vh] max-w-[25vw] overflow-scroll text-ellipsis border p-2">
      <h5 className="text-lg font-semibold">Object List History</h5>
      {currentHistory.map((obj, index) => (
        <button
          key={index}
          className="my-1 rounded bg-gray-500 p-2 text-left"
          onClick={() => {
            updateObjects(obj);
          }}
        >
          {JSON.stringify(obj)}
        </button>
      ))}
    </section>
  );
}
