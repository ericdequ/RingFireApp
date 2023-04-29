import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PlayerForm(props) {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    props.onAddPlayer(name);
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    flex: 1,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    padding: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
