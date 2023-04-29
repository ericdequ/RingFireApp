import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-paper';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import { rules } from '../utils/rules';
import { Appbar } from 'react-native-paper';
import { Icon } from 'react-native-elements';

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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Ring of Fire</Text>
        </View>
        <PlayerForm onAddPlayer={handleAddPlayer} />
        <PlayerList players={players} />
        <View style={styles.buttonContainer}>
          <Button icon="play" mode="contained" onPress={handleStartGame} style={styles.startGameButton}>
            Start game
          </Button>
          <Icon
            name="cog"
            type="font-awesome"
            color="#FFF"
            onPress={() => console.log('Edit rules')}
            containerStyle={styles.editRulesButton}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startGameButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 120,
  },
  editRulesButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    padding: 10,
  },
});
