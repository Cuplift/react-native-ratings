import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View } from 'react-native';

import Star from './components/Star'

export default class TapRating extends Component {
  static defaultProps = {
    defaultRating: 3,
    reviews: [],
    count: 5,
    onFinishRating: () => console.log('Rating selected. Attach a function here.'),
    showRating: true,
    reviewColor: 'rgba(230, 196, 46, 1)',
    reviewSize: 25
  };

  constructor() {
    super()

    this.state = {
      position: 5,
      defaultRating: 0
    }
  }

  componentDidMount() {
    const { defaultRating } = this.props

    this.setState({ position: defaultRating })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.defaultRating !== prevState.defaultRating){
      return { defaultRating: nextProps.defaultRating };
   }
   else return null;
 }

 componentDidUpdate(prevProps, prevState) {
  if (prevState.defaultRating !== this.state.defaultRating) {
    this.setState({ position: this.state.defaultRating })
  }
}

  renderStars(rating_array) {
    return _.map(rating_array, (star, index) => {
      return star
    })
  }

  starSelectedInPosition(position) {
    const { onFinishRating } = this.props

    onFinishRating(position);

    this.setState({ position: position })
  }

  render() {
    const { position } = this.state
    const { count, style, reviews, showRating, reviewColor, reviewSize ,icon ,iconSelected} = this.props
    const rating_array = []

    _.times(count, index => {
      rating_array.push(
        <Star
          icon={icon}
          iconSelected={iconSelected}
          key={index}
          position={index + 1}
          starSelectedInPosition={this.starSelectedInPosition.bind(this)}
          fill={position >= index + 1}
          {...this.props}
        />
      )
    })

    return (
      <View style={styles.ratingContainer}>
        <View style={[styles.starContainer,style]}>
          {this.renderStars(rating_array)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  reviewText: {
    fontWeight: 'bold',
    margin: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
