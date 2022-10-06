import React from 'react';
import { Item, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <Item key={id}>
      <Img
        src={webformatURL}
        alt={tags}
        width="200"
        onClick={() => onClickImage({ largeImageURL, tags })}
      />
    </Item>
  );
};
