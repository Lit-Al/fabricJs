import { Canvas } from 'fabric';

export const handleClearCanvas = (
  fabricRef: React.MutableRefObject<Canvas | null>
) => {
  if (fabricRef.current && confirm('Вы уверены, что хотите очистить холст?')) {
    fabricRef.current.clear();
    fabricRef.current.backgroundColor = '#fff';
    localStorage.removeItem('canvas');
  }
};
