import { Canvas } from "fabric";
import { MutableRefObject } from "react";

// Функция добавления слушателя события object:added, при условии если его уже нет
export const addEventAdded = (
  fabricRef: MutableRefObject<Canvas | null>,
  addedListeners: [] | object[],
  saveCanvasState: () => void
) => {
  if (!addedListeners?.length) {
    fabricRef.current?.on("object:added", saveCanvasState);
  }
};
