import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';

function RuleEditDialog({ visible, onDismiss, onSave, rule }) {
  const [editedRule, setEditedRule] = React.useState('');
  const [hasStartedEditing, setHasStartedEditing] = React.useState(false);
  const [dialogOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (!hasStartedEditing) {
      setEditedRule(rule || '');
    }
  }, [rule, hasStartedEditing]);

  React.useEffect(() => {
    if (visible) {
      Animated.timing(dialogOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, dialogOpacity]);

  const handleSave = () => {
    onSave(editedRule);
    setHasStartedEditing(false);
    closeDialog();
  };

  const handleChangeText = (text) => {
    setEditedRule(text);
    setHasStartedEditing(true);
  };

  const closeDialog = () => {
    Animated.timing(dialogOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  return (
    <Portal>
      <Animated.View style={[styles.dialogContainer, { opacity: dialogOpacity }]}>
        <Dialog visible={visible} onDismiss={closeDialog}>
          <Dialog.Title>Edit Rule</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Rule"
              value={editedRule}
              onChangeText={handleChangeText}
              multiline
              style={styles.textInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeDialog}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Animated.View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default RuleEditDialog;