import { FC, useContext } from "react";
import { ImageButton } from "../ImageButton";
import { ImageUploadButton } from "../ImageUploadButton";
import { CanvasContext } from "../../contexts";

interface IImages {
  styles: CSSModuleClasses;
}

export const Images: FC<IImages> = ({ styles }) => {
  const { fabricRef } = useContext(CanvasContext);

  return (
    <section className={styles.sidebar__buttons}>
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/react.svg"
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/maxa.ico"
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/cat.jpg"
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/pikachu.png"
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/doggy.jpg"
      />
      <ImageUploadButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
      />
    </section>
  );
};
