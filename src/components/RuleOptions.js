import React from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Button, Text, Portal, Dialog, RadioButton, Card } from 'react-native-paper';
import { rules } from '../utils/rules';
import RuleEditDialog from './RuleEditDialog';

const styles = StyleSheet.create({
  ruleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ruleDescription: {
    marginLeft: 40,
    marginBottom: 5,
  },
  editButton: {
    marginLeft: 'auto',
  },
  cardContainer: {
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

function RuleOptions({ visible, onDismiss, onSelect, selectedRules, onUpdateRules }) {
  const [expandedRules, setExpandedRules] = React.useState(null);
  const [editDialogVisible, setEditDialogVisible] = React.useState(false);
  const [editingRule, setEditingRule] = React.useState(null);

  // Animation values
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const cardAnimatedValue = React.useRef(new Animated.Value(0)).current;

  // Animation configs
  const animationConfig = {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  };

  // Animate the rule options when the dialog becomes visible
  React.useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, animationConfig).start();
    }
  }, [visible]);

  // Handle editing a rule
  const handleEditRule = (ruleSet, ruleIndex) => {
    setEditingRule({ ruleSet, ruleIndex });
    setEditDialogVisible(true);
  };

  // Handle saving an edited rule
  const handleSaveRule = (newRule) => {
    onUpdateRules(editingRule.ruleSet, editingRule.ruleIndex, newRule);
    setEditDialogVisible(false);
  };

  // Handle expanding/collapsing rule details
  const handleExpand = (ruleSet) => {
    if (expandedRules === ruleSet) {
      setExpandedRules(null);
    } else {
      setExpandedRules(ruleSet);
      Animated.timing(cardAnimatedValue, animationConfig).start();
    }
  };

  // Animated styles
  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const cardAnimatedStyle = {
    opacity: cardAnimatedValue,
    transform: [
      {
        scale: cardAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Select rule set</Dialog.Title>
        <Dialog.ScrollArea>
          <Animated.ScrollView
            contentContainerStyle={{ paddingHorizontal: 24 }}
            style={animatedStyle}
          >
            {Object.keys(rules).map((ruleSet) => (
              <View key={ruleSet}>
                <View style={styles.ruleOption}>
                  <RadioButton
                    value={ruleSet}
                    status={selectedRules === rules[ruleSet] ? 'checked' : 'unchecked'}
                    onPress={() => onSelect(rules[ruleSet])}
                  />
                  <Text onPress={() => onSelect(rules[ruleSet])}>{ruleSet}</Text>
                  <Button onPress={() => handleExpand(ruleSet)} style={styles.editButton}>
                    {expandedRules === ruleSet ? 'Hide' : 'Show'}
                  </Button>
                </View>
                {expandedRules === ruleSet && (
                  <Animated.View style={cardAnimatedStyle}>
                    {rules[ruleSet].map((rule, index) => (
                      <Card key={index} style={styles.cardContainer}>
                        <Card.Content>
                          <Text>{rule}</Text>
                        </Card.Content>
                        <Card.Actions>
                          <Button onPress={() => handleEditRule(ruleSet, index)}>Edit</Button>
                        </Card.Actions>
                      </Card>
                    ))}
                  </Animated.View>
                )}
              </View>
            ))}
          </Animated.ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
      <RuleEditDialog
        visible={editDialogVisible}
        onDismiss={() => setEditDialogVisible(false)}
        onSave={handleSaveRule}
        rule={editingRule && rules[editingRule.ruleSet][editingRule.ruleIndex]}
      />
    </Portal>
  );
}

export default RuleOptions;