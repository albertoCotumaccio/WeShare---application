import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function GeneralInput({
  value,
  setValue,
  label,
  inputType,
  keyboardType,
  fieldButtonLabel,
}) {
  return (

    <View> 
      <Text style={{fontSize: 18, fontWeight: '500'}}> {label} </Text>
    

    <View style={{
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 6,
        marginBottom:15
      }}>
        
      
      
        
        <TextInput
          value = {value}
          onChangeText = {setValue}
          placeholder={label}
          keyboardType={keyboardType}
        />


      
    </View>
    </View>
  );
}