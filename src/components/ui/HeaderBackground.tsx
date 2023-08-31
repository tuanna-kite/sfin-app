import { StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "native-base";


const HeaderBackground = ({text}) => {
  return (
    <LinearGradient style={styles.gradient} colors={["#F4762D", "#FCB03F"]}>
      <Text fontSize={16} fontWeight={500} color="#FFFFFF" mb={2}>
        {text}
      </Text>
    </LinearGradient>
  );
};

export default HeaderBackground;

const styles = StyleSheet.create({
  gradient: {
    height: "13%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
