import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value) {
      ImageService.getPhotos(value, page).then(({ photos, totalResults }) =>
        this.setState(prev => ({ images: [...prev.images, ...photos] }))
      );
    }
  }

  onSubmit = value => {
    this.setState({ value });
  };

  render() {
    console.log(this.state.images);
    return (
      <>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <SearchForm onSubmit={this.onSubmit} />
      </>
    );
  }
}
