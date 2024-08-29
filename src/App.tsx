import { Canvas } from 'fabric';
import { useRef } from 'react';
import { CanvasComponent, Sidebar } from './components';

const App = () => {
  const fabricRef = useRef<Canvas | null>(null);

  return (
    <>
      <CanvasComponent fabricRef={fabricRef} />
      <Sidebar fabricRef={fabricRef} />
    </>
  );
};

export default App;
