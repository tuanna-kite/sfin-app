import { StyleSheet, View } from "react-native";
import React from "react";
import { Box, Center, Column, Text, Image, Button } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import UnderlinedInput from "../../components/ui/UnderlinedInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<AuthStackParams, "ForgotPassword">;

const ForgotPassword = ({ navigation }: Props) => {
  function onSignUp() {
    navigation.navigate("SignUp");
  }
  return (
    <Box flex={1}>
      <LinearGradient
        colors={["#F4762D", "#FCB03F"]}
        style={styles.gradient}
      ></LinearGradient>
      <Image
        source={require("../../../assets/sfin-logo.png")}
        alt="SFin logo"
        position={"absolute"}
        style={styles.appLogo}
      ></Image>
      <Center
        flex={1}
        zIndex={2}
        position={"absolute"}
        style={styles.centerBox}
      >
        <Box
          width={311}
          height={424}
          borderWidth={1}
          rounded={"3xl"}
          bg={"#FFFFFF"}
        >
          <Center flex={1}>
            <Column px={6} py={10} space={4} flex={1} width="100%" justifyContent={'space-between'}>
              <Column>
                <Column space={1}>
                  <Text
                    fontSize={20}
                    fontWeight={700}
                    lineHeight={25}
                    color={"#F8A01E"}
                  >
                    Quên mật khẩu
                  </Text>
                  <Text fontSize={12}>
                    Nhập số điện thoại để khôi phục tài khoản
                  </Text>
                </Column>
                <UnderlinedInput
                  placeholder={"Điện thoại"}
                  aboveText="Điện thoại"
                  style={styles.phoneBox}
                />
              </Column>
              <PrimaryButton title="" text={"ĐẶT LẠI MẬT KHẨU"} />
            </Column>
          </Center>
        </Box>
      </Center>
      <Center zIndex={2} style={styles.registerContainer} position={"absolute"}>
        <Column>
          <Text color={"#6B7280"} fontSize={12}>
            Bạn chưa có tài khoản?
          </Text>
          <Button
            _text={{ underline: true }}
            variant={"link"}
            fontSize={12}
            textDecorationLine={"underline"}
            onPress={onSignUp}
          >
            ĐĂNG KÝ
          </Button>
        </Column>
      </Center>
    </Box>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    position: "relative",
    maxHeight: 381,
    borderRadius: 32,
  },
  centerBox: {
    marginTop: 270,
    marginLeft: 45,
  },
  appLogo: {
    margin: 120,
  },
  registerContainer: {
    marginTop: 700,
    marginLeft: 120,
    paddingTop: 20,
  },
  phoneBox: {
    paddingTop: 20,
  },
  primaryButton: {
    marginTop: 100,
  },
});
