import React, {useState} from 'react'; //keep track of username
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigation = useNavigation();


    const onSubmitPressed = () => {
        //validate
        navigation.navigate('HomeScreen');
    }
    
  
    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
        
                <CustomInput //codice ricevuto per email
                    value={code} 
                    setValue= {setCode}
                    label={'Insert the code you received to email'}
                    icon={
                        <MaterialIcons
                        name="message"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                        />
                    }
                    keyboardType="numeric"
                />

                <CustomInput //password
                    label={'Enter your new password'}
                    icon={
                        <Ionicons
                        name="ios-lock-closed-outline"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                        />
                    }
                    inputType="password" 
                    value={newPassword} 
                    setValue={setNewPassword}
                />

                <CustomButton //default type = Primary
                    text= "Submit"
                    onPress={onSubmitPressed}
                />



            <CustomButton 
                    text= "back to sign in"
                    onPress={onSignInPressed}
                    type="TERTIARY"
                />

           


            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 60,
    },
    title: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    
});


export default NewPasswordScreen;