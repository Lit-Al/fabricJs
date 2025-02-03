import { baseCircleRadius } from './../constants/constants';
import { Canvas, Circle } from 'fabric';
import { MutableRefObject } from 'react';
import { getViewport } from './getViewport';

export const addCircle = (fabricRef: MutableRefObject<Canvas | null>, color: string) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const circle = new Circle({
    radius: baseCircleRadius,
    fill: color,
    left: viewportLeft + Math.random() * (viewportWidth - 2 * baseCircleRadius),
    top: viewportTop + Math.random() * (viewportHeight - 2 * baseCircleRadius),
  });

  fabricRef.current?.add(circle);
};
