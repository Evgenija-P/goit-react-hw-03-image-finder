import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    page: 1,
    query: '',
  };

  onForm = ({ text }) => {
    this.setState({ query: text });
  };

  render() {
    return (
      <div>
        <Searchbar onForm={this.onForm} />
        <ImageGallery query={this.state.query} page={this.state.page} />
        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
