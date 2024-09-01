import { Canvas, PencilBrush } from 'fabric';
import { FaPen } from 'react-icons/fa';

export const DrawButton = ({
  fabricRef,
  className,
}: {
  fabricRef: React.MutableRefObject<Canvas | null>;
  className?: string;
}) => {
  const handleDrawToggle = () => {
    if (fabricRef.current) {
      if (fabricRef.current.isDrawingMode) {
        fabricRef.current.isDrawingMode = false;
        fabricRef.current.freeDrawingBrush = undefined;
      } else {
        fabricRef.current.isDrawingMode = true;
        fabricRef.current.freeDrawingBrush = new PencilBrush(fabricRef.current);
      }
    }
  };

  return (
    <button className={className} onClick={handleDrawToggle}>
      <FaPen size={20} />
    </button>
  );
};
