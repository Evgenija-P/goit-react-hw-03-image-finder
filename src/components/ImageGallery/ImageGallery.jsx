import React, { Component } from 'react';
import axios from 'axios';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    items: [],
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

    if (prevQuery !== nextQuery) {
      try {
        const response = await axios.get(
          `${url}?${API_KEY}&q=${nextQuery}&${urlOptions}`
        );
        this.setState({ items: response.data.hits });
        console.log(response.data.hits);
      } catch (error) {}
    }
  }
  render() {
    return (
      <ul className="gallery">
        <span>{this.props.query}</span>
        {this.state.items.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
        ))}
      </ul>
    );
  }
}
