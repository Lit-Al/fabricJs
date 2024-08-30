import { Canvas } from 'fabric';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export const handleCanvasColorChange = (
  color: string,
  fabricRef: MutableRefObject<Canvas | null>,
  setSelectedColor: Dispatch<SetStateAction<string>>
) => {
  setSelectedColor(color);
  if (fabricRef.current) {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      activeObject.set('fill', color);
      fabricRef.current.requestRenderAll();
    }
  }
};
