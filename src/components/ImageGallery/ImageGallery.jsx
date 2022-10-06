import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader';
import { List } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    items: null,
    page: 1,
    perPage: 12,
    isLoading: false,
    error: null,
    largeImageURL: '',
    tags: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, perPage } = this.state;

    const url = `https://pixabay.com/api/`;
    const API_KEY = `key=29432031-54944c319385602ed128077f3`;
    const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ items: [] });
    }

    if (prevPage !== currentPage || prevQuery !== nextQuery) {
      this.setState({ isLoading: true });
      try {
        const response = await axios.get(
          `${url}?${API_KEY}&q=${nextQuery}&${urlOptions}`
        );
        this.setState(state =>
          state.items
            ? {
                items: [...state.items, ...response.data.hits],
              }
            : { items: response.data.hits, page: 1 }
        );
        this.props.modalImage(this.state.items);
      } catch (error) {
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
    const { isLoading, items, page } = this.state;
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
        {items && <Button page={page} onClickButton={this.onClick} />}
      </div>
    );
  }
}
