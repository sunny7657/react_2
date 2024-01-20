import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isLoadMore: false,
    isEmpty: false,
    isError: null,
  };

  componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    if (prevState.value !== value || prevState.page !== page) {
      ImageService.getPhotos(value, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prev => ({
            images: [...prev.images, ...photos],
            isLoadMore: page < Math.ceil(total_results / 15),
          }));
        })
        .catch(error => this.setState({ isError: error.message }));
    }
  }

  onSubmit = value => {
    this.setState({
      value,
      page: 1,
      images: [],
      isLoadMore: false,
      isEmpty: false,
      isError: null,
    });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { images, isLoadMore, isEmpty, isError } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {images.map(image => (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img src={image.src.small} alt={image.alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {isLoadMore && <Button onClick={this.handleLoadMore}>Load more</Button>}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isError && <Text textAlign="center">Sorry. {isError} 😭</Text>}
      </>
    );
  }
}
