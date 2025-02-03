import { Canvas } from "fabric";
import { useRef } from "react";
import { CanvasComponent, Sidebar } from "./components";
import { CanvasProvider } from "./contexts";

const App = () => {
  const fabricRef = useRef<Canvas | null>(null);

  return (
    <CanvasProvider fabricRef={fabricRef}>
      <CanvasComponent />
      <Sidebar />
    </CanvasProvider>
  );
};

export default App;
