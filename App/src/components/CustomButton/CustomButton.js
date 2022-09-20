import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  onPress,
  text,
  textSize,
  type = "PRIMARY",
  bgColor,
  fgColor,
  icon,
  rightButton,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          styles["container_" + type],
          bgColor ? { backgroundColor: bgColor } : {},
        ]}
      >
        {icon}
        <Text
          style={[
            styles.text,
            styles["text_" + type],
            fgColor ? { color: fgColor } : {},
            textSize ? { fontSize: textSize } : {},
          ]}
        >
          {text}
        </Text>

        {rightButton}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
  },

  container_PRIMARY: {
    backgroundColor: "black",
  },

  container_SECONDARY: {
    borderColor: "#000000",
    borderWidth: 2,
  },

  container_TERTIARY: {
    paddingVertical: 10,
  },

  container_WHITE: {
    backgroundColor: "white",
  },

  container_CIRCLE: {
    width: "50%",
    padding: 15,
    marginBottom: 20,
    borderRadius: 30,
    backgroundColor: "white",
  },

  text: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "white",
  },

  text_SECONDARY: {
    color: "black",
  },

  text_TERTIARY: {
    color: "#5f5673",
  },

  text_WHITE: {
    color: "black",
  },
  text_CIRCLE: {
    color: "black",
  },
});

export default CustomButton;
