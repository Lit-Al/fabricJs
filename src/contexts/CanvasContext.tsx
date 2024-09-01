import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Canvas, FabricObject, util } from "fabric";
import { areEqual } from "../helpers";

interface ICanvasContext {
  history: FabricObject[][];
  setHistory: Dispatch<SetStateAction<FabricObject[][]>>;
  redoHistory: FabricObject[][];
  setRedoHistory: Dispatch<SetStateAction<FabricObject[][]>>;
  savedObjects: FabricObject[];
  saveCanvasState: () => void;
  undo: () => void;
  redo: () => void;
  fabricRef: MutableRefObject<Canvas | null>;
  setCanvasSvg: Dispatch<SetStateAction<string>>;
  canvasSvg: string;
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  downloadImage: () => void;
  addedListeners: [] | object[];
}

export const CanvasContext = createContext<ICanvasContext>({
  history: [],
  setHistory: () => {},
  redoHistory: [],
  setRedoHistory: () => {},
  savedObjects: [],
  saveCanvasState: () => {},
  undo: () => {},
  redo: () => {},
  fabricRef: { current: null },
  setCanvasSvg: () => {},
  canvasSvg: "",
  selectedColor: "",
  setSelectedColor: () => {},
  downloadImage: () => {},
  addedListeners: [],
});

interface CanvasProviderProps {
  children: ReactNode;
  fabricRef: MutableRefObject<Canvas | null>;
}

// Создаем контекст для предоставления доступа к состоянию и функциям холста для дочерних компонентов
export const CanvasProvider: FC<CanvasProviderProps> = ({
  children,
  fabricRef,
}) => {
  const [history, setHistory] = useState<FabricObject[][]>([]);
  const [redoHistory, setRedoHistory] = useState<FabricObject[][]>([]);
  const [canvasSvg, setCanvasSvg] = useState("");
  const [selectedColor, setSelectedColor] = useState("#307BDF");
  const savedObjects = JSON.parse(localStorage.getItem("canvas") ?? "{}").json
    ?.objects;
  // Слушатели событий added
  const addedListeners = fabricRef.current?.__eventListeners["object:added"];

  // Функция для скачивания изображения с холста в формате PNG
  const downloadImage = () => {
    if (fabricRef.current) {
      const dataURL = fabricRef.current.toDataURL({
        format: "png",
        multiplier: 1,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas_image.png";
      link.click();
    }
  };

  // Функция для сохранения текущего состояния холста в историю изменений
  const saveCanvasState = () => {
    if (fabricRef.current) {
      const jsonCanvas = fabricRef.current.toObject().objects;
      setHistory((prevHistory) => {
        if (areEqual(prevHistory[0], jsonCanvas)) {
          return prevHistory;
        }
        return [...prevHistory, jsonCanvas];
      });
    }
  };

  // Функция для очистки холста, удаляя все объекты
  const clear = () => {
    if (fabricRef.current) {
      fabricRef.current.remove(...fabricRef.current.getObjects());
    }
  };

  // Функция для отмены последнего изменения на холсте
  const undo = () => {
    if (fabricRef.current && history.length > 0) {
      if (history.length === 1 && areEqual(history[0], savedObjects)) {
        return;
      }
      clear();
      if (history.length > 1) {
        fabricRef.current.off("object:added");
        util.enlivenObjects(history[history.length - 2]).then((objs) => {
          objs.forEach((obj) => {
            if (obj instanceof FabricObject) {
              fabricRef.current?.add(obj);
            }
          });
        });
      }

      // Сохраняем текущее состояние в историю повторов
      setRedoHistory((prevRedoHistory) => [
        ...prevRedoHistory,
        history[history.length - 1],
      ]);

      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  // Функция для повторения последнего отмененного изменения на холсте
  const redo = () => {
    if (fabricRef.current && redoHistory.length > 0) {
      clear();
      fabricRef.current.off("object:added");
      util.enlivenObjects(redoHistory[redoHistory.length - 1]).then((objs) => {
        objs.forEach((obj) => {
          if (obj instanceof FabricObject) {
            fabricRef.current?.add(obj);
          }
        });
      });

      // Удаляем последнее состояние из истории повторов и добавляем его в историю отмены
      setHistory((prevHistory) => [
        ...prevHistory,
        redoHistory[redoHistory.length - 1],
      ]);
      setRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
    }
  };

  return (
    <CanvasContext.Provider
      value={{
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
        canvasSvg,
        selectedColor,
        setSelectedColor,
        downloadImage,
        addedListeners,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
