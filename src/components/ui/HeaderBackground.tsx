import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Center, Icon, Row, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type HeaderBackgroundProps = {
  text: string;
  hasBack?: boolean;
};

const HeaderBackground = ({ text, hasBack }: HeaderBackgroundProps) => {
  const navigation = useNavigation();
  return (
    <LinearGradient style={styles.gradient} colors={["#F4762D", "#FCB03F"]}>
      <Row pb="2" w="full" alignItems="center" justifyContent="space-between" safeAreaTop>
        <Center w="12">
          {hasBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
          )}
        </Center>
        <Text fontSize={16} fontWeight={500} color="#FFFFFF">
          {text}
        </Text>
        <Center w="12"></Center>
      </Row>
    </LinearGradient>
  );
};

export default HeaderBackground;

const styles = StyleSheet.create({
  gradient: {
    alignItems: "center",
  },
});
