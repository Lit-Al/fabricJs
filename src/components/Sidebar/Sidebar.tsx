import { Canvas } from 'fabric';
import { MutableRefObject, useState } from 'react';
import { addCircle, addText, addTriangle, addRectangle } from '../../helpers';
import { ImageButton } from '../ImageButton';
import { FaCircle } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';
import { RiRectangleFill } from 'react-icons/ri';
import { MdOutlineTextIncrease } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { ModalSVG } from '../ModalSVG';
import { handleSaveCanvas } from '../../helpers/handleSaveCanvas';
import { handleDeleteCanvas } from '../../helpers/handleDeleteCanvas';
import { TbZoomCancelFilled } from 'react-icons/tb';
import { handleResetZoomCanvas } from '../../helpers/handleResetZoomCanvas';
import { handleCanvasColorChange } from '../../helpers/handleCanvasColorChange';

import styles from './Sidebar.module.scss';
import { FaDeleteLeft } from 'react-icons/fa6';

export const Sidebar = ({
  fabricRef,
}: {
  fabricRef: MutableRefObject<Canvas | null>;
}) => {
  const [canvasSvg, setCanvasSvg] = useState('');
  const [selectedColor, setSelectedColor] = useState('#307BDF');

  const handleClearCanvas = () => {
    if (
      fabricRef.current &&
      confirm('Вы уверены, что хотите очистить холст?')
    ) {
      fabricRef.current.clear();
      localStorage.removeItem('canvas');
    }
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <h3>Фигуры:</h3>
        <section className={styles.sidebar__buttons}>
          <button
            className={styles.sidebar__icon_button}
            onClick={() => addCircle(fabricRef)}
          >
            <FaCircle size={24} />
          </button>
          <button
            className={styles.sidebar__icon_button}
            onClick={() => addTriangle(fabricRef)}
          >
            <BsTriangleFill size={24} />
          </button>
          <button
            className={styles.sidebar__icon_button}
            onClick={() => addRectangle(fabricRef)}
          >
            <RiRectangleFill size={24} />
          </button>
        </section>
        <h3>Текст:</h3>
        <section className={styles.sidebar__buttons}>
          <button
            className={styles.sidebar__icon_button}
            onClick={() => addText(fabricRef)}
          >
            <MdOutlineTextIncrease size={24} />
          </button>
        </section>
        <h3>Изображения:</h3>
        <section className={styles.sidebar__buttons}>
          <ImageButton
            className={styles.sidebar__icon_button}
            fabricRef={fabricRef}
            src="/react.svg"
          />
          <ImageButton
            className={styles.sidebar__icon_button}
            fabricRef={fabricRef}
            src="/vite.svg"
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
            src="/pikachu.gif"
          />
          <ImageButton
            className={styles.sidebar__icon_button}
            fabricRef={fabricRef}
            src="/doggy.jpg"
          />
        </section>
        <h3>Инструменты:</h3>
        <section className={styles.sidebar__buttons}>
          <input
            className={styles.sidebar__color_input}
            type="color"
            value={selectedColor}
            onChange={(e) =>
              handleCanvasColorChange(
                e.target.value,
                fabricRef,
                setSelectedColor
              )
            }
          />
          <button
            className={styles.sidebar__icon_button}
            onClick={() => handleSaveCanvas(fabricRef, setCanvasSvg)}
          >
            <FaSave size={24} />
          </button>
          <button
            className={styles.sidebar__icon_button}
            onClick={() => handleDeleteCanvas(fabricRef)}
          >
            <FaDeleteLeft size={24} />
          </button>
          <button
            className={styles.sidebar__icon_button}
            onClick={() => handleResetZoomCanvas(fabricRef)}
          >
            <TbZoomCancelFilled size={24} />
          </button>
          <button
            className={styles.sidebar__icon_button}
            onClick={handleClearCanvas}
          >
            <FaTrash size={24} color="#ff3333" />
          </button>
        </section>
      </aside>
      <ModalSVG text={canvasSvg} handleClose={() => setCanvasSvg('')} />
    </>
  );
};
