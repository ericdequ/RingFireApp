import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Dialog, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
});

const deepEqual = useCallback((obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}, []);

function RuleEditDialog({ visible, onDismiss, onSave, rule }) {
  const [editedRule, setEditedRule] = useState(rule);

  useEffect(() => {
    if (!deepEqual(editedRule, rule)) {
      setEditedRule(rule);
    }
  }, [rule, editedRule]);

  const handleSave = () => {
    onSave(editedRule);
    setEditedRule('');
  };

  return (
    <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
    <Dialog.Title>Edit Rule</Dialog.Title>
    <Dialog.Content>
    <View style={styles.inputContainer}>
    <TextInput
    label="Rule"
    value={editedRule}
    onChangeText={(text) => setEditedRule(text)}
    multiline
    />
    </View>
    </Dialog.Content>
    <Dialog.Actions>
    <Button onPress={onDismiss}>Cancel</Button>
    <Button onPress={handleSave}>Save</Button>
    </Dialog.Actions>
    </Dialog>
    </Portal>
    );
    }
    
    export default RuleEditDialog;