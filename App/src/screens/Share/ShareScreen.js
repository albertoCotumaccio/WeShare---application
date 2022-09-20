import React, {useEffect} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import share_button from '../../../assets/images/share_button.png';
import share_devices from '../../../assets/images/share_devices.png';



const {width, height} = Dimensions.get("window");

const SHARE_BUTTON_SIZE = width * 0.5;


const scale = new Animated.Value(1);
const pusle_animation = Animated.loop(Animated.sequence([Animated.timing(scale, {toValue: 1.15, duration: 1000, useNativeDriver: true}), Animated.timing(scale, {toValue: 1, duration: 1000, useNativeDriver: true})]));

const press_in_animation = Animated.loop(Animated.sequence([Animated.timing(scale, {toValue: 0.8, duration: 1000, useNativeDriver: true}), Animated.timing(scale, {toValue: 0.75, duration: 1000, useNativeDriver: true})]))



const ShareScreen = ({navigation, set_listening}) => {
    useEffect(() => {
        pusle_animation.start();
    }, [])

    const onPressShare = () => {
        //console.log("Share Pressed"); 
        navigation.navigate("Listening");
        //set_listening(true);
        set_listening = true;
    }

    const onPressInShare = () => {
        //console.log("Share Pressed In")
        pusle_animation.stop();
        press_in_animation.reset();
        press_in_animation.start();
    }

    const onPressOutShare = () => {
        //console.log("Share Pressed Out")
        press_in_animation.stop();
        pusle_animation.reset();
        pusle_animation.start();
    }



    return (
        <ScrollView style={[styles.container]} showVerticalScrollIndicator={false}>
                <Text style={[styles.title]}>Share your contact</Text>

                <View>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: "center"}} activeOpacity={1} onPress={onPressShare} onPressIn={onPressInShare} onPressOut={onPressOutShare}>
                
                            <Animated.View style={[styles.share_button_container, {transform: [{scale}]}]} />

                                    <Image source={share_button} style={{width: SHARE_BUTTON_SIZE, height: SHARE_BUTTON_SIZE, borderRadius: SHARE_BUTTON_SIZE}}  />
              
                    </TouchableOpacity>

                        <Text style = {styles.text}>Bring devices together to share your contact </Text>

                        <Image source={share_devices} style={styles.share_devices} resizeMode="contain" resizeMethod="resize"   />
                </View>
    
                

        </ScrollView>
    );
};



const styles = StyleSheet.create({
    title: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 35,
    marginTop:30,
    padding: 30,
    color: 'white'
  },
  share_devices: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',  
    marginTop: 5
},
    container: {
        flex: 1,
        position: "relative"
    },
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 40,
        color: '#3F3D56',
        padding: 30,
      },
    share_button_container: {
        position: "absolute",
        top: 1,
        width: SHARE_BUTTON_SIZE,
        height: SHARE_BUTTON_SIZE,
        borderRadius: SHARE_BUTTON_SIZE,
        backgroundColor: "white",
    },
});


export default ShareScreen;