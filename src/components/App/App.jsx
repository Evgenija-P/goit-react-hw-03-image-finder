import React, { Component } from 'react';
import axios from 'axios';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    items: [],
    page: 1,
    perPage: 12,
    query: '',
  };

  // async componentDidMount() {
  // }

  onForm = ({ text }) => {
    this.setState({ query: text });
    console.log({ text });
  };

  onSearch = async () => {
    const { page, perPage, query } = this.state;
    const url = `https://pixabay.com/api/`;
    const API_KEY = `key=29432031-54944c319385602ed128077f3`;
    const urlOptions = `image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
    try {
      const response = await axios.get(
        `${url}?${API_KEY}&q=${query}&${urlOptions}`
      );
      this.setState({ items: response.data.hits });
      console.log(response.data.hits);
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <Searchbar onForm={this.onForm} onSearch={this.onSearch} />
        <ImageGallery></ImageGallery>
      </div>
    );
  }
}
