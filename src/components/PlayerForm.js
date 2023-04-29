import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
        value={name}
        onChangeText={setName}
      />
      <Button title="Add player" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    flex: 1,
  },
});
