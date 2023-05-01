import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDrag, useDrop } from 'react-dnd';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  ruleItem: {
    padding: 10,
  },
});

const RuleItem = ({ rule, ruleSet, ruleIndex, onEdit, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'rule',
    item: { ruleSet, ruleIndex },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'rule',
    drop: (item) => {
      onDrop(item.ruleSet, item.ruleIndex, ruleSet, ruleIndex);
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <TouchableOpacity
      ref={(node) => {
        drag(drop(node));
      }}
      style={[styles.ruleItem, { opacity }]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{rule}</Text>
        <Button onPress={() => onEdit(ruleSet, ruleIndex)} style={{ marginLeft: 'auto' }}>
          Edit
        </Button>
      </View>
    </TouchableOpacity>
  );
};

export default RuleItem;

