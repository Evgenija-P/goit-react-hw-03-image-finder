import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  render() {
    return createPortal(
      <Overlay>
        <ModalWrapper>
          <img src={this.props.src} alt={this.props.alt} />
        </ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}
