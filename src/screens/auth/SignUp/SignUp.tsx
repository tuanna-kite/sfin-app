import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../../navigations/config";
import { Box, Button, Center, Column, Image, Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import UnderlinedInput from "../../../components/ui/UnderlinedInput";
import PasswordInput from "../../../components/ui/PasswordInput";

type Props = {} & NativeStackScreenProps<AuthStackParams, "SignUp">;

const SignUp = ({ navigation, route }: Props) => {
  const [messageShown, setMessageShown] = useState(false);
  const [password, setPassword] = useState("");
  const [passRetyped, setPassRetyped] = useState("");

  function onLogIn() {
    navigation.navigate("Login");
  }
  function onFillProfile() {
    navigation.navigate("FillProfile");
  }
  function passChangeHandle(text:string){
    setPassword(text);
  }
  function passRetypedHandle(text:string){
    setPassRetyped(text);
  }
  return (
    <Box flex={1}>
      <LinearGradient
        colors={["#F4762D", "#FCB03F"]}
        style={styles.gradient}
      ></LinearGradient>
      <Image
        source={require("../../../../assets/sfin-logo.png")}
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
            <Column px={6} py={10} space={4} width={"100%"}>
              <Column space={1}>
                <Text
                  fontSize={20}
                  fontWeight={700}
                  lineHeight={25}
                  color={"#F8A01E"}
                >
                  Xin chào,
                </Text>
                <Text fontSize={12}>Đăng ký để tiếp tục</Text>
              </Column>
              <UnderlinedInput placeholder="Điện thoại" label="Điện thoại" />
              <Column space={4}>
                <PasswordInput placeholder="Mật khẩu" label="Mật khẩu" onChangeText={passChangeHandle}/>
                <PasswordInput
                  placeholder="Nhập lại mật khẩu"
                  label="Nhập lại mật khẩu"
                  onChangeText={passRetypedHandle}
                />
              </Column>
              <Button rounded={"lg"} color={"#F8A01E"} onPress={onFillProfile}>
                ĐĂNG KÝ
              </Button>
              <Text color={'#DC2626'} fontSize={12} textAlign='center'>Mật khẩu không khớp</Text>
            </Column>
          </Center>
        </Box>
      </Center>
      <Center zIndex={2} style={styles.registerContainer} position={"absolute"}>
        <Column>
          <Text color={"#6B7280"} fontSize={12}>
            Bạn đã có tài khoản?
          </Text>
          <Button
            _text={{ underline: true }}
            variant={"link"}
            fontSize={12}
            textDecorationLine={"underline"}
            onPress={onLogIn}
          >
            Đăng nhập
          </Button>
        </Column>
      </Center>
    </Box>
  );
};

export default SignUp;

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
});
