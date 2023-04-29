import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
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
    props.navigation.navigate('Game', { selectedRules });
  };

  const toggleRuleOptions = () => {
    setShowRuleOptions(!showRuleOptions);
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
          <TouchableOpacity onPress={toggleRuleOptions} style={styles.editRulesButton}>
            <Icon name="cog" type="font-awesome" color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <RuleOptions
        visible={showRuleOptions}
        onDismiss={toggleRuleOptions}
        onSelect={(selected) => {
          setSelectedRules(selected);
          toggleRuleOptions();
        }}
        selectedRules={selectedRules}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
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
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
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
    position: 'absolute',
    bottom: 20,
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
    ruleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    });
