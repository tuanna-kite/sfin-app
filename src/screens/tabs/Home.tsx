import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import { removeUser } from "../../store/user.reducer";
import {
  Box,
  Button,
  Center,
  Column,
  Divider,
  Icon,
  Image,
  Row,
  Text,
  Pressable,
  FormControl,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<RootStackParams, "Home">;

const Home = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [chosen, setChosen] = useState(false);
  const [messageShown, setMessageShown] = useState(false);

  function onPayment() {
    navigation.navigate("Payment");
  }

  function onLoanRequest() {
    navigation.navigate("LoanRequest");
  }

  function choosePackageHandler() {
    setChosen(true);
    setMessageShown(false);
  }

  function showMessageHandler() {
    if (!chosen) {
      setMessageShown(true);
    } else {
      onLoanRequest();
    }
  }

  return (
    <>
      <LinearGradient colors={["#F4762D", "#FCB03F"]} style={styles.gradient}>
        <Center bg={"#F3F4F6"} w="80%" h="60%" rounded="2xl" mt={10} shadow={2}>
          <Box flex={1.5} w={"100%"}>
            <Center flex={1}>
              <Row w={"90%"} justifyContent="space-between">
                <Column space={1}>
                  <Image
                    source={require("../../../assets/wallet.png")}
                    alt=""
                  />
                  <Text>Khoản nợ</Text>
                </Column>
                <Column>
                  <Text fontSize={24} fontWeight={700} color={"#F4762D"}>
                    1,000.00
                  </Text>
                  <Row justifyContent="space-between">
                    <Text fontSize={10} color="#6B7280">
                      Hạn
                    </Text>
                    <Text fontSize={10} color="#6B7280">
                      28 ngày
                    </Text>
                  </Row>
                </Column>
              </Row>
            </Center>
          </Box>
          <Divider></Divider>
          <Box flex={1} w={"100%"}>
            <Center flex={1}>
              <Row w={"90%"} justifyContent="space-between">
                <Text underline>Thanh toán</Text>
                <Pressable onPress={onPayment}>
                  <Icon
                    as={<MaterialIcons name="arrow-forward" />}
                    size={6}
                  ></Icon>
                </Pressable>
              </Row>
            </Center>
          </Box>
        </Center>
      </LinearGradient>
      <Column flex={1} m={10}>
        <Text fontSize={20} fontWeight={700}>
          Các gói vay
        </Text>
        <Column w={"100%"} h={"40%"} space={2} mt={2}>
          <Row flex={1} space={2}>
            <Center flex={1} bg={"#FFFFFF"} shadow={2} rounded="2xl">
              <Pressable onPress={choosePackageHandler}>
                <Column>
                  <Text
                    fontSize={20}
                    fontWeight={700}
                    color="#F8A01E"
                    textAlign="center"
                  >
                    1 Triệu
                  </Text>
                  <Text fontSize={12} color="#9CA3AF">
                    Thời hạn: 1 tháng
                  </Text>
                </Column>
              </Pressable>
            </Center>
            <Center flex={1} bg={"#FFFFFF"} shadow={2} rounded="2xl">
              <Pressable onPress={choosePackageHandler}>
                <Column>
                  <Text
                    fontSize={20}
                    fontWeight={700}
                    color="#F8A01E"
                    textAlign="center"
                  >
                    2 Triệu
                  </Text>
                  <Text fontSize={12} color="#9CA3AF">
                    Thời hạn: 1 tháng
                  </Text>
                </Column>
              </Pressable>
            </Center>
          </Row>
          <Row flex={1} space={2}>
            <Center flex={1} bg={"#FFFFFF"} shadow={2} rounded="2xl">
              <Pressable onPress={choosePackageHandler}>
                <Column>
                  <Text
                    fontSize={20}
                    fontWeight={700}
                    color="#F8A01E"
                    textAlign="center"
                  >
                    3 Triệu
                  </Text>
                  <Text fontSize={12} color="#9CA3AF">
                    Thời hạn: 1 tháng
                  </Text>
                </Column>
              </Pressable>
            </Center>
            <Center flex={1} bg={"#FFFFFF"} shadow={2} rounded="2xl">
              <Pressable onPress={choosePackageHandler}>
                <Column>
                  <Text
                    fontSize={20}
                    fontWeight={700}
                    color="#F8A01E"
                    textAlign="center"
                  >
                    5 Triệu
                  </Text>
                  <Text fontSize={12} color="#9CA3AF">
                    Thời hạn: 1 tháng
                  </Text>
                </Column>
              </Pressable>
            </Center>
          </Row>
        </Column>
        <Center w="100%" h={10}>
          {messageShown && (
            <Text color="#DC2626" fontSize={12} textAlign="center" my={3}>
              Bạn vui lòng chọn gói vay theo nhu cầu
            </Text>
          )}
        </Center>
        <Button
          color="#F8A01E"
          rounded="lg"
          onPress={showMessageHandler}
          rightIcon={<Icon as={<MaterialIcons name="arrow-forward" />} />}
        >
          VAY NGAY
        </Button>
        <Text mt={8} textAlign="center" color="#6B7280" fontSize={12}>
          Bằng việc nhấp vào nút “Vay ngay” bạn đồng ý với các{" "}
          <Pressable>
            <Text textAlign="center" fontSize={12} color="#0077E6" underline>
              Điều khoản dịch vụ
            </Text>
          </Pressable>{" "}
          của SFin
        </Text>
        <Center>
          <Divider my={3} w={"1/3"}></Divider>
        </Center>
        <Text fontSize={12} color="#6B7280" textAlign="center">
          Thời hạn vay tối đa là 1 tháng. Không tính lãi suất.
        </Text>
      </Column>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    height: "35%",
  },
});
