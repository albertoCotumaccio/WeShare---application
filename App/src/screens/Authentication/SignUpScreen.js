import React, {useState} from 'react'; //keep track of username
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../context';
import { isValidObjField, updateError, isValidEmail } from '../../../Utils/methods';


const SignUpScreen = ({navigation}) => {
    
    const { signUp } = React.useContext(AuthContext);

    const [fullName, setFullName] = useState(''); //at the begin is empty string
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); //at the begin is empty string
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const userInfo = {
        fullName,
        email,
        password,
        passwordRepeat
    }
    
    const [error, setError] = useState('');

    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
    const [isSecureTextEntry2, setIsSecureTextEntry2] = useState(true);
    
    const isValidForm = () => {
        if(!isValidObjField(userInfo)) return updateError('Required all the fields', setError)

        if(!fullName.trim() || fullName.length < 3 ) return updateError('Invalid name', setError)

        if(!isValidEmail(email)) return updateError('Invalid email', setError)

        if(!password.trim() | password.length < 5) return updateError('Password is too short', setError)
        
        if(password !== passwordRepeat) return updateError('Password does not match', setError)
        
    return true;
    }

    const validateFields = () => {
        if(isValidForm()) {
            signUp();
        }}
    

    const onTermsOfUsePressed = () => {
        console.warn("terms"); //TO DO
    }

    const onPrivacyPressed = () => {
        console.warn("privacy"); //TO DO
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView showVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                {error ? (
                        <Text style={styles.error_text}>
                            {error}
                        </Text>
                    ) : null}
        
                <CustomInput //full name
                    value={fullName} 
                    setValue= {setFullName}
                    label={'Full Name'}
                    icon={
                        <MaterialIcons
                             name="person-outline"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                    }
                />

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

                <CustomInput        //PASSWORD
                        value = {password}
                        setValue = {setPassword}
                        label={'Password'}
                        icon={
                            <MaterialIcons
                            name="lock"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                        }
                        inputType="password"
                        secureTextEntry = {isSecureTextEntry}
                        fieldButtonLabel={isSecureTextEntry?"Show": "Hide"} 
                        fieldButtonFunction={() => {
                            setIsSecureTextEntry(prev=>!prev)
                        }}
                        />

                <CustomInput        //PASSWORD 2
                        value = {passwordRepeat}
                        setValue = {setPasswordRepeat}
                        label={'Confirm password'}
                        icon={
                            <MaterialIcons
                            name="lock"
                            size={20}
                            color="#666"
                            style={{marginRight: 5}}
                        />
                        }
                        inputType="password"
                        secureTextEntry = {isSecureTextEntry2}
                        fieldButtonLabel={isSecureTextEntry2?"Show": "Hide"} 
                        fieldButtonFunction={() => {
                            setIsSecureTextEntry2(prev=>!prev)
                        }}
                />
        
                <CustomButton //default type = Primary
                    text= "Register"
                    onPress= { () => validateFields() }
                />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our 
                        <Text style = {styles.link} onPress={onTermsOfUsePressed}>Terms of Use </Text> 
                        and <Text style = {styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text> </Text>


            <SocialSignInButtons
            />

            <CustomButton 
                    text= "already have an account? Sign In"
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
        padding: 40,
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
    link: {
        color: '#FDB075'
    },
    error_text: {
        color:'red',
        fontSize:18,
        textAlign: 'center',
    }, 
});


export default SignUpScreen;