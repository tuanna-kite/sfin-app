import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/user.reducer";
import { Box, Button, Center, Column, Text, Image } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import UnderlinedInput from "../../components/ui/UnderlinedInput";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PasswordInput from "../../components/ui/PasswordInput";

type Props = {} & NativeStackScreenProps<AuthStackParams, "Login">;

const Login = ({ navigation }: Props) => {
  const [messageShown, setMessageShown] = useState(false);
  const [password, setPassword] = useState("");
  const realPassword = "aaa";

  function changePasswordHandler(text: string) {
    setPassword(text);
    setMessageShown(false);
  }

  function handleLogin() {
    if (password === realPassword) {
      onSignUp();
    } else {
      setMessageShown(true); // Show error message when password is wrong
    }
  }

  const dispatch = useAppDispatch();

  function onForgotPasword() {
    navigation.navigate("ForgotPassword");
  }

  function onSignUp() {
    navigation.navigate("SignUp");
  }
  function onLoggedIn() {
    dispatch(setUser());
  }
  return (
    // <View>
    //   <Text>Login</Text>
    //   <Button onPress={onSignUp}>Sign Up</Button>
    //   <Button onPress={onLoggedIn}>Login</Button>

    // </View>
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
            <Column px={6} py={10} space={4} flex={1} width="100%">
              <Column space={1}>
                <Text
                  fontSize={20}
                  fontWeight={700}
                  lineHeight={25}
                  color={"#F8A01E"}
                >
                  Xin chào,
                </Text>
                <Text fontSize={12}>Đăng nhập để tiếp tục</Text>
              </Column>
              <UnderlinedInput
                placeholder={"Điện thoại"}
                aboveText="Điện thoại"
              />
              <Column space={4}>
                <PasswordInput
                  placeholder="Mật khẩu"
                  aboveText="Mật khẩu"
                  value={password}
                  onChangeText={changePasswordHandler}
                />
                <Button
                  onPress={onForgotPasword}
                  right={"3/4"}
                  variant={"link"}
                  _text={{ color: "#9CA3AF", fontSize: 12 }}
                >
                  Quên mật khẩu?
                </Button>
              </Column>
              <PrimaryButton
                title=""
                text={"Đăng nhập"}
                onPress={handleLogin}
              />
              {messageShown && (
                <Text
                  textAlign={"center"}
                  fontSize={12}
                  color={"#DC2626"}
                  fontWeight={400}
                >
                  Tài khoản hoặc mật khẩu chưa đúng
                </Text>
              )}
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

export default Login;

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
