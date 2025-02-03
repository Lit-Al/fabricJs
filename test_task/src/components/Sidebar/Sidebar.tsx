import { ModalSVG } from "../ModalSVG";
import { Elements } from "../Elemets";
import { Tools } from "../Tools";
import { Images } from "../Images";

import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <>
      <aside className={styles.sidebar}>
        <Elements styles={styles} />
        <Images styles={styles} />
        <Tools styles={styles} />
      </aside>
      <ModalSVG />
    </>
  );
};
