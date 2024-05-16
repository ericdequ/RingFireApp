import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, Text, Animated } from 'react-native';
import { Card } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginBottom: 21,
  },
  playerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 23,
  },
  playerTitle: {
    padding: 15,
    fontSize: 21,
  },
  emojiIcon: {
    fontSize: 33,
    paddingRight: 9,
  },
});

const emojis = ['🚀', '🐼', '🍻', '🧙‍♂️', '🦄', '🧟‍♀️', '🧿', '♋', '🍕', '🏖️', '🏄', '🌈', '🎮', '🧛', '🅿️', '🧞‍♂️', '🧟‍♀️'];

function PlayerList({ players }) {
  const animatedValues = useRef(players.map(() => new Animated.Value(0))).current;

  React.useEffect(() => {
    Animated.stagger(100, animatedValues.map((value) =>
      Animated.timing(value, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    )).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {players.map((player, index) => {
        const translateY = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        });

        return (
          <Animated.View
            key={index}
            style={{
              opacity: animatedValues[index],
              transform: [{ translateY }],
            }}
          >
            <Card style={styles.playerCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.emojiIcon, { transform: [{ rotate: `${Math.random() * 360}deg` }] }]}>
                  {emojis[Math.floor(Math.random() * emojis.length)]}
                </Text>
                <Text style={styles.playerTitle}>{player.name}</Text>
              </View>
            </Card>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}

export default PlayerList;