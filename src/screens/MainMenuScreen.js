import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { Button, Text, Portal, Dialog, RadioButton } from 'react-native-paper';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import { rules } from '../utils/rules';
import { Icon } from 'react-native-elements';
import RuleOptions from '../components/RuleOptions';

export default function MainMenuScreen(props) {
  const [players, setPlayers] = React.useState([]);
  const [selectedRules, setSelectedRules] = React.useState(rules.Standard);
  const [showRuleOptions, setShowRuleOptions] = React.useState(false);

  const handleAddPlayer = (name) => {
    setPlayers([...players, { name }]);
  };

  const handleStartGame = () => {
    props.navigation.navigate('Game', { selectedRules, players });
  };

  const toggleRuleOptions = () => {
    setShowRuleOptions(!showRuleOptions);
  };

  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backgroundImage} resizeMode='cover'>
      
      <View style={styles.container}>
        <PlayerForm onAddPlayer={handleAddPlayer} />
        <PlayerList players={players} />
        <View style={styles.buttonContainer}>
          <Button
            icon="play"
            mode="contained"
            onPress={handleStartGame}
            style={[styles.startGameButton, players.length === 0 && styles.startGameButtonDisabled]}
            disabled={players.length === 0}
          >
            Start game
          </Button>
          {players.length === 0 && <Text style={styles.addPlayersText}>Add players</Text>}
          <TouchableOpacity onPress={toggleRuleOptions} style={styles.editRulesButton}>
            <Icon name="cog" type="font-awesome" color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      {
        <RuleOptions
          visible={showRuleOptions}
          onDismiss={toggleRuleOptions}
          onSelect={(selected) => {
            setSelectedRules(selected);
            toggleRuleOptions();
          }}
          selectedRules={selectedRules}
          onUpdateRules={(ruleSet, ruleIndex, newRule) => {
            const newRules = [...ruleSet];
            newRules[ruleIndex] = newRule;
            setSelectedRules(newRules);
          }}
        />
      }
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
  blur: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
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
  startGameButtonDisabled: {
    backgroundColor: '#1E90FF80',
  },
  addPlayersText: {
    color: 'red',
    marginLeft: 5,
    fontSize: 16,
    },
    editRulesButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    padding: 10,
    },
    });
