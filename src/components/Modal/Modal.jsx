import { Backdrop } from 'components/Backdrop/Backdrop.styled';
import { Component } from 'react';

export class Modal extends Component {
  hendleEscPress = evt => {
    // if (evt.code === 'Escape') {
    //   this.props.hideModal();
    // }
    if (evt.code === 'Escape') this.props.hideModal('');
  };

  hendleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) this.props.hideModal('');
  };

  componentDidMount() {
    document.addEventListener('keydown', this.hendleEscPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.hendleEscPress);
  }

  render() {
    return (
      <Backdrop onClick={this.hendleBackdropClick}>
        {this.props.children}
      </Backdrop>
    );
  }
}
