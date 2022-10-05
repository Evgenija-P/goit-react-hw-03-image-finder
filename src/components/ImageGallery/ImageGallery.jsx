import React, { Component } from 'react';
import axios from 'axios';

import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    items: null,
    page: 1,
    perPage: 12,
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
    // const prevItems = prevState.items;

    if (prevPage !== currentPage || prevQuery !== nextQuery) {
      try {
        const response = await axios.get(
          `${url}?${API_KEY}&q=${nextQuery}&${urlOptions}`
        );
        this.setState(state =>
          state.items
            ? {
                items: [...state.items, ...response.data.hits],
              }
            : { items: response.data.hits }
        );
        console.log(this.state.items);
      } catch (error) {}
    }
  }

  onClick = page => {
    this.setState({ page: page + 1 });
    console.log(page);
  };

  render() {
    return (
      <div>
        {this.state.items && (
          <ul className="gallery">
            <span>{this.props.query}</span>

            {this.state.items.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </ul>
        )}
        {this.state.items && (
          <Button page={this.state.page} onClickButton={this.onClick} />
        )}
      </div>
    );
  }
}
