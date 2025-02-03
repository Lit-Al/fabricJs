import { ActiveSelection, Canvas, FabricObject } from "fabric";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { areEqual } from "./areEqual";

export const handleDeleteCanvasElement = (
  fabricRef: MutableRefObject<Canvas | null>,
  setHistory: Dispatch<SetStateAction<FabricObject[][]>>,
  setRedoHistory: Dispatch<SetStateAction<FabricObject[][]>>
) => {
  if (fabricRef.current) {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      const currentObjects = fabricRef.current.toObject().objects;
      setHistory((prevHistory) => [
        ...prevHistory,
        currentObjects.filter(
          (obj: FabricObject) => !areEqual(obj, activeObject)
        ),
      ]);
      // Очищаем историю повторов при выполнении нового действия
      setRedoHistory([]);
      // Если выбранная группа объектов, удаляем все объекты в группе
      if (activeObject instanceof ActiveSelection) {
        const objects = activeObject.getObjects(); // Получаем все объекты в группе
        objects.forEach((obj: FabricObject) => fabricRef.current?.remove(obj));
        fabricRef.current.discardActiveObject();
      } else {
        // Иначе удаляем выбранный объект
        fabricRef.current.remove(activeObject);
      }
    }
  }
};
