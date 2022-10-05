import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

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
    this.reset();
  };

  reset = () => {
    this.setState({ ...DEFAULT_STATE });
  };

  render() {
    const { text } = this.state;
    const id = nanoid(3);

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className="button"
            onClick={this.props.onSearch}
          >
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name="text"
            value={text}
            id={id}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
