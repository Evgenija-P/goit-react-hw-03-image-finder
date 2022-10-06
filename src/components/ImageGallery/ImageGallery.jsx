import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader';
import { List } from './ImageGallery.styled';
import { toast } from 'react-toastify';
import { fetchImage } from '../api';

export class ImageGallery extends Component {
  state = {
    items: null,
    page: 1,
    perPage: 12,
    isLoading: false,
    largeImageURL: '',
    tags: '',
    showButton: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, perPage } = this.state;

    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ items: [], page: 1 });
    }

    if (prevPage !== currentPage || prevQuery !== nextQuery) {
      this.setState({ isLoading: true });
      try {
        const images = await fetchImage(page, perPage, nextQuery);
        this.setState(state =>
          state.items
            ? {
                items: [...state.items, ...images],
                showButton: true,
              }
            : { items: images }
        );
      } catch {
        toast.error('Oops, something went wrong. Repeat one more time!');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onClick = page => {
    this.setState({ page });
  };

  onClickImage = ({ largeImageURL, tags }) => {
    this.setState({ largeImageURL, tags });
    this.props.modalImage({ largeImageURL, tags });
    this.props.toggleModal();
  };

  render() {
    const { isLoading, items, page, showButton } = this.state;
    return (
      <div>
        {isLoading && <Loader />}
        {items && (
          <List>
            {items.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
                largeImageURL={largeImageURL}
                onClickImage={this.onClickImage}
              />
            ))}
          </List>
        )}
        {showButton && <Button page={page} onClickButton={this.onClick} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalImage: PropTypes.func.isRequired,
};
