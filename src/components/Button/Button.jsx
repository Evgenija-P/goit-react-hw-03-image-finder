import React from 'react';

export const Button = ({ page, onClickButton }) => {
  console.log(page);
  return (
    <button type="button" onClick={() => onClickButton((page = page + 1))}>
      Load more
    </button>
  );
};
