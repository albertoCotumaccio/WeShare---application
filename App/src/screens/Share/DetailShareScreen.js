import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StackActions } from "@react-navigation/native";
import share_button from "../../../assets/images/share_button.png";
import share_devices from "../../../assets/images/share_devices.png";
import CustomButton from "../../components/CustomButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CARDS from "../../data/cards";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.7;
const WIDTH = 15;

const scale = new Animated.Value(1);
const pusle_animation = Animated.loop(
  Animated.sequence([
    Animated.timing(scale, {
      toValue: 1.15,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
  ])
);

const press_in_animation = Animated.loop(
  Animated.sequence([
    Animated.timing(scale, {
      toValue: 0.8,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 0.75,
      duration: 1000,
      useNativeDriver: true,
    }),
  ])
);

const DetailShareScreen = ({ navigation, set_listening }) => {
  const num = Math.floor(0 + Math.random() * (CARDS.length - 0));
  const card = CARDS[num];

  let fieldsCount = 0;
  Object.entries(card).map(([key, value]) => {
    if (value) {
      fieldsCount = fieldsCount + 1;
      //console.log(key, value)
    }
  });

  return (
    <ScrollView
      style={{ backgroundColor: "#6a6161" }}
      showVerticalScrollIndicator={false}
    >
      <Text style={[styles.title]}>You shared the contact with:</Text>

      <View style={styles.root}>
        <View style={styles.profileCard}>
          <Image
            source={card.image}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <Text style={styles.profileName}>{card.full_name}</Text>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.info}>
            It contains <Text style={{ color: "blue" }}>{fieldsCount}</Text>{" "}
            infos
          </Text>
        </View>

        <CustomButton
          text="SAVE CONTACT"
          onPress={() => {
            navigation.navigate("Contacts1", card);
            navigation.reset({
              index: 0,
              routes: [{ name: "Share1" }],
            });
          }}
          type="CIRCLE"
          bgColor="#c9c6c6"
          rightButton={
            <MaterialCommunityIcons
              name="account-check-outline"
              size={20}
              color="green"
              style={{ marginRight: 5 }}
            />
          }
        />

        <CustomButton
          text="DISCARD"
          onPress={() => navigation.navigate("Share1")}
          type="CIRCLE"
          bgColor="#c9c6c6"
          rightButton={
            <MaterialCommunityIcons
              name="delete-forever"
              size={20}
              color="#fe6464"
              style={{ marginRight: 5 }}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: width / 10,
    padding: 30,
    color: "white",
  },
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  profileCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT / 1.4,
    backgroundColor: "black",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: CARD_WIDTH / 2,
    height: CARD_HEIGHT / 4,
    borderRadius: CARD_WIDTH,
    backgroundColor: "grey",
    marginTop: 30,
  },
  profileName: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  cardTitle: {
    fontWeight: "700",
    color: "white",
    fontSize: 30,
    marginTop: 20,
  },
  info: {
    color: "#62656b",
    fontSize: 25,
    marginTop: 70,
  },
});

export default DetailShareScreen;
