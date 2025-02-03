import { Canvas, IText } from "fabric";
import { MutableRefObject } from "react";
import { getViewport } from "./getViewport";
import { baseFigureSize } from "../constants";

export const addText = (
  fabricRef: MutableRefObject<Canvas | null>,
  color: string
) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const text = new IText("Hello, MAXA!", {
    left: viewportLeft + Math.random() * (viewportWidth - baseFigureSize),
    top: viewportTop + Math.random() * (viewportHeight - baseFigureSize),
    fontSize: 24,
    fill: color,
  });
  fabricRef.current?.add(text);
};
