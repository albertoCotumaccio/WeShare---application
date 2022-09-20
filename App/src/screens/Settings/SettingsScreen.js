import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Switch, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../../context';
import { MaterialCommunityIcons } from '@expo/vector-icons';





// funzione di sign out che va richiamata dentro la view
const SettingsScreen = ({ navigation }) => {
    const [shouldShow, SetshouldShow] = useState(false);
    const { signOut } = React.useContext(AuthContext);
    const [password, setPassword] = useState('');



    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isDarkEnabled, setIsDarkEnabled] = useState(false);


    const toggleSwitchNotification = () => {
        setIsNotificationEnabled(previous => !previous)
    }

    const toggleDark = () => {
        setIsDarkEnabled(previous => !previous)
    }


    return ( 
        <View style = { styles.root } >
        
            <Text style = {styles.title} >Settings</Text>


                    <CustomButton 
                       icon={<MaterialIcons
                                name="notifications"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />}

                        rightButton = <Switch
                                        trackColor = {{false:'#e5e5e5', true:'#56cd54'}}
                                        thumbColor = {isNotificationEnabled ? '#ffffff': "#3d4859"}
                                        onValueChange= {toggleSwitchNotification}
                                        ios_backgroundColor = '#e5e5e5'
                                        value = {isNotificationEnabled}
                                        style = {{}}
                                      />
                        type = "WHITE"
                        text = "Notification"
                        onPress = {() => null }
                    />


                    <CustomButton 
                        icon={<MaterialCommunityIcons
                                name="theme-light-dark"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />}
                        rightButton = <Switch
                                    trackColor = {{false:'#e5e5e5', true:'#56cd54'}}
                                    thumbColor = {isDarkEnabled ? '#ffffff': "#3d4859"}
                                    onValueChange= {toggleDark}
                                    ios_backgroundColor = '#e5e5e5'
                                    value = {isDarkEnabled}
                                    style = {{ }}
                                    />
                        type = "WHITE"
                        text = "Dark Mode"
                        onPress = {() => null }
                    />

            
                <CustomButton
                    icon={<MaterialCommunityIcons
                                name="form-textbox-password"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />}
                    rightButton = {<TouchableOpacity onPress={() => null}>
                                            {<MaterialIcons
                                                name="keyboard-arrow-down"
                                                size={30}
                                                color="#666"
                                                style={{}}
                                             />}
                                    </TouchableOpacity>}
                     type = "WHITE"
                    text = "Password"
                    onPress = {() => null }
                />

                            
                <CustomButton
                    icon={<MaterialCommunityIcons
                                name="logout"
                                size={20}
                                color="#666"
                                style={{marginRight: 5}}
                            />} 
                    rightButton = {<TouchableOpacity onPress={() => SetshouldShow(!shouldShow)}>
                                    {<MaterialIcons
                                        name="keyboard-arrow-down"
                                        size={30}
                                        color="#666"
                                        style={{}}
                                        />}
                                    </TouchableOpacity>}
                    type = "WHITE"
                    text = "Logout"
                    onPress = {() => SetshouldShow(!shouldShow)}
                />  
                
                {shouldShow ? (
                        <Text style = {styles.text} >Are you sure?</Text>
                            ) : null
                }

                {shouldShow ? (
                    <CustomButton 
                            text = "Yes"
                            onPress = {() => signOut()}
                    />
                        ) : null
                    } 
                    
                    
                    {shouldShow ? (
                        <CustomButton 
                            text = "No"
                            onPress = {() => SetshouldShow(!shouldShow) }
                        />
                        ) : null }


    

    </View> 
    
    
);
};


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 40,

    },
    title: {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 35,
        color: 'white'
      },
    text: {
        paddingVertical: 40

    },

});


export default SettingsScreen;