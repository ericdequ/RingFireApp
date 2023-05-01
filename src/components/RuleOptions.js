import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Portal, Dialog, RadioButton, Card } from 'react-native-paper';
import { rules } from '../utils/rules';
import RuleEditDialog from './RuleEditDialog'; // Importing the RuleEditDialog component

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
  },
});

function RuleOptions({ visible, onDismiss, onSelect, selectedRules, onUpdateRules }) {
  const [expandedRules, setExpandedRules] = React.useState(null);
  const [editDialogVisible, setEditDialogVisible] = React.useState(false);
  const [editingRule, setEditingRule] = React.useState(null);

  const handleEditRule = (ruleSet, ruleIndex) => {
    setEditingRule({ ruleSet, ruleIndex });
    setEditDialogVisible(true);
  };

  const handleSaveRule = (newRule) => {
    onUpdateRules(editingRule.ruleSet, editingRule.ruleIndex, newRule);
    setEditDialogVisible(false);
  };

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
                  <Button onPress={() => handleExpand(ruleSet)} style={styles.editButton}>
                    {expandedRules === ruleSet ? 'Hide' : 'Show'}
                  </Button>
                </View>
                {expandedRules === ruleSet && (
                  <View>
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
