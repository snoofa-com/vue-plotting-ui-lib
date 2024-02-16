import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import usePlottingComponentStates from "./state";
import PlottedObjects from "./PlottedObjects";
import ObjectListHistory from "./ObjectListHistory";
import Toolbar from "./Toolbar";

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
            <Toolbar
              onImageChange={onImageChange}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetTransform={resetTransform}
              centerView={centerView}
              isDotSelect={isDotSelect}
              currentObjectType={currentObjectType}
              setCurrentObjectType={setCurrentObjectType}
              isLineSelect={isLineSelect}
            />
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
