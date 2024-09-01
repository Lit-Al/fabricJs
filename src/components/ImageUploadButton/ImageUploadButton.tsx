import { Canvas, FabricImage, FabricObject } from "fabric";
import { getViewport } from "../../helpers/getViewport";
import { FaRegImage } from "react-icons/fa";
import { Dispatch, FC, MutableRefObject, SetStateAction } from "react";
import { addEventAdded } from "../../helpers";

import styles from "./ImageUploadButton.module.scss";

interface IImageUploadButton {
  fabricRef: MutableRefObject<Canvas | null>;
  className?: string;
  setRedoHistory: Dispatch<SetStateAction<FabricObject[][]>>;
  addedListeners: [] | object[];
  saveCanvasState: () => void;
}

export const ImageUploadButton: FC<IImageUploadButton> = ({
  fabricRef,
  className,
  setRedoHistory,
  addedListeners,
  saveCanvasState,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRedoHistory([]);
      addEventAdded(fabricRef, addedListeners, saveCanvasState);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const fabricImg = new FabricImage(img);
          const { viewportLeft, viewportTop, viewportWidth, viewportHeight } =
            getViewport(fabricRef);
          fabricImg.set({
            left: viewportLeft + Math.random() * (viewportWidth - img.width),
            top: viewportTop + Math.random() * (viewportHeight - img.height),
            originX: "center",
            originY: "center",
          });
          fabricRef.current?.add(fabricImg);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className={`${styles.imageUploadButton} ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.imageUploadInput}
      />
      <FaRegImage size={24} />
    </label>
  );
};
