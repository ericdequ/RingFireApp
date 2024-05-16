import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, ImageBackground, Animated, Easing } from 'react-native';
import Card from '../components/Card';
import { deck } from '../utils/deck';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleText: {
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontWeight: 'bold',
  },
  playerTurn: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  cardsLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  kingsLeft: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  lastKing: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});

export default function GameScreen() {
  const route = useRoute();
  const [selectedRules] = useState(route.params.selectedRules);
  const [currentCard, setCurrentCard] = useState('');
  const [players] = useState(route.params.players);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showCardBack, setShowCardBack] = useState(true);
  const [kingsLeft, setKingsLeft] = useState(4);
  const [ruleTextOpacity] = useState(new Animated.Value(0));
  const confettiRef = useRef(null);

  const handleDrawCard = useCallback(() => {
    if (showCardBack) {
      const card = deck.drawCard();
      setCurrentCard(card);
      setShowCardBack(false);
      if (card.rank === 'King') {
        setKingsLeft((prevKingsLeft) => prevKingsLeft - 1);
        if (kingsLeft === 1) {
          confettiRef.current.start();
        }
      }
      Animated.timing(ruleTextOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      setCurrentPlayer((prevCurrentPlayer) => (prevCurrentPlayer + 1) % players.length);
      setShowCardBack(true);
      Animated.timing(ruleTextOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [showCardBack, players.length, kingsLeft]);

  const ruleText = React.useMemo(() => {
    if (currentCard && !showCardBack) {
      const selectedRule = selectedRules.find(r => r.startsWith(currentCard.rank));
      return selectedRule ? selectedRule.split(' = ')[1] : '';
    }
    return '';
  }, [currentCard, showCardBack, selectedRules]);

  const cardsLeft = deck.cards.length;

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backgroundImage} resizeMode='cover'>
        <Text style={styles.cardsLeft}>Cards left: {cardsLeft}</Text>
        <Text style={[styles.kingsLeft, kingsLeft === 1 ? styles.lastKing : { color: '#FFF' }]}>Kings left: {kingsLeft}</Text>
        <Card card={showCardBack ? 'back' : currentCard} onPress={handleDrawCard} />
        {ruleText !== '' && !showCardBack && (
          <Animated.Text style={[styles.ruleText, { opacity: ruleTextOpacity }]}>{ruleText}</Animated.Text>
        )}
        <Text style={styles.playerTurn}>{showCardBack ? `${players[currentPlayer].name}'s turn to draw a card` : 'Click to continue'}</Text>
        {kingsLeft === 1 && (
          <ConfettiCannon
            count={200}
            origin={{ x: 0, y: 0 }}
            autoStart={false}
            ref={confettiRef}
          />
        )}
      </ImageBackground>
    </View>
  );
}