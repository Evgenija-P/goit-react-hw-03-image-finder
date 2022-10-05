import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
// import axios from 'axios';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    items: [],
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
