import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    query: '',
  };

  onForm = ({ text }) => {
    this.setState({ query: text });
    console.log({ text });
  };

  render() {
    return (
      <div>
        <Searchbar onForm={this.onForm} />
        <ImageGallery query={this.state.query} />

        <ToastContainer transition={Flip} />
      </div>
    );
  }
}
