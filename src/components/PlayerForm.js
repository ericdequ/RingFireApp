import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PlayerForm(props) {
  const [name, setName] = React.useState('');
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleSubmit = () => {
    if (name.trim() !== '') {
      props.onAddPlayer(name);
      setName('');
      animateButton();
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const buttonAnimatedStyle = {
    transform: [{ scale: buttonScale }],
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
      <Animated.View style={[styles.addButton, buttonAnimatedStyle]}>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.addButtonContent}>
            <MaterialIcons name="person-add" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>Add player</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 5,
  },
});