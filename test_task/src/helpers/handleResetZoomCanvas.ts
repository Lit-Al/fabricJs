import { Canvas } from "fabric";
import { MutableRefObject } from "react";

export const handleResetZoomCanvas = (
  fabricRef: MutableRefObject<Canvas | null>
) => {
  if (fabricRef.current) {
    fabricRef.current.setZoom(1);
    fabricRef.current.setViewportTransform([1, 0, 0, 1, 0, 0]);
  }
};
