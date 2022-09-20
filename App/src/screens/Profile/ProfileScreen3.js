import React, {useState} from 'react';
import {useRoute} from "@react-navigation/native";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import GeneralInput from '../../components/GeneralInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';

export default function ProfileScreen3({navigation}) {
    
    const route = useRoute();
    return(
      <Text style={{marginTop:100}}>{route.params.id}</Text>
    )
    
}

const styles = StyleSheet.create({
    root: {
        //alignItems: 'center',
        //padding: 20,
    },
    title: {
      paddingTop: 30,
      fontWeight: '700',
      color: 'white',
      fontSize: 30,
      textAlign: 'center'
      //lineHeight: 69, 
    },
    imageView:{
      flexDirection: 'row',
      //padding: 30,
    },
    profileImage:{
      width: '35%',
      maxWidth: 300,
      maxHeight: 200,
    },
    changeImageButton:{
      width: '40%',
      height: '20%',
      //padding: 15,
      //marginVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6, 
      backgroundColor: 'gainsboro',
      marginLeft: 40,
      marginTop: 80,
    },
    inputWrapper:{
      //flex:1,
      //padding:15,
      marginTop:70,
      justifyContent:'center',
    },
    input:{
      flexDirection: 'row',
      borderRadius: 10,
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 6,
      marginBottom:15
    }
    
  });