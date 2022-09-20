import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions,ActivityIndicator } from 'react-native';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/logo_no_text.png';

const SplashScreen = ({navigation}) => {

    const {height, width} = useWindowDimensions();


    return (
        <View style={styles.container}>
           <Image source={Logo} styles={styles.logo} resizeMode="cover"  
                />

            <Text style={[styles.title]}>WE SHARE</Text>


                <ActivityIndicator size="large" color="black" />
                    
        
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center', 
        'alignItems':'center',
        backgroundColor: '#d4c1c1' 
    },
    logo: { //responsive
        flex:1
    }, 
    title: {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 35,
        padding: 30,
        color: 'white'
      },

});


export default SplashScreen;