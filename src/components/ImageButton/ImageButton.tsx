import { Canvas, FabricImage } from "fabric";
import clsx from "clsx";

import styles from "./ImageButton.module.scss";
import { getViewport } from "../../helpers/getViewport";
import { FC } from "react";

interface IImageButton {
  fabricRef: React.MutableRefObject<Canvas | null>;
  src: string;
  className?: string;
}

export const ImageButton: FC<IImageButton> = ({
  fabricRef,
  src,
  className,
}) => {
  const handleAddImage = async () => {
    if (fabricRef.current) {
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
