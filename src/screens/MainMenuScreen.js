import React from 'react';
import { View, Button, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import RulesSelector from '../components/RulesSelector';
import { rules } from '../utils/rules';

export default function MainMenuScreen(props) {
  const [players, setPlayers] = React.useState([]);
  const [selectedRules, setSelectedRules] = React.useState(rules.Standard);

  const handleAddPlayer = (name) => {
    setPlayers([...players, { name }]);
  };

  const handleStartGame = () => {
    props.navigation.navigate('Game', { selectedRules });
  };

  
  
  

  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backgroundImage} resizeMode='cover'>
      <View style={styles.container}>
        <PlayerForm onAddPlayer={handleAddPlayer} />
        <PlayerList players={players} />
        <RulesSelector rules={Object.keys(rules)} onChange={(value) => setSelectedRules(rules[value])} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startGameButton} onPress={handleStartGame}>
            <Text style={styles.shuffleButtonText}>Start game</Text>
          </TouchableOpacity>
          <Button title="Start game" onPress={handleStartGame} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shuffleButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  shuffleButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  editRulesButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editRulesButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  startGameButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center',
  },
});
