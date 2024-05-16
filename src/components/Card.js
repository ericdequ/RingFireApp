import React, { useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import cardImages from '../assets/images/cards_1/cardImage';

function getCardImage(rank, suit) {
  const imageKey = `${rank}_of_${suit}`;
  if (cardImages[imageKey]) {
    return cardImages[imageKey];
  } else {
    console.error(`Card image not found for: ${imageKey}`);
    return cardImages['card-back'];
  }
}

export default function Card(props) {
  const cardImage = props.card ? getCardImage(props.card.rank, props.card.suit) : cardImages['card-back'];
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props.card) {
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [props.card, flipAnimation]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onPress();
    });
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      { rotateY: frontInterpolate },
      { scale: cardScale },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      { rotateY: backInterpolate },
      { scale: cardScale },
    ],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.cardImage, frontAnimatedStyle]}>
          <Image source={cardImage} style={styles.cardImage} resizeMode='contain' />
        </Animated.View>
        <Animated.View style={[styles.cardImage, styles.cardBack, backAnimatedStyle]}>
          <Image source={cardImages['card-back']} style={styles.cardImage} resizeMode='contain' />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardImage: {
    width: 120,
    height: 180,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
  },
});