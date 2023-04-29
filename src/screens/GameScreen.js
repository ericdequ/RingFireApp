import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import { rules } from '../utils/rules';
import { deck } from '../utils/deck';
// import { Audio } from 'expo-av'; // Comment out this line

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleText: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  audioToggle: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default function GameScreen({ route }) {
  const [selectedRules, setSelectedRules] = useState(rules.Standard);
  const [currentCard, setCurrentCard] = useState('');
  // const [audioEnabled, setAudioEnabled] = useState(false); // Comment out this line

  const handleDrawCard = async () => {
    const card = deck.drawCard();
    setCurrentCard(card);

    // Comment out the audio functionality
    // if (audioEnabled) {
    //   const selectedRule = selectedRules.find(r => r.startsWith(card.rank));
    //   if (selectedRule) {
    //     const ruleText = selectedRule.split(' = ')[1];
    //     const soundObject = new Audio.Sound();
    //     try {
    //       await soundObject.loadAsync(
    //         { uri: `https://api.voicerss.org/?key=YOUR_API_KEY&hl=en-us&src=${ruleText}` },
    //         { shouldPlay: true }
    //       );
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
  };

  // const toggleAudio = () => { // Comment out this function
  //   setAudioEnabled(!audioEnabled);
  // };

  let ruleText = '';
  if (currentCard) {
    const selectedRule = selectedRules.find(r => r.startsWith(currentCard.rank));
    ruleText = selectedRule ? selectedRule.split(' = ')[1] : '';
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backgroundImage} resizeMode='cover'>
        <Card card={currentCard} onPress={handleDrawCard} />
        {ruleText !== '' && <Text style={styles.ruleText}>{ruleText}</Text>}
        {/* Comment out the audio toggle button */}
        {/* <TouchableOpacity onPress={toggleAudio}>
          <Text style={styles.audioToggle}>{audioEnabled ? 'Turn off audio' : 'Turn on audio'}</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
}
