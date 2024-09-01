import { FC, useContext } from "react";
import { ImageButton } from "../ImageButton";
import { ImageUploadButton } from "../ImageUploadButton";
import { CanvasContext } from "../../contexts";

interface IImages {
  styles: CSSModuleClasses;
}

export const Images: FC<IImages> = ({ styles }) => {
  const { fabricRef, setRedoHistory, saveCanvasState, addedListeners } =
    useContext(CanvasContext);

  return (
    <section className={styles.sidebar__buttons}>
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/fabricJs/react.svg"
        setRedoHistory={setRedoHistory}
        addedListeners={addedListeners}
        saveCanvasState={saveCanvasState}
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/fabricJs/maxa.ico"
        setRedoHistory={setRedoHistory}
        addedListeners={addedListeners}
        saveCanvasState={saveCanvasState}
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/fabricJs/cat.jpg"
        setRedoHistory={setRedoHistory}
        addedListeners={addedListeners}
        saveCanvasState={saveCanvasState}
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/fabricJs/pikachu.png"
        setRedoHistory={setRedoHistory}
        addedListeners={addedListeners}
        saveCanvasState={saveCanvasState}
      />
      <ImageButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        src="/fabricJs/doggy.jpg"
        setRedoHistory={setRedoHistory}
        addedListeners={addedListeners}
        saveCanvasState={saveCanvasState}
      />
      <ImageUploadButton
        className={styles.sidebar__icon_button}
        fabricRef={fabricRef}
        setRedoHistory={setRedoHistory}
        addedListeners={addedListeners}
        saveCanvasState={saveCanvasState}
      />
    </section>
  );
};
