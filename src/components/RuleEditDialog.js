import React from 'react';
import { View } from 'react-native';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';

function RuleEditDialog({ visible, onDismiss, onSave, rule }) {
  const [editedRule, setEditedRule] = React.useState('');
  const [hasStartedEditing, setHasStartedEditing] = React.useState(false);

  React.useEffect(() => {
    if (!hasStartedEditing) {
      setEditedRule(rule || '');
    }
  }, [rule, hasStartedEditing]);

  const handleSave = () => {
    onSave(editedRule);
    setHasStartedEditing(false);
  };

  const handleChangeText = (text) => {
    setEditedRule(text);
    setHasStartedEditing(true);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Edit Rule</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Rule"
            value={editedRule}
            onChangeText={handleChangeText}
            multiline
          />
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
