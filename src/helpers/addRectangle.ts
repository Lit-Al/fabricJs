import { Canvas, Rect } from 'fabric';
import { MutableRefObject } from 'react';

export const addRectangle = (fabricRef: MutableRefObject<Canvas | null>) => {
  const canvasWidth = fabricRef.current?.width || 0;
  const canvasHeight = fabricRef.current?.height || 0;

  const rect = new Rect({
    top: Math.random() * (canvasHeight - 50),
    left: Math.random() * (canvasWidth - 50),
    width: 50,
    height: 50,
    fill: 'red',
  });

  fabricRef.current?.add(rect);
};
