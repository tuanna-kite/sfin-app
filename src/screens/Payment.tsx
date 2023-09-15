import { StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../components/ui/HeaderBackground";
import {
  Box,
  Button,
  Center,
  Column,
  FormControl,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryInput from "../components/ui/PrimaryInput";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../store";
import SuccessPopup from "../components/SuccessPopup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigations/config";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";

type Props = {} & NativeStackScreenProps<RootStackParams, "Payment">;

const Payment = ({ navigation }: Props) => {
  const [paymentCode, setPaymentCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const truePaymentCode = "012345";

  const dispatch = useAppDispatch();
  const { popup } = useAppSelector((state) => state.popup);

  function onConfirmPayment() {
    if (paymentCode !== truePaymentCode) {
      setMessage("Không tìm thấy giao dịch");
    } else {
      dispatch(
        setPopup({
          type: EPopupType.Success,
          title: "Thanh toán hoàn tất",
          desc: "Cảm ơn bạn!",
        })
      );
    }
  }
  return (
    <>
      <HeaderBackground text="Thanh toán" />
      {popup && <SuccessPopup onCancel={() => navigation.navigate("Home")} />}
      <ScrollView>
        <Column px={5} mb={5} flex={1}>
          <Box>
            <Text color="#6B7280" fontSize={14} textAlign="center" my={2}>
              <Text fontWeight={500} color="#1F2937" bold>
                Bước 1:
              </Text>{" "}
              Chuyển tiền Momo
            </Text>
            <Text color="#6B7280" fontSize={12} textAlign="center" mb={3}>
              Sử dụng ứng dụng Momo bật tính năng chuyển tiền qua QR, sau đó
              quét mã QR bên dưới
            </Text>
            <Column alignItems="center">
              <LinearGradient
                colors={["#F4762D", "#FCB03F"]}
                style={styles.qrBox}
              >
                <Text textAlign="center" fontWeight={500} color="white" my={5}>
                  Họ và tên (0345622467)
                </Text>
                <Center bg="white" mx="12" p="6" rounded="lg">
                  <Image
                    source={require("../../assets/qr-code.png")}
                    alt="qr"
                    size="md"
                  />
                </Center>
                <Text fontSize={10} color="white" textAlign="center" pt={2}>
                  Quét để chuyển tiền
                </Text>
                <Pressable>
                  <Row
                    borderWidth={1}
                    py={1}
                    px={2}
                    mt={5}
                    mx={16}
                    borderColor="white"
                    rounded="sm"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons name="download" color="white" />
                    <Text color="white" fontSize={12}>
                      Tải xuống
                    </Text>
                  </Row>
                </Pressable>
              </LinearGradient>
            </Column>
            <Text fontSize={14} color="#6B7280" textAlign="center" my={3}>
              <Text bold fontWeight={500} color="#1F2937">
                Bước 2:
              </Text>{" "}
              Nhập mã giao dịch
            </Text>
            <PrimaryInput
              placeholder="Nhập mã giao dịch"
              onChangeText={setPaymentCode}
            />
            <Center mt={3}>
              <Image alt="" source={require("../../assets/payment-code.png")} />
            </Center>
          </Box>
          <Column h={10} justifyContent="center">
            <Text color="error.600" textAlign="center">
              {message}
            </Text>
          </Column>
          <Button onPress={onConfirmPayment}>Xác nhận thanh toán</Button>
        </Column>
      </ScrollView>
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  qrBox: {
    paddingBottom: 30,
    borderRadius: 16,
  },
});
