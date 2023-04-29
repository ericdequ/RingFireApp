import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlayerList(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players:</Text>
      {props.players.map((player) => (
        <Text key={player.name} style={styles.playerName}>{player.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF',
  },
  playerName: {
    fontSize: 16,
    color: '#FFF',
  },
});
