import { Canvas, Circle } from 'fabric';
import { MutableRefObject } from 'react';
import { getViewport } from './getViewport';
import { baseFigireColor } from '../constants';

export const addCircle = (fabricRef: MutableRefObject<Canvas | null>) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const radius = 35;

  const circle = new Circle({
    radius,
    fill: baseFigireColor,
    left: viewportLeft + Math.random() * (viewportWidth - 2 * radius),
    top: viewportTop + Math.random() * (viewportHeight - 2 * radius),
  });

  fabricRef.current?.add(circle);
};
