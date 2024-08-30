import { Canvas, IText } from 'fabric';
import { MutableRefObject } from 'react';
import { getViewport } from './getViewport';
import { baseFigureSize } from '../constants';

export const addText = (fabricRef: MutableRefObject<Canvas | null>) => {
  const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
    getViewport(fabricRef);

  const text = new IText('Hello, world!', {
    left: viewportLeft + Math.random() * (viewportWidth - baseFigureSize),
    top: viewportTop + Math.random() * (viewportHeight - baseFigureSize),
    fontSize: 24,
  });
  fabricRef.current?.add(text);
};
