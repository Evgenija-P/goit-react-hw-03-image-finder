import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.props.onClose}>
        <ModalWrapper>
          <img src={this.props.src} alt={this.props.alt} />
        </ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}
