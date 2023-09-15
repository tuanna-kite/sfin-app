import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/user.reducer";
import {
  Box,
  Button,
  Center,
  Column,
  Text,
  Image,
  Stack,
  Row,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import UnderlinedInput from "../../components/ui/UnderlinedInput";
import PasswordInput from "../../components/ui/PasswordInput";
import { onLog } from "firebase/app";
import { firebaseDb } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { UserProfile } from "../../types/user";
import LoadingOverlay from "../../components/LoadingOverlay";

type Props = {} & NativeStackScreenProps<AuthStackParams, "Login">;

const Login = ({ navigation }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("123456");
  const [phone, setPhone] = useState("0372723075");
  const [loading, setLoading] = useState(false);

  function changePasswordHandler(text: string) {
    setPassword(text);
    setError(null);
  }

  const dispatch = useAppDispatch();

  function onForgotPasword() {
    navigation.navigate("ForgotPassword");
  }

  function onSignUp() {
    navigation.navigate("SignUp");
  }
  async function onLoggedIn() {
    try {
      setLoading(true);
      const docRef = doc(firebaseDb, "users", phone);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.password !== password) {
          setError("Sai mật khẩu");
        } else {
          dispatch(setUser(data as UserProfile));
        }
      } else {
        // docSnap.data() will be undefined in this case
        setError("Không tồn tại tài khoản này");
      }
    } catch (error) {
      setError("Đăng nhập thất bại");
    } finally{
      setLoading(false);
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
                source={require("../../../assets/sfin-logo.png")}
              ></Image>
            </Box>
          </LinearGradient>
        </Box>
      </Stack>
      <Center zIndex={2} w="100%" h="100%">
        {loading && <LoadingOverlay />}
        <Box width={311} height={424} rounded="3xl" bg="#FFFFFF" mt={200}>
          <Center flex={1}>
            <Column px={6} py={10} space={4} flex={1} width="100%">
              <Column space={1}>
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  lineHeight={25}
                  color="#F8A01E"
                >
                  Xin chào,
                </Text>
                <Text fontSize={12}>Đăng nhập để tiếp tục</Text>
              </Column>
              <UnderlinedInput
                placeholder="Điện thoại"
                label="Điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
              />
              <Column space={4}>
                <PasswordInput
                  placeholder="Mật khẩu"
                  label="Mật khẩu"
                  value={password}
                  onChangeText={changePasswordHandler}
                />
                <Row>
                  <Button
                    onPress={onForgotPasword}
                    variant="link"
                    _text={{ color: "#9CA3AF", fontSize: 12 }}
                  >
                    Quên mật khẩu?
                  </Button>
                </Row>
              </Column>
              <Button rounded="lg" color="#F8A01E" onPress={onLoggedIn}>
                ĐĂNG NHẬP
              </Button>

              <Text
                textAlign="center"
                fontSize={12}
                color="#DC2626"
                fontWeight={400}
              >
                {error}
              </Text>
            </Column>
          </Center>
        </Box>
        <Column mt={10}>
          <Text color={"#6B7280"} fontSize={12}>
            Bạn chưa có tài khoản?
          </Text>
          <Button
            _text={{ underline: true }}
            variant="link"
            fontSize={12}
            textDecorationLine="underline"
            onPress={onSignUp}
          >
            ĐĂNG KÝ
          </Button>
        </Column>
      </Center>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    height: "45%",
  },
});
