import { Canvas, Rect } from "fabric";
import { MutableRefObject } from "react";
import { getViewport } from "./getViewport";
import { baseFigureSize } from "../constants";

export const addSquare = (
  fabricRef: MutableRefObject<Canvas | null>,
  color: string
) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const rect = new Rect({
    left: viewportLeft + Math.random() * (viewportWidth - baseFigureSize),
    top: viewportTop + Math.random() * (viewportHeight - baseFigureSize),
    width: baseFigureSize,
    height: baseFigureSize,
    fill: color,
  });

  fabricRef.current?.add(rect);
};
