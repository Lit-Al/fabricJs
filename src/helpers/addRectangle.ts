import { Canvas, Rect } from 'fabric';
import { MutableRefObject } from 'react';
import { getViewport } from './getViewport';
import { baseFigireColor, baseFigureSize } from '../constants';

export const addRectangle = (fabricRef: MutableRefObject<Canvas | null>) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const rect = new Rect({
    left: viewportLeft + Math.random() * (viewportWidth - baseFigureSize),
    top: viewportTop + Math.random() * (viewportHeight - baseFigureSize),
    width: 50,
    height: 50,
    fill: baseFigireColor,
  });

  fabricRef.current?.add(rect);
};
