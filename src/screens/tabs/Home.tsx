import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
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
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabsParams, RootStackParams } from "../../navigations/config";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import LoanSelect from "../../components/LoanSelect/LoanSelect";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { getAllDebts } from "../../types/debt";
import LoadingOverlay from "../../components/LoadingOverlay";
import { setPopup } from "../../store/popup.reducer";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParams, "Home">,
  NativeStackScreenProps<RootStackParams>
>;

let CurrencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});

const Home = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const [messageShown, setMessageShown] = useState(false);
  const [loan, setLoan] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  function onPayment() {
    navigation.navigate("Payment");
  }
  function onLoanRequest() {
    if (user!.verified) {
      navigation.navigate("LoanRequest", { loan: loan });
    } else {
      Alert.alert("Thông báo", "Bạn chưa xác thực hồ sơ", [
        { text: "Xác thực", onPress: () => navigation.navigate("ProfileVerification") },
      ]);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      async function loadDebts() {
        try {
          dispatch(setLoading());
          const debts = await getAllDebts(user!.phone);
          const total = debts.reduce((prev, current) => prev + current.loan, 0);
          setTotalDebt(total);
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(removeLoading());
        }
      }
      loadDebts();
    }, [])
  );

  if (isLoading) {
    return <LoadingOverlay style={{ backgroundColor: "white" }} />;
  }

  return (
    <>
      <LinearGradient colors={["#F4762D", "#FCB03F"]} style={styles.gradient}>
        <Center bg={"#F3F4F6"} w="80%" h="60%" rounded="2xl" mt={10} shadow={2}>
          <Box flex={1.5} w={"100%"}>
            <Center flex={1}>
              <Row w={"90%"} justifyContent="space-between">
                <Column space={1}>
                  <Image source={require("../../../assets/wallet.png")} alt="" />
                  <Text>Khoản nợ</Text>
                </Column>
                <Column>
                  <Text fontSize={24} fontWeight={700} color={"#F4762D"}>
                    {CurrencyFormat.format(totalDebt)}
                  </Text>
                  {/* <Row justifyContent="space-between">
                    <Text fontSize={10} color="#6B7280">
                      Hạn
                    </Text>
                    <Text fontSize={10} color="#6B7280">
                      28 ngày
                    </Text>
                  </Row> */}
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
                  <Icon as={<MaterialIcons name="arrow-forward" />} size={6}></Icon>
                </Pressable>
              </Row>
            </Center>
          </Box>
        </Center>
      </LinearGradient>
      <Column flex={1} m={4}>
        <Text fontSize={20} fontWeight={700}>
          Các gói vay
        </Text>
        <LoanSelect onChange={setLoan} />

        <Center w="100%" h={10}>
          {messageShown && (
            <Text color="#DC2626" fontSize={12} textAlign="center" my={3}>
              Bạn vui lòng chọn gói vay theo nhu cầu
            </Text>
          )}
        </Center>
        <Button
          rounded="lg"
          onPress={onLoanRequest}
          disabled={loan === 0}
          bg={loan === 0 ? "muted.500" : "primary.600"}
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
