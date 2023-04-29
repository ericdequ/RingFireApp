#!/bin/bash
echo Creating project structure...
cd /c/Users/ericd/Desktop/APP/RingFireApp

mkdir src
cd src

mkdir assets
cd assets

mkdir images
mkdir fonts

cd ..
mkdir components
mkdir screens
mkdir navigation
mkdir utils

echo Creating files...
touch components/PlayerForm.js
touch components/PlayerList.js
touch components/RulesSelector.js
touch components/Card.js

touch screens/MainMenuScreen.js
touch screens/GameScreen.js

touch navigation/AppNavigator.js

touch utils/deck.js
touch utils/rules.js

echo Done! Your project has been initialized.




#!/bin/bash

echo Generating template code...

# PlayerForm.js
cat << EOF > src/components/PlayerForm.js
import React from 'react';
import { View, TextInput, Button } from 'react-native';

export default function PlayerForm(props) {
  const [name, setName] = React.useState('');

  const handleSubmit = () => {
    props.onAddPlayer(name);
    setName('');
  };

  return (
    <View>
      <TextInput
        placeholder="Enter player name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Add player" onPress={handleSubmit} />
    </View>
  );
}
EOF

# PlayerList.js
cat << EOF > src/components/PlayerList.js
import React from 'react';
import { View, Text } from 'react-native';

export default function PlayerList(props) {
  return (
    <View>
      <Text>Players:</Text>
      {props.players.map((player) => (
        <Text key={player.name}>{player.name}</Text>
      ))}
    </View>
  );
}
EOF

# RulesSelector.js
cat << EOF > src/components/RulesSelector.js
import React from 'react';
import { View, Text, Picker } from 'react-native';

export default function RulesSelector(props) {
  return (
    <View>
      <Text>Select game rules:</Text>
      <Picker selectedValue={props.rules[0]} onValueChange={props.onChange}>
        {props.rules.map((rule) => (
          <Picker.Item key={rule} label={rule} value={rule} />
        ))}
      </Picker>
    </View>
  );
}
EOF

# Card.js
cat << EOF > src/components/Card.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Card(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <Text>{props.card}</Text>
      </View>
    </TouchableOpacity>
  );
}
EOF

# MainMenuScreen.js
cat << EOF > src/screens/MainMenuScreen.js
import React from 'react';
import { View } from 'react-native';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';

export default function MainMenuScreen(props) {
  const [players, setPlayers] = React.useState([]);

  const handleAddPlayer = (name) => {
    setPlayers([...players, { name }]);
  };

  const handleStartGame = () => {
    props.navigation.navigate('Game');
  };

  return (
    <View>
      <PlayerForm onAddPlayer={handleAddPlayer} />
      <PlayerList players={players} />
      <Button title="Start game" onPress={handleStartGame} />
    </View>
  );
}
EOF

# GameScreen.js
cat << EOF > src/screens/GameScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';
import RulesSelector from '../components/RulesSelector';
import Card from '../components/Card';
import { deck } from '../utils/deck';

export default function GameScreen() {
  const [rules, setRules] = useState(['Standard']);
  const [currentCard, setCurrentCard] = useState('');

  const handleRulesChange = (value) => {
    setRules(value);
  };

  const handleDrawCard = () => {
    const card = deck.drawCard();
    setCurrentCard(card);
  };

  return (
    <View>
      <RulesSelector rules={['Standard', 'Custom']} onChange={handleRulesChange} />
      <Card card={currentCard} onPress={handleDrawCard} />
    </View>
  );
}
EOF

# AppNavigator.js
cat << EOF > src/navigation/AppNavigator.js
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainMenuScreen from '../screens/MainMenuScreen';
import GameScreen from '../screens/GameScreen';

const AppNavigator = createStackNavigator({
  MainMenu: { screen: MainMenuScreen },
  Game: { screen: GameScreen },
});

export default createAppContainer(AppNavigator);
EOF

# Modify App.js
cat << EOF > src/App.js
import React from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
EOF

echo Done! Your project has been initialized.



#!/bin/bash

echo Generating code for deck.js and rules.js...

# deck.js
cat << EOF > src/utils/deck.js
const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

export const deck = {
  cards: [],
  drawCard() {
    return this.cards.shift();
  },
  shuffle() {
    const shuffledCards = [];
    const cards = [...this.cards];
    while (cards.length > 0) {
      const index = Math.floor(Math.random() * cards.length);
      const card = cards.splice(index, 1)[0];
      shuffledCards.push(card);
    }
    this.cards = shuffledCards;
  },
  reset() {
    this.cards = [];
    for (let suit of SUITS) {
      for (let rank of RANKS) {
        this.cards.push({ suit, rank });
      }
    }
    this.shuffle();
  },
};

deck.reset();
EOF

# rules.js
cat << EOF > src/utils/rules.js
export const rules = {
  Standard: [
    '2 = You (choose someone to drink)',
    '3 = Me (you drink)',
    '4 = Floor (everyone touches the floor, last one to do so drinks)',
    '5 = Guys (all guys drink)',
    '6 = Chicks (all girls drink)',
    '7 = Heaven (point to the sky, last one to do so drinks)',
    '8 = Mate (choose someone to drink with you)',
    '9 = Rhyme (choose a word, everyone has to say a word that rhymes with it, first one who can\'t drink)',
    '10 = Categories (choose a category, everyone has to name something from that category, first one who can\'t drink)',
    'Jack = Make a rule',
    'Queen = Question Master (if you answer a question asked by the question master, you drink)',
    'King = Pour (pour some of your drink into the center cup, the person who draws the last king has to drink it)',
    'Ace = Waterfall (everyone starts drinking at the same time, and no one can stop until the person to their right stops)',
  ],
};
EOF

echo Done! Code generated for deck.js and rules.js.
