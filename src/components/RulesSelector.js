import React from 'react';
import { View, Text} from 'react-native';
import { Picker, Item as PickerItem } from '@react-native-community/picker';


export default function RulesSelector(props) {
  return (
    <View>
      <Text>Select game rules:</Text>
      <Picker selectedValue={props.rules[0]} onValueChange={props.onChange}>
      {props.rules.map((rule) => (
  <PickerItem key={rule} label={rule} value={rule} />
))}
      </Picker>
    </View>
  );
}
