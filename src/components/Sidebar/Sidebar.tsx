import { Canvas } from 'fabric';
import { MutableRefObject } from 'react';
import { addCircle, addText, addTriangle, addRectangle } from '../../helpers';

export const Sidebar = ({
  fabricRef,
}: {
  fabricRef: MutableRefObject<Canvas | null>;
}) => {
  return (
    <div>
      <button onClick={() => addText(fabricRef)}>Add text</button>
      <button onClick={() => addCircle(fabricRef)}>Add circle</button>
      <button onClick={() => addTriangle(fabricRef)}>Add Triangle</button>
      <button onClick={() => addRectangle(fabricRef)}>Add Rectangle</button>
    </div>
  );
};
