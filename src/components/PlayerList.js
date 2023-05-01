import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
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
  return (
    <ScrollView style={styles.container}>
      {players.map((player, index) => (
        <Card key={index} style={styles.playerCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.emojiIcon}>{player.emoji}</Text>
            <Text style={styles.playerTitle}>{player.name}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

export default PlayerList;