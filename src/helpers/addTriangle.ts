import { Canvas, Triangle } from 'fabric';
import { MutableRefObject } from 'react';
import { getViewport } from './getViewport';
import { baseFigireColor, baseFigureSize } from '../constants';

export const addTriangle = (fabricRef: MutableRefObject<Canvas | null>) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const circle = new Triangle({
    fill: baseFigireColor,
    left: viewportLeft + Math.random() * (viewportWidth - baseFigureSize),
    top: viewportTop + Math.random() * (viewportHeight - baseFigureSize),
  });
  fabricRef.current?.add(circle);
};
