import { useEffect, useRef } from 'react';
import { Canvas, Point } from 'fabric';

import styles from './CanvasComponent.module.scss';

export const CanvasComponent = ({
  fabricRef,
}: {
  fabricRef: React.MutableRefObject<Canvas | null>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const isSpacePressed = useRef(false);

  useEffect(() => {
    const initFabric = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        fabricRef.current = new Canvas(canvasRef.current, {
          width,
          height,
          backgroundColor: '#fff',
        });
        fabricRef.current?.renderAll();

        const data = localStorage.getItem('canvas');
        if (data) {
          const { json, viewportTransform } = JSON.parse(data);
          fabricRef.current.loadFromJSON(json).then(function () {
            fabricRef.current?.setViewportTransform(viewportTransform);
          });
        }

        fabricRef.current.on('mouse:wheel', (opt) => {
          const delta = opt.e.deltaY;
          let zoom = fabricRef.current?.getZoom() || 1;
          zoom *= 0.999 ** delta;
          if (zoom > 20) zoom = 20;
          if (zoom < 0.01) zoom = 0.01;
          fabricRef.current?.zoomToPoint(
            new Point(opt.e.offsetX, opt.e.offsetY),
            zoom
          );
          opt.e.preventDefault();
          opt.e.stopPropagation();
        });

        fabricRef.current.on('mouse:down', (opt) => {
          const e = opt.e as MouseEvent;
          if (e.button === 1 && isSpacePressed.current && fabricRef.current) {
            fabricRef.current.set({ isDrawingMode: true });
            fabricRef.current.selection = false;
          }
          canvasWrapperRef.current?.classList.add(
            styles['canvas_wrapper--grabbing']
          );
        });

        fabricRef.current.on('mouse:move', (opt) => {
          const e = opt.e as MouseEvent;
          if (e.buttons === 1 && isSpacePressed.current) {
            fabricRef.current?.relativePan(new Point(e.movementX, e.movementY));
          }
        });

        fabricRef.current.on('mouse:up', () => {
          if (fabricRef.current) {
            fabricRef.current.set({ isDrawingMode: false });
            fabricRef.current.selection = true;
            canvasWrapperRef.current?.classList.remove(
              styles['canvas_wrapper--grabbing']
            );
          }
        });

        document.addEventListener('keydown', (e) => {
          if (e.key === ' ') {
            isSpacePressed.current = true;
            canvasWrapperRef.current?.classList.add(
              styles['canvas_wrapper--grab']
            );
          }
        });

        document.addEventListener('keyup', (e) => {
          if (e.key === ' ' && fabricRef.current) {
            isSpacePressed.current = false;
            fabricRef.current.set({ isDrawingMode: false });
            fabricRef.current.selection = true;
            canvasWrapperRef.current?.classList.remove(
              styles['canvas_wrapper--grabbing']
            );
            canvasWrapperRef.current?.classList.remove(
              styles['canvas_wrapper--grab']
            );
          }
        });
      }
    };
    initFabric();
  }, [fabricRef]);

  return (
    <div className={styles.canvas_wrapper} ref={canvasWrapperRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};
