import { Canvas, IText } from 'fabric';
import { MutableRefObject } from 'react';

export const addText = (fabricRef: MutableRefObject<Canvas | null>) => {
  const canvasWidth = fabricRef.current?.width || 0;
  const canvasHeight = fabricRef.current?.height || 0;

  const text = new IText('Hello, world!', {
    top: Math.random() * (canvasHeight - 100),
    left: Math.random() * (canvasWidth - 100),
    fontSize: 24,
  });
  fabricRef.current?.add(text);
};
