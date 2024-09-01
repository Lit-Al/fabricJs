import { Canvas } from "fabric";
import { MutableRefObject, SetStateAction } from "react";

// Функция для сохранения состояния холста в формате SVG
export const handleSaveCanvas = (
  fabricRef: MutableRefObject<Canvas | null>,
  setCanvasSvg: (value: SetStateAction<string>) => void
) => {
  if (fabricRef.current) {
    const json = fabricRef.current.toJSON();
    const viewportTransform = fabricRef.current.viewportTransform;
    localStorage.setItem("canvas", JSON.stringify({ json, viewportTransform }));

    const svg = fabricRef.current.toSVG();
    setCanvasSvg(svg);
  }
};
