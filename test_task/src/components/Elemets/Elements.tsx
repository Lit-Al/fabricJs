import { BsTriangleFill } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { MdOutlineTextIncrease } from "react-icons/md";
import { RiRectangleFill, RiSquareFill } from "react-icons/ri";
import {
  addCircle,
  addTriangle,
  addRectangle,
  addSquare,
  addText,
  handleCanvasColorChange,
  addEventAdded,
} from "../../helpers";
import { DrawButton } from "../DrawButton";
import { FC, useContext } from "react";
import { CanvasContext } from "../../contexts";
import Chrome from "react-color/lib/components/chrome/Chrome";

interface IElements {
  styles: CSSModuleClasses;
}

export const Elements: FC<IElements> = ({ styles }) => {
  const {
    fabricRef,
    selectedColor,
    setSelectedColor,
    saveCanvasState,
    setRedoHistory,
    addedListeners,
  } = useContext(CanvasContext);

  return (
    <>
      <img
        className={styles.sidebar__logo}
        src="/fabricJs/maxa.ico"
        alt="MAXA"
      />
      <section className={styles.sidebar__buttons}>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => {
            setRedoHistory([]);
            addEventAdded(fabricRef, addedListeners, saveCanvasState);
            addCircle(fabricRef, selectedColor);
          }}
        >
          <FaCircle size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => {
            setRedoHistory([]);
            addEventAdded(fabricRef, addedListeners, saveCanvasState);
            addTriangle(fabricRef, selectedColor);
          }}
        >
          <BsTriangleFill size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => {
            setRedoHistory([]);
            addEventAdded(fabricRef, addedListeners, saveCanvasState);
            addRectangle(fabricRef, selectedColor);
          }}
        >
          <RiRectangleFill size={24} />
        </button>
        <button
          className={styles.sidebar__icon_button}
          onClick={() => {
            setRedoHistory([]);
            addEventAdded(fabricRef, addedListeners, saveCanvasState);
            addSquare(fabricRef, selectedColor);
          }}
        >
          <RiSquareFill size={24} />
        </button>
        <DrawButton
          className={styles.sidebar__icon_button}
          fabricRef={fabricRef}
        />
        <button
          className={styles.sidebar__icon_button}
          onClick={() => {
            setRedoHistory([]);
            addEventAdded(fabricRef, addedListeners, saveCanvasState);
            addText(fabricRef, selectedColor);
          }}
        >
          <MdOutlineTextIncrease size={24} />
        </button>
      </section>
      <Chrome
        className={styles.sidebar__color}
        onChange={(color) => {
          handleCanvasColorChange(color.hex, fabricRef, setSelectedColor);
        }}
        color={selectedColor}
        onChangeComplete={() => {
          saveCanvasState();
        }}
      />
    </>
  );
};
