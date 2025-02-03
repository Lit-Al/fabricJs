import { Canvas } from 'fabric';
import { MutableRefObject } from 'react';

export const getViewport = (fabricRef: MutableRefObject<Canvas | null>) => {
  if (fabricRef.current) {
    const canvasWidth = fabricRef.current.width;
    const canvasHeight = fabricRef.current.height;
    const zoom = fabricRef.current.getZoom();
    const viewportTransform = fabricRef.current.viewportTransform;

    const viewportLeft = -viewportTransform[4] / zoom;
    const viewportTop = -viewportTransform[5] / zoom;
    const viewportWidth = canvasWidth / zoom;
    const viewportHeight = canvasHeight / zoom;

    return { viewportLeft, viewportTop, viewportWidth, viewportHeight };
  }

  return {
    viewportLeft: 0,
    viewportTop: 0,
    viewportWidth: 0,
    viewportHeight: 0,
  };
};
