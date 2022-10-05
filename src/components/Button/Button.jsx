// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими. Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения. Если массив изображений пуст, кнопка не рендерится.
import React from 'react';

export const Button = ({ page, onClickButton }) => {
  console.log(page);
  return (
    <button type="button" onClick={() => onClickButton(page)}>
      Load more
    </button>
  );
};
