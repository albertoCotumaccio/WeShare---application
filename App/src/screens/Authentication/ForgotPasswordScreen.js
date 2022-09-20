import React, {useState} from 'react'; //keep track of username
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    const onSendPressed = () => {
        navigation.navigate('NewPassword');
    }
    
    const onResendPressed = () => {
        //send again 
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
        
                <CustomInput //email
                    value={email} 
                    setValue= {setEmail}
                    label={'Email'}
                    icon={
                        <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#666"
                        style={{marginRight: 5}}
                        />
                    }
                    keyboardType="email-address"
                />

                <CustomButton //default type = Primary
                    text= "Send"
                    onPress={onSendPressed}
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


export default ForgotPasswordScreen;