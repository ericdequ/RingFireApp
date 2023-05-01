import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const emojis = ['🚀', '🐼', '🍻', '🧙‍♂️', '🦄', '🧟‍♀️', '🧿', '♋', '🍕', '🏖️', '🏄', '🌈', '🎮', '🧛', '🅿️', '🧞‍♂️', '🧟‍♀️'];

export default function PlayerForm(props) {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    props.onAddPlayer({ name, emoji });
    setName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter player name"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add player</Text>
      </TouchableOpacity>
    </View>
  );
}