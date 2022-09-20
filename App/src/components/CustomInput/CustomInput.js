import React from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function InputField({
  value,
  setValue,
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  secureTextEntry = false,
  
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          value = {value}
          onChangeText = {setValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry = {secureTextEntry}
          value = {value}
          
        />
      ) : (
        <TextInput
          value = {value}
          onChangeText = {setValue}
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}