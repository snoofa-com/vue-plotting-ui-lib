import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  Dot,
  Fullscreen,
  RotateCcw,
  Slash,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import Button from "../Button";
import { cn } from "../../utils/helpers";
import usePlottingComponentStates from "./state";
import PlottedObjects from "./PlottedObjects";
import ObjectListHistory from "./ObjectListHistory";

export default function PlottingComponent() {
  const {
    image,
    setImage,
    currentObjectType,
    setCurrentObjectType,
    objects,
    setObjects,
    objectsHistory,
  } = usePlottingComponentStates();

  const isDotSelect = currentObjectType === "dot";
  const isLineSelect = currentObjectType === "line";

  const currentHistory = [...objectsHistory].reverse();

  const onImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files?.[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  console.log({ image });

  const handleObjectAdd: React.MouseEventHandler<HTMLImageElement> = (
    event
  ) => {
    if (currentObjectType === undefined) return;

    const { offsetX, offsetY } = event.nativeEvent;

    const newObject = {
      type: currentObjectType,
      position: { x: offsetX, y: offsetY },
    };

    setObjects((objects) => objects.concat(newObject));
  };

  const imageWidth =
    typeof document === "object"
      ? document.getElementById("selectedImage")?.clientWidth ?? 0
      : 0;

  return (
    <section className="relative">
      <TransformWrapper initialScale={1} panning={{ excluded: ["object"] }}>
        {({ centerView, zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <div className="m-2 flex w-fit gap-2 border p-2">
              <input
                className="focus:shadow-te-primary relative m-0 min-w-0 flex-auto self-center rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-font-color transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-font-color/10 file:px-3 file:py-[0.32rem] file:text-font-color file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-font-color/20 focus:border-primary focus:text-font-color focus:outline-none"
                type="file"
                accept="image/*"
                onChange={onImageChange}
              />
              <Button
                className="px-2"
                onClick={() => {
                  zoomIn();
                }}
              >
                <ZoomIn />
              </Button>
              <Button
                className="px-2"
                onClick={() => {
                  zoomOut();
                }}
              >
                <ZoomOut />
              </Button>
              <Button
                className="px-2"
                onClick={() => {
                  resetTransform();
                }}
              >
                <RotateCcw />
              </Button>
              <Button
                className="px-2"
                onClick={() => {
                  centerView();
                }}
              >
                <Fullscreen />
              </Button>
              <Button
                className={cn("px-2", isDotSelect ? "bg-font-color/50" : null)}
                onClick={() => {
                  if (currentObjectType === "dot") {
                    setCurrentObjectType(undefined);
                    return;
                  }
                  setCurrentObjectType("dot");
                }}
              >
                <Dot />
              </Button>
              <Button
                className={cn("px-2", isLineSelect ? "bg-font-color/50" : null)}
                onClick={() => {
                  if (currentObjectType === "line") {
                    setCurrentObjectType(undefined);
                    return;
                  }
                  setCurrentObjectType("line");
                }}
              >
                <Slash />
              </Button>
            </div>
            <TransformComponent>
              <div className="relative">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    id="selectedImage"
                    src={image}
                    alt="Selected Image"
                    className="!pointer-events-auto z-30 h-[calc(100vh-150px)] "
                    onClick={handleObjectAdd}
                  />
                ) : null}
                <PlottedObjects
                  objects={objects}
                  updateObjects={setObjects}
                  imageWidth={imageWidth}
                />
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      <ObjectListHistory
        currentHistory={currentHistory}
        updateObjects={setObjects}
      />
    </section>
  );
}
