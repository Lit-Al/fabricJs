import { useContext, useEffect, useRef } from "react";
import { Canvas, Point } from "fabric";
import { CanvasContext } from "../../contexts";

import styles from "./CanvasComponent.module.scss";

// Компонент CanvasComponent использует useRef для создания ссылок на элементы canvas и его обертку
export const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const isSpacePressed = useRef(false);
  const { fabricRef } = useContext(CanvasContext);

  if (!fabricRef) return null;

  // Используем useEffect для инициализации Fabric.js и настройки обработчиков событий
  useEffect(() => {
    const initFabric = () => {
      if (canvasRef.current) {
        // Устанавливаем ширину и высоту холста равными ширине и высоте окна браузера
        const width = window.innerWidth;
        const height = window.innerHeight;
        fabricRef.current = new Canvas(canvasRef.current, {
          width,
          height,
          backgroundColor: "#fff",
        });
        fabricRef.current?.renderAll();

        // Загружаем сохраненное состояние холста из localStorage
        const data = localStorage.getItem("canvas");
        if (data) {
          const { json, viewportTransform } = JSON.parse(data);
          fabricRef.current.loadFromJSON(json).then(function () {
            fabricRef.current?.setViewportTransform(viewportTransform);
          });
        }

        // Обработчик события "mouse:wheel" для масштабирования холста
        fabricRef.current.on("mouse:wheel", (opt) => {
          opt.e.preventDefault();
          opt.e.stopPropagation();
          const delta = opt.e.deltaY;
          let zoom = fabricRef.current?.getZoom() || 1;
          zoom *= 0.999 ** delta;
          if (zoom > 20) zoom = 20;
          if (zoom < 0.01) zoom = 0.01;
          // Масштабируем холст относительно точки, в которой произошло событие "mouse:wheel"
          fabricRef.current?.zoomToPoint(
            new Point(opt.e.offsetX, opt.e.offsetY),
            zoom
          );
        });

        // Обработчик события "mouse:down" для переключения режима рисования
        fabricRef.current.on("mouse:down", (opt) => {
          const e = opt.e as MouseEvent;
          if (e.button === 1 && isSpacePressed.current && fabricRef.current) {
            fabricRef.current.set({ isDrawingMode: true });
            fabricRef.current.selection = false;
          }
          isSpacePressed.current &&
            canvasWrapperRef.current?.classList.add(
              styles["canvas_wrapper--grabbing"]
            );
        });

        // Обработчик события "mouse:move" для перемещения холста при зажатой клавише пробела
        fabricRef.current.on("mouse:move", (opt) => {
          const e = opt.e as MouseEvent;
          // Если нажата средняя кнопка мыши и нажата клавиша пробела, переключаем режим рисования
          if (e.buttons === 1 && isSpacePressed.current) {
            fabricRef.current?.relativePan(new Point(e.movementX, e.movementY));
          }
        });

        // Обработчик события "mouse:up" для выключения режима рисования
        fabricRef.current.on("mouse:up", () => {
          if (fabricRef.current) {
            fabricRef.current.set({ isDrawingMode: false });
            fabricRef.current.selection = true;
            canvasWrapperRef.current?.classList.remove(
              styles["canvas_wrapper--grabbing"]
            );
          }
        });

        // Обработчик события "keydown" для включения режима перемещения холста при нажатии клавиши пробела
        document.addEventListener("keydown", (e) => {
          if (e.key === " ") {
            isSpacePressed.current = true;
            canvasWrapperRef.current?.classList.add(
              styles["canvas_wrapper--grab"]
            );
          }
        });

        // Обработчик события "keyup" для выключения режима перемещения холста при отпускании клавиши пробела
        document.addEventListener("keyup", (e) => {
          if (e.key === " " && fabricRef.current) {
            isSpacePressed.current = false;
            fabricRef.current.set({ isDrawingMode: false });
            fabricRef.current.selection = true;
            canvasWrapperRef.current?.classList.remove(
              styles["canvas_wrapper--grabbing"]
            );
            canvasWrapperRef.current?.classList.remove(
              styles["canvas_wrapper--grab"]
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
