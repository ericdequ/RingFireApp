import React, {useState, useCallback} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Portal, Dialog, RadioButton, Card } from 'react-native-paper';
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

function RuleOptions({ visible, onDismiss, onSelect, selectedRules, onUpdateRules, AllRules }) {
  const [expandedRules, setExpandedRules] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  /**
   * Opens the RuleEditDialog for editing the specified rule
   * @param {string} ruleSet - The key of the rule set where the rule is located
   * @param {number} ruleIndex - The index of the rule within the rule set
   */

  const handleEditRule = useCallback((ruleSet, ruleIndex) => {
    setEditingRule({ ruleSet, ruleIndex });
    setEditDialogVisible(true);
  }, []);
  
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
            {Object.keys(AllRules).map((ruleSet) => (
              <View key={ruleSet}>
                <View style={styles.ruleOption}>
                  <RadioButton
                    value={ruleSet}
                    status={selectedRules === AllRules[ruleSet] ? 'checked' : 'unchecked'}
                    onPress={() => onSelect(AllRules[ruleSet])}
                  />
                  <Text onPress={() => onSelect(AllRules[ruleSet])}>{ruleSet}</Text>
                  <Button onPress={() => handleExpand(ruleSet)} style={styles.editButton}>
                    {expandedRules === ruleSet ? 'Hide' : 'Show'}
                  </Button>
                </View>
                {expandedRules === ruleSet && (
                  <View>
                    {AllRules[ruleSet].map((rule, index) => (
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
        rule={editingRule && AllRules[editingRule.ruleSet][editingRule.ruleIndex]}
      />

    </Portal>
  );
}

export default RuleOptions;
