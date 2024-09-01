import { Canvas, FabricImage, FabricObject } from "fabric";
import clsx from "clsx";

import styles from "./ImageButton.module.scss";
import { getViewport } from "../../helpers/getViewport";
import { Dispatch, FC, SetStateAction } from "react";
import { addEventAdded } from "../../helpers";

interface IImageButton {
  fabricRef: React.MutableRefObject<Canvas | null>;
  src: string;
  className?: string;
  setRedoHistory: Dispatch<SetStateAction<FabricObject[][]>>;
  addedListeners: [] | object[];
  saveCanvasState: () => void;
}

export const ImageButton: FC<IImageButton> = ({
  fabricRef,
  src,
  className,
  setRedoHistory,
  addedListeners,
  saveCanvasState,
}) => {
  const handleAddImage = async () => {
    if (fabricRef.current) {
      setRedoHistory([]);
      addEventAdded(fabricRef, addedListeners, saveCanvasState);
      const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
        getViewport(fabricRef);
      const img = await FabricImage.fromURL(src);
      img.set({
        left: viewportLeft + Math.random() * (viewportWidth - img.width),
        top: viewportTop + Math.random() * (viewportHeight - img.height),
        originX: "center",
        originY: "center",
      });
      fabricRef.current.add(img);
    }
  };

  return (
    <button
      className={clsx(styles.sidebar__button, className)}
      onClick={handleAddImage}
    >
      <img src={src} alt="Add image" width={24} height={24} />
    </button>
  );
};
