import { FC, useEffect, useContext } from "react";
import { FaDownload, FaRedo, FaSave, FaTrash, FaUndo } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { TbZoomCancelFilled } from "react-icons/tb";
import {
  handleSaveCanvas,
  handleResetZoomCanvas,
  handleClearCanvas,
  handleDeleteCanvasElement,
  areEqual,
} from "../../helpers";
import { CanvasContext } from "../../contexts";

interface ITools {
  styles: CSSModuleClasses;
}

export const Tools: FC<ITools> = ({ styles }) => {
  const {
    history,
    setHistory,
    redoHistory,
    setRedoHistory,
    savedObjects,
    saveCanvasState,
    undo,
    redo,
    fabricRef,
    setCanvasSvg,
    downloadImage,
    addedListeners,
  } = useContext(CanvasContext);

  useEffect(() => {
    if (fabricRef.current) {
      let isObjectEditing = false;

      // Устанавливаем флаг isObjectEditing в true при изменении объекта на холсте
      fabricRef.current.on("object:moving", () => {
        isObjectEditing = true;
        setRedoHistory([]);
      });
      fabricRef.current.on("object:rotating", () => {
        isObjectEditing = true;
        setRedoHistory;
      });
      fabricRef.current.on("object:scaling", () => {
        isObjectEditing = true;
        setRedoHistory([]);
      });

      // Если объект был изменен, сохраняем текущее состояние холста в историю изменений
      // mouse:up нужен, чтобы избежать бесконечного вызова saveCanvasState()
      fabricRef.current.on("mouse:up", () => {
        if (isObjectEditing) {
          isObjectEditing = false;
          saveCanvasState();
        }
      });
      // Добавляем только один слушатель события object:added
      if (addedListeners === undefined || !addedListeners.length) {
        fabricRef.current.on("object:added", saveCanvasState);
      }
      // Если слушателей события object:added по ошибке 2, удаляем последний
      if (addedListeners) {
        addedListeners.pop();
      }
    }
  }, [fabricRef.current]);

  return (
    <>
      <hr />
      <section className={styles.sidebar__buttons}>
        <button
          disabled={
            !history.length ||
            (history.length === 1 && areEqual(history[0], savedObjects))
          }
          className={styles.sidebar__icon_button}
          onClick={undo}
        >
          <FaUndo size={24} />
        </button>
        <button
          disabled={!redoHistory.length}
          className={styles.sidebar__icon_button}
          onClick={redo}
        >
          <FaRedo size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() =>
            handleDeleteCanvasElement(fabricRef, setHistory, setRedoHistory)
          }
        >
          <FaDeleteLeft size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => handleSaveCanvas(fabricRef, setCanvasSvg)}
        >
          <FaSave size={24} />
        </button>
        <button className={styles.sidebar__icon_button} onClick={downloadImage}>
          <FaDownload size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => handleResetZoomCanvas(fabricRef)}
        >
          <TbZoomCancelFilled size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => {
            setHistory([]);
            handleClearCanvas(fabricRef);
          }}
        >
          <FaTrash size={24} color="#ff3333" />
        </button>
      </section>
    </>
  );
};
