import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlayerList(props) {
  return (
    <View style={styles.container}>
      {props.players.map((player, index) => (
        <View key={player.name} style={[styles.playerCard, { backgroundColor: `rgba(0, 0, 0, ${0.8 - index * 0.1})` }]}>
          <Text style={styles.playerName}>{player.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  playerCard: {
    borderRadius: 20,
    padding: 10,
    width: '80%',
    marginBottom: 5,
  },
  playerName: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});
