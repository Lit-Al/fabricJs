import { MutableRefObject, useEffect, useRef } from 'react';
import { Canvas } from 'fabric';

import styles from './CanvasComponent.module.scss';

export const CanvasComponent = ({
  fabricRef,
}: {
  fabricRef: MutableRefObject<Canvas | null>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initFabric = () => {
      if (canvasRef.current) {
        fabricRef.current = new Canvas(canvasRef.current, {
          width: 700,
          height: 500,
        });
      }
    };

    const disposeFabric = () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };

    initFabric();

    return () => {
      disposeFabric();
    };
  }, []);

  return (
    <div className={styles.canvas_wrapper}>
      <canvas ref={canvasRef} />
    </div>
  );
};
