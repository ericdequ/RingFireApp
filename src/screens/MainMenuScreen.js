import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { Button, Text, Portal, Dialog, RadioButton } from 'react-native-paper';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import { rules } from '../utils/rules';
import { Icon } from 'react-native-elements';
import RuleOptions from '../components/RuleOptions';
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function MainMenuScreen(props) {
  const [players, setPlayers] = React.useState([]);
  const [selectedRules, setSelectedRules] = React.useState(rules.Standard);
  const [showRuleOptions, setShowRuleOptions] = React.useState(false);
  const [confettiReady, setConfettiReady] = React.useState(false);
  const confettiRef = React.useRef(null);

  const handleAddPlayer = (name) => {
    setPlayers([...players, { name }]);
  };

  const handleStartGame = () => {
    if (confettiReady) {
      confettiRef.current.start();
    }
    props.navigation.navigate('Game', { selectedRules, players });
  };

  const toggleRuleOptions = () => {
    setShowRuleOptions(!showRuleOptions);
  };

  React.useEffect(() => {
    if (players.length > 0) {
      setConfettiReady(true);
    }
  }, [players]);

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
            <LottieView
              source={require('../assets/animations/cog.json')}
              style={styles.cogAnimation}
              autoPlay
              loop
            />
          </TouchableOpacity>
        </View>
      </View>
      {showRuleOptions && (
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
      )}
      {confettiReady && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={false}
          ref={confettiRef}
        />
      )}
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
  cogAnimation: {
    width: 30,
    height: 30,
  },
});