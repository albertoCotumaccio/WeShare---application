import React, {useState} from 'react'; //keep track of username
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../context';
import Logo from '../../../assets/images/logo_no_text.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { isValidObjField, updateError, isValidEmail } from '../../../Utils/methods';


const SignInScreen = ( {navigation} ) => {
    const { signIn } = React.useContext(AuthContext);
    const {height} = useWindowDimensions();


    const [email, setEmail] = useState(''); //at the begin is empty string
    const [password, setPassword] = useState(''); //at the begin is empty string

    const userInfo = {
        email,
        password
    }

    const [error, setError] = useState('');

    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    const OnForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }
    
    const OnSignUpPressed = () => {
        navigation.navigate('SignUp');
    } 


    const isValidForm = () => {
        if(!isValidObjField(userInfo)) return updateError('Required all the fields', setError)

        if(!isValidEmail(email)) return updateError('Invalid email', setError)

        if(!password.trim() | password.length < 5) return updateError('Password is too short', setError)
    
    return true;
    }

    const validateFields = () => {
        if(isValidForm()) {
            signIn();
        }}


    return (
        <ScrollView showVerticalScrollIndicator={false}>
            <View style={styles.root}>
                    
                <Image source={Logo} styles={styles.logo, {height: height * 0.3}} resizeMode="contain"  
                />

                    <Text style={[styles.title]}>WELCOME</Text>

                    {error ? (
                        <Text style={styles.error_text}>
                            {error}
                        </Text>
                    ) : null}
        
          
        <CustomInput    //EMAIL
          value = {email}
          setValue = {setEmail}
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

        
                <CustomButton //BOTTONE LOGIN
                    text= "Login"
                    onPress= { () => validateFields() } 
                />


                <CustomButton   //BOTTONE FORGET PASSWORD
                    text= "Forgot password?"
                    onPress={OnForgotPasswordPressed}
                    type="TERTIARY"
                />

                
                <SocialSignInButtons    //BOTTONE GOOGLE

                />
                
                
                <CustomButton //BOTTONE VAI ALLA REGISTRAZIONE
                    text= "Don't have an account yet? Sign Up"
                    onPress={OnSignUpPressed}
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
    logo: { //responsive
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    }, 
    title: {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 35,
        padding: 30,
        color: 'white'
      },
    error_text: {
        color:'red',
        fontSize:18,
        textAlign: 'center',
    }, 
});


export default SignInScreen;