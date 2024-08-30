import { RxCross2 } from "react-icons/rx";

import styles from "./ModalSVG.module.scss";

export const ModalSVG = ({
  text,
  handleClose,
}: {
  text: string;
  handleClose: () => void;
}) => {
  if (!text) return null;
  return (
    <div className={styles.modal}>
      <button className={styles.close} onClick={handleClose}>
        <RxCross2 />
      </button>
      <h2 className={styles.title}>SVG</h2>
      <code className={styles.code}>{text}</code>
    </div>
  );
};
