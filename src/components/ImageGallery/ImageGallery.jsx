import React, { Component } from 'react';
import axios from 'axios';
import { MagnifyingGlass } from 'react-loader-spinner';

import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    items: null,
    page: 1,
    perPage: 12,
    isLoading: false,
    error: null,
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
        console.log(this.state.items);
      } catch (error) {
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onClick = page => {
    this.setState({ page });
    console.log(page);
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
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
