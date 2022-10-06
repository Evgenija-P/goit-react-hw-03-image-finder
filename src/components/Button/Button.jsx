import React from 'react';
import { BTN } from './Button.styled';

export const Button = ({ page, onClickButton }) => {
  return (
    <BTN type="button" onClick={() => onClickButton((page = page + 1))}>
      Load more
    </BTN>
  );
};
