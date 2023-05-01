import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Portal, Dialog, RadioButton, ToggleButton } from 'react-native-paper';
import { rules } from '../utils/rules';

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
});

function RuleOptions({ visible, onDismiss, onSelect, selectedRules }) {
  const [expandedRules, setExpandedRules] = React.useState(null);

  const handleExpand = (ruleSet) => {
    if (expandedRules === ruleSet) {
      setExpandedRules(null);
    } else {
      setExpandedRules(ruleSet);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Select rule set</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
            {Object.keys(rules).map((ruleSet) => (
              <View key={ruleSet}>
                <View style={styles.ruleOption}>
                  <RadioButton
                    value={ruleSet}
                    status={selectedRules === rules[ruleSet] ? 'checked' : 'unchecked'}
                    onPress={() => onSelect(rules[ruleSet])}
                  />
                  <Text onPress={() => onSelect(rules[ruleSet])}>{ruleSet}</Text>
                  <ToggleButton
                    icon={expandedRules === ruleSet ? 'chevron-up' : 'chevron-down'}
                    value="expand"
                    onPress={() => handleExpand(ruleSet)}
                    style={{ marginLeft: 'auto' }}
                  />
                </View>
                {expandedRules === ruleSet && (
                  <View>
                    {rules[ruleSet].map((rule, index) => (
                      <Text key={index} style={styles.ruleDescription}>
                        {rule}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default RuleOptions;
