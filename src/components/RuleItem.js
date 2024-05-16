import React, { useRef } from 'react';
import { Text, StyleSheet, View, Animated } from 'react-native';
import { useDrag, useDrop } from 'react-dnd';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  ruleItem: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  ruleText: {
    fontSize: 16,
  },
  editButton: {
    marginLeft: 'auto',
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

  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const opacity = isDragging ? 0.4 : 1;
  const scaleTransform = { transform: [{ scale }] };

  return (
    <TouchableOpacity
      ref={(node) => {
        drag(drop(node));
      }}
      style={[styles.ruleItem, { opacity }]}
      onPress={animateScale}
      activeOpacity={0.8}
    >
      <Animated.View style={scaleTransform}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.ruleText}>{rule}</Text>
          <Button
            onPress={() => onEdit(ruleSet, ruleIndex)}
            style={styles.editButton}
            mode="contained"
            compact
          >
            Edit
          </Button>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RuleItem;