import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../../navigations/config";
import {
  Box,
  Button,
  Center,
  Column,
  Image,
  Row,
  Stack,
  Text,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import UnderlinedInput from "../../../components/ui/UnderlinedInput";
import PasswordInput from "../../../components/ui/PasswordInput";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";

type Props = {} & NativeStackScreenProps<AuthStackParams, "SignUp">;

const SignUp = ({ navigation }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passRetyped, setPassRetyped] = useState("");

  function onLogIn() {
    navigation.navigate("Login");
  }


  async function onRegister() {
    const usersRef = collection(firebaseDb, "users");
    const docRef = doc(firebaseDb, "users", phone);
    const docSnap = await getDoc(docRef);

    if (password === passRetyped) {
      if (docSnap.exists()) {
        setMessage("Tài khoản đã tồn tại");
      } else {
        await setDoc(doc(usersRef, phone), {
          phone: phone,
          password: password,
        });
        setMessage(null);
        onLogIn();
      }
    } else {
      setMessage("Mật khẩu nhập lại không khớp");
    }
  }

  return (
    <>
      <Stack position="absolute" w="100%" h="100%">
        <Box flex={1}>
          <LinearGradient
            colors={["#F4762D", "#FCB03F"]}
            style={styles.gradient}
          >
            <Box zIndex={2}>
              <Image
                alt=""
                source={require("../../../../assets/sfin-logo.png")}
              ></Image>
            </Box>
          </LinearGradient>
        </Box>
      </Stack>
      <Center zIndex={2} w="100%" h="100%" mt={120}>
        <Box width={311} height={457} rounded={"3xl"} bg={"#FFFFFF"}>
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
                <Text fontSize={12}>Đăng ký để tiếp tục</Text>
              </Column>
              <UnderlinedInput
                placeholder={"Điện thoại"}
                label="Điện thoại"
                onChangeText={setPhone}
              />
              <Column space={4}>
                <PasswordInput
                  placeholder="Mật khẩu"
                  label="Mật khẩu"
                  value={password}
                  onChangeText={setPassword}
                />
                <PasswordInput
                  placeholder="Nhập lại mật khẩu"
                  label="Nhập lại mật khẩu"
                  value={passRetyped}
                  onChangeText={setPassRetyped}
                />
              </Column>
              <Button onPress={onRegister}>ĐĂNG KÝ</Button>

              <Text
                textAlign={"center"}
                fontSize={12}
                color={"#DC2626"}
                fontWeight={400}
              >
                {message}
              </Text>
            </Column>
          </Center>
        </Box>
        <Column mt={10}>
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
            ĐĂNG NHẬP
          </Button>
        </Column>
      </Center>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    height: "45%",
  },
});
