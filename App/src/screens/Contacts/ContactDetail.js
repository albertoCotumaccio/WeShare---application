import { useRoute } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProfileImageDefault from "../../../assets/profileImage.png";
import CustomButton from "../../components/CustomButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ContactDetail({ navigation }) {
  const route = useRoute();

  const email = route.params.email ? (
    <View style={styles.row}>
      <Text style={{ color: "black" }}>email: </Text>
      <Text style={{ color: "black", fontWeight: "bold" }}>
        {route.params.email}
      </Text>
    </View>
  ) : null;

  const sourceImage = (param) => {
    return param.image ? param.image : ProfileImageDefault;
  };

  const phone = route.params.phone ? (
    <View style={styles.row}>
      <Text style={{ color: "black" }}>telefono: </Text>
      <Text style={{ color: "black", fontWeight: "bold" }}>
        {route.params.phone}
      </Text>
    </View>
  ) : null;

  const bio = route.params.bio ? (
    <View style={styles.row}>
      <Text style={{ color: "black", fontWeight: "bold" }}>
        {route.params.bio}
      </Text>
    </View>
  ) : null;

  const facebook = route.params.facebook ? (
    <CustomButton
      icon={
        <MaterialIcons
          name="facebook"
          size={40}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      rightButton={
        <MaterialIcons
          name="arrow-forward-ios"
          size={30}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      text={route.params.facebook}
      textSize={25}
      bgColor="#4867aa"
      onPress={() =>
        Linking.openURL("https://www.facebook.com/" + route.params.facebook)
      }
    />
  ) : null;

  const instagram = route.params.instagram ? (
    <CustomButton
      icon={
        <MaterialCommunityIcons
          name="instagram"
          size={50}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      rightButton={
        <MaterialIcons
          name="arrow-forward-ios"
          size={40}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      text={"@" + route.params.instagram}
      textSize={25}
      bgColor="#fc055b"
      onPress={() =>
        Linking.openURL("https://www.instagram.com/" + route.params.instagram)
      }
    />
  ) : null;

  const linkedin = route.params.linkedin ? (
    <CustomButton
      icon={
        <MaterialCommunityIcons
          name="linkedin"
          size={50}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      rightButton={
        <MaterialIcons
          name="arrow-forward-ios"
          size={40}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      text={route.params.linkedin}
      textSize={25}
      bgColor="#0e76a8"
      onPress={() =>
        Linking.openURL("https://www.linkedin.com/in/" + route.params.instagram)
      }
    />
  ) : null;

  const twitter = route.params.twitter ? (
    <CustomButton
      icon={
        <MaterialCommunityIcons
          name="twitter"
          size={50}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      rightButton={
        <MaterialIcons
          name="arrow-forward-ios"
          size={40}
          color="black"
          style={{
            marginRight: 5,
          }}
        />
      }
      text={"@" + route.params.twitter}
      textSize={25}
      bgColor="#1DA1F2"
      onPress={() =>
        Linking.openURL("https://www.twitter.com/" + route.params.twitter)
      }
    />
  ) : null;

  //#1DA1F2"

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={sourceImage(route.params)} style={styles.profileImage} />
        <Text style={styles.cardtitle}>{route.params.full_name}</Text>

        {bio}
        <Text>{route.params.city}</Text>
        <Text>birthday: {route.params.birth}</Text>
        <Text style={styles.cardSubtitle}>CONTACTS</Text>
        {email}
        {phone}
        <Text style={styles.cardSubtitle}>SOCIAL</Text>
        <View style={{ flexDirection: "column", width: width * 0.95 }}>
          {facebook}
          {instagram}
          {linkedin}
          {twitter}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 35,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  profileImage: {
    width: width / 4,
    height: height / 8,
    borderRadius: 100,
  },
  cardtitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 30,
  },
  cardSubtitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 23,
    paddingTop: 15,
  },
  cardtext: {
    color: "black",
    fontSize: 25,
  },
});
