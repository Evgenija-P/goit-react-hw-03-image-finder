import React from 'react';

export const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li className="gallery-item" key={id}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};
