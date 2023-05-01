import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
  const cardImage = props.card
    ? getCardImage(props.card.rank, props.card.suit)
    : cardImages['card-back'];

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.cardContainer}>
        <Image source={cardImage} style={styles.cardImage} resizeMode='contain' />
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
  },
});
