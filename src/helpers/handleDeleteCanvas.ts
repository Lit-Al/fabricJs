import { Canvas } from 'fabric';
import { MutableRefObject } from 'react';

export const handleDeleteCanvas = (
  fabricRef: MutableRefObject<Canvas | null>
) => {
  if (fabricRef.current) {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      if (activeObject.type === 'activeSelection') {
        const objects = activeObject.toObject();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        objects.forEach((obj: any) => fabricRef.current?.remove(obj));
        fabricRef.current.discardActiveObject();
      } else {
        fabricRef.current.remove(activeObject);
      }
      fabricRef.current.renderAll();
    }
  }
};
