import { Canvas, Circle } from 'fabric';
import { MutableRefObject } from 'react';

export const addCircle = (fabricRef: MutableRefObject<Canvas | null>) => {
  const canvasWidth = fabricRef.current?.width || 0;
  const canvasHeight = fabricRef.current?.height || 0;
  
  const circle = new Circle({
    radius: 20,
    fill: 'green',
    top: Math.random() * (canvasHeight - 150),
    left: Math.random() * (canvasWidth - 150),
  });
  fabricRef.current?.add(circle);
};
