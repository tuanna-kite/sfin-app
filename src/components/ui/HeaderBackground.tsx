import { StyleSheet, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Row, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderBackgroundProps={
  text:string;
};

const HeaderBackground = ({ text }:HeaderBackgroundProps) => {
  return (
    <LinearGradient style={styles.gradient} colors={["#F4762D", "#FCB03F"]}>
      <Row alignItems={'center'} >
        {/* <Icon as={<MaterialIcons name="chevron-left"/>} color={'white'} size={10}></Icon> */}
        <Text fontSize={16} fontWeight={500} color="#FFFFFF" mb={2}>
          {text}
        </Text>
      </Row>
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
