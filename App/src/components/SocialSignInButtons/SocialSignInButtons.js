import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SocialIcon } from 'react-native-elements'


const SocialSignInButtons = () => {

    const OnSignInGoogle = () => {
        console.warn("google"); //TO DO
    }

    
    return (
        <>
            <CustomButton 
                    text= "Sign In with Google"
                    onPress={OnSignInGoogle}
                    bgColor = "#fdfefe"
                    fgColor = "#070707"
                    icon={ <SocialIcon
                                type='google'
                                style={{}}
                                /> }
                    
                />
        </>
    )
}

export default SocialSignInButtons;