import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Portal, Dialog } from 'react-native-paper';
import { Accordion } from 'react-native-collapsible';
import { rules } from '../utils/rules';

const styles = StyleSheet.create({
    ruleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    ruleHeaderText: {
      fontWeight: 'bold',
    },
    ruleContent: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    ruleText: {
      fontSize: 14,
      marginBottom: 5,
    },
  });

export default function RuleOptions({ visible, onDismiss, onSelect, selectedRules }) {
  const [activeSections, setActiveSections] = React.useState([]);

  const renderHeader = (section, _, isActive) => {
    return (
      <View style={styles.ruleHeader}>
        <Text style={styles.ruleHeaderText}>{section.title}</Text>
        <Text>{isActive ? '-' : '+'}</Text>
      </View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <View style={styles.ruleContent}>
        <FlatList
          data={Object.keys(section.content)}
          renderItem={({ item: key }) => (
            <Text style={styles.ruleText}>
              {key}: {section.content[key]}
            </Text>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  const ruleSections = Object.keys(rules).map((ruleSet) => ({
    title: ruleSet,
    content: rules[ruleSet],
  }));

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Select rule set</Dialog.Title>
        <Dialog.Content>
          <Accordion
            sections={ruleSections}
            activeSections={activeSections}
            renderContent={renderContent}
            onChange={updateSections}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};




