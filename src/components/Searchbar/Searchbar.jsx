import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import {
  SearchHeader,
  SearchForm,
  SearchButton,
  ButtoTitle,
  Input,
} from './Searchbar.styled';

const DEFAULT_STATE = {
  text: '',
};

export class Searchbar extends Component {
  state = { ...DEFAULT_STATE };

  handleChange = e => {
    this.setState({ text: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.text.trim() === '') {
      toast.error('Введите текст запроса!', { position: 'top-center' });
      return;
    }

    this.props.onForm(this.state);
  };

  reset = () => {
    this.setState({ ...DEFAULT_STATE });
  };

  render() {
    const { text } = this.state;
    const id = nanoid(3);

    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit" onClick={this.props.onSearch}>
            <ButtoTitle>Search</ButtoTitle>
          </SearchButton>

          <Input
            type="text"
            name="text"
            value={text}
            id={id}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func,
  onForm: PropTypes.func.isRequired,
};
