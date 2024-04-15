import { useState, useEffect } from "react";

import { type PlaceableObject, type ObjectTypes } from "./types";

export default function usePlottingComponentStates() {
  const [image, setImage] = useState("");
  const [objects, setObjects] = useState<PlaceableObject[]>([]);
  const [currentObjectType, setCurrentObjectType] = useState<ObjectTypes>();

  const [objectsHistory, setObjectsHistory] = useState<PlaceableObject[][]>([
    [],
  ]);

  useEffect(() => {
    setObjectsHistory((history) => history.concat([objects]));
  }, [objects]);

  useEffect(() => {
    setObjectsHistory([]);
    setObjects([]);
    setCurrentObjectType(undefined);
  }, [image]);

  return {
    image,
    setImage,
    objects,
    setObjects,
    currentObjectType,
    setCurrentObjectType,
    objectsHistory,
  };
}
