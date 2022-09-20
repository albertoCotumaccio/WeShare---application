import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated, Vibration, StyleSheet, Image } from 'react-native';
import FontistoIcons from "react-native-vector-icons/Fontisto";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';
import AntIcons from "react-native-vector-icons/AntDesign";
import share_button from '../../../assets/images/logo_no_text.png';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const circles = new Array(4).fill(null);
const circle_scales = circles.map(() => new Animated.Value(0));
const circle_opacities = circles.map(() => new Animated.Value(1));

const circle_animations = Animated.loop(Animated.parallel(circles.map((_, i) => {
    const circle_scale = circle_scales[i];
    const circle_opacity = circle_opacities[i];
    const delay = i * 200;

    return Animated.parallel([Animated.sequence([Animated.timing(circle_opacity, {toValue: 0, duration: 1000, delay: 2000 + delay, useNativeDriver: true}), Animated.timing(circle_opacity, {toValue: 1, duration: 0, delay: 10, useNativeDriver: true})]), Animated.sequence([Animated.timing(circle_scale, {toValue: 1.2, duration: 2000, delay, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 1, duration: 1000, delay: 0, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 0, duration: 0, delay: 0, useNativeDriver: true})])]);
})));

const big_circles = new Array(2).fill(null);
const big_circle_scales = big_circles.map(() => new Animated.Value(1));
const big_circle_opacities = big_circles.map(() => new Animated.Value(0));

const big_circle_animations = Animated.loop(Animated.parallel(big_circles.map((_, i) => {
    const circle_scale = big_circle_scales[i];
    const circle_opacity = big_circle_opacities[i];
    const delay = i * 300;

    return Animated.parallel([Animated.sequence([Animated.timing(circle_opacity, {toValue: 1, duration: 200, delay: delay, useNativeDriver: true}), Animated.timing(circle_opacity, {toValue: 0, duration: 200, delay: 1000, useNativeDriver: true})]), Animated.sequence([Animated.timing(circle_scale, {toValue: 1.75, duration: 1000, delay, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 1.7, duration: 500, delay: 0, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 1, duration: 0, delay: 0, useNativeDriver: true})])]);
})));


const reset_animation_values = () => {
    circles.forEach((_, i) => {
        circle_scales[i].setValue(0);
        circle_opacities[i].setValue(1);
    });

    big_circles.forEach((_, i) => {
        big_circle_scales[i].setValue(1);
        big_circle_opacities[i].setValue(0);
    });
}



const {width, height} = Dimensions.get("window");

const SHARE_BUTTON_SIZE = width * 0.5;
const LISTENING_SHARE_BUTTON_SIZE = SHARE_BUTTON_SIZE * 0.9;
const NAV_BUTTONS_SIZE = 20;

const AnimatedFontistoIcons = Animated.createAnimatedComponent(FontistoIcons);



const ListeningScreen = ({navigation, set_listening}) => {

     //const song = {name: "Song Name", artist: {}, album: {}, featuring: [], artwork: "https://cdn.dribbble.com/users/2113371/screenshots/6521709/drake_final_2x.jpg", accent_color: "#00A0FF"}
    //setTimeout(() => {set_listening(false); set_song_for_details(song); Vibration.vibrate([0, 500, 100, 300]); navigation.navigate("Contacts"); navigation.navigate("SongDetails", {discover: true});}, 8000);
    
    timer = setTimeout(() => {Vibration.vibrate([0, 500, 100, 300]); navigation.navigate("DetailShare");}, 8000);

    

    useEffect(() => {
        circle_animations.start();
        big_circle_animations.start();

       

        return () => {circle_animations.stop(); big_circle_animations.stop(); big_circle_animations.reset(); circle_animations.reset(); reset_animation_values();}
    }, [])

    const onPressShare = () => {
        //console.log("Share Pressed");
    }

    const onPressClose = () => {
        navigation.navigate("Share1");
        clearTimeout(timer);
    }



    return (
        <ScrollView style={[styles.container]} contentContainerStyle={styles.scroll_container}>
            <LinearGradient style={[styles.container, styles.home_gradient]}  colors={["rgba(212,193,193,255)", "rgba(3,2,2,255)s"]}>
                <Text style={[styles.home_text, styles.action_text]}>Make sure you have NFC ON</Text>

                <View style={[styles.Share_button_container, {marginTop: 100}]}>
                    <TouchableOpacity activeOpacity={1} style={{justifyContent: "center", alignItems: "center"}} onPress={onPressShare}>
                        {circles.map((_, i, arr) => {
                            const scale = circle_scales[i];
                            const opacity = circle_opacities[i];
                            const size = LISTENING_SHARE_BUTTON_SIZE * (1 + ((arr.length - i) * 0.25));
                            return (<Animated.View style={[{position: "absolute", backgroundColor: "rgba(255, 255, 255, 0.1)", width: size, height: size, borderRadius: size, opacity, transform: [{scale}]}]} key={i.toString()} />);
                        })}

                        {big_circles.map((_, i, arr) => {
                            const scale = big_circle_scales[i];
                            const opacity = big_circle_opacities[i];
                            const size = (height * 0.5) * (1 + ((arr.length - i) * 0.25));
                            return (<Animated.View style={[{position: "absolute", backgroundColor: "rgba(0,0,0,0)", borderWidth: 5, borderColor: "rgba(255, 255, 255, 0.2)", width: size, height: size, borderRadius: size, opacity, transform: [{scale}]}]} key={i.toString()} />);
                        })}
                       
                            <Animated.View style={[styles.Share_button_background, styles.listening_Share_button_background]} />
                       
                            <Image source={share_button} style={styles.listening_image} resizeMode="contain" resizeMethod="resize"  
                                />
                    
                  
                    </TouchableOpacity>
                </View>

                <View style={{position: "absolute", top: 75, left: 25}}>
                    <TouchableOpacity onPress={onPressClose}>
                        <AntIcons name="close" color="white" size={NAV_BUTTONS_SIZE} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 60,
    },
    container: {
        flex: 1,
        position: "relative"
    },
    listening_image: {
        width: LISTENING_SHARE_BUTTON_SIZE,
        height: LISTENING_SHARE_BUTTON_SIZE,
        borderRadius: LISTENING_SHARE_BUTTON_SIZE,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d4c1c1"
      },
    home_gradient: {
        // justifyContent: "center",
        alignItems: "center"
    },
    scroll_container: {
        flexGrow: 1,
    },
    home_text: {
        color: "white",
        marginTop: 100
    },
    listening_Share_button_background: {
        width: LISTENING_SHARE_BUTTON_SIZE,
        height: LISTENING_SHARE_BUTTON_SIZE,
        borderRadius: LISTENING_SHARE_BUTTON_SIZE,
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
      },
    action_text: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 75
    },
    Share_button_container: {
        position: "relative",
        marginBottom: 100
    },
    Share_button_background: {
        position: "absolute",
        top: 1,
        width: SHARE_BUTTON_SIZE,
        height: SHARE_BUTTON_SIZE,
        borderRadius: SHARE_BUTTON_SIZE,
        backgroundColor: "white",
    },
    Share_button_hole: {
        position: "absolute",
        width: SHARE_BUTTON_SIZE * 0.9,
        height: SHARE_BUTTON_SIZE * 0.9,
        borderRadius: SHARE_BUTTON_SIZE * 0.9,
        backgroundColor: "rgba(0,0,0,0)"
    },
    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
      },
});


export default ListeningScreen;