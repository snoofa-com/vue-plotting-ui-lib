import React from "react";
import {
  Dot,
  Fullscreen,
  RotateCcw,
  Slash,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import Button from "../Button";
import { cn } from "@/utils/helpers";

export default function Toolbar({
  onImageChange,
  zoomIn,
  zoomOut,
  resetTransform,
  centerView,
  isDotSelect,
  currentObjectType,
  setCurrentObjectType,
  isLineSelect,
}: any) {
  return (
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
        className={cn("px-2", isDotSelect ? "bg-slate-500	" : null)}
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
        className={cn("px-2", isLineSelect ? "bg-slate-500" : null)}
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
  );
}
