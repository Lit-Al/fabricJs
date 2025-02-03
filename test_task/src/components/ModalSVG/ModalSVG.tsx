import { RxCross2 } from "react-icons/rx";

import styles from "./ModalSVG.module.scss";
import { CanvasContext } from "../../contexts";
import { useContext } from "react";

export const ModalSVG = () => {
  const { canvasSvg, setCanvasSvg } = useContext(CanvasContext);

  if (!canvasSvg) return null;
  return (
    <div className={styles.modal}>
      <button className={styles.close} onClick={() => setCanvasSvg("")}>
        <RxCross2 />
      </button>
      <h2 className={styles.title}>SVG</h2>
      <code className={styles.code}>{canvasSvg}</code>
    </div>
  );
};
