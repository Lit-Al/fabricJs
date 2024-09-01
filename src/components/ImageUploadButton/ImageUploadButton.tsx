import { Canvas, FabricImage } from 'fabric';
import { getViewport } from '../../helpers/getViewport';

import styles from './ImageUploadButton.module.scss';
import { FaRegImage } from 'react-icons/fa';

export const ImageUploadButton = ({
  fabricRef,
  className,
}: {
  fabricRef: React.MutableRefObject<Canvas | null>;
  className?: string;
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
            originX: 'center',
            originY: 'center',
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
