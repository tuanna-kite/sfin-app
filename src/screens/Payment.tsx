import { StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../components/ui/HeaderBackground";
import { Box, Button, Center, Column, Image, Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryInput from "../components/ui/PrimaryInput";

const Payment = () => {
  const [paymentCode, setPaymentCode] = useState("");
  const [errorShown, setErrorShown] = useState(false);
  const truePaymentCode = "012345";
  function enterCode(text: string) {
    setPaymentCode(text);
    setErrorShown(false);
  }
  function onConfirmPayment() {
    if (paymentCode !== truePaymentCode) {
      setErrorShown(true);
    }
  }
  return (
    <>
      <HeaderBackground text="Thanh toán" />
      <Column px={5} mb={5} flex={1}>
        <Box>
          <Text color="#6B7280" fontSize={14} textAlign="center">
            <Text fontWeight={500} color="#1F2937" bold>
              Bước 1:
            </Text>{" "}
            Chuyển tiền Momo
          </Text>
          <Text color="#6B7280" fontSize={12} textAlign="center">
            Sử dụng ứng dụng Momo bật tính năng chuyển tiền qua QR, sau đó quét
            mã QR bên dưới
          </Text>
          <LinearGradient colors={["#F4762D", "#FCB03F"]} style={styles.qrBox}>
            <Column alignItems="center">
              <Text
                textAlign="center"
                fontSize={14}
                fontWeight={500}
                color="white"
                my={3}
              >
                Họ và tên (0345622467)
              </Text>
              <Center bg="white" mx={"12"} p="4" rounded={"2xl"}>
                <Image source={require("../../assets/qr-code.png")} alt="qr" size="lg" />
              </Center>
              <Text fontSize={10} color="white" pt={2}>
                Quét để chuyển tiền
              </Text>
              <Image
                source={require("../../assets/download.png")}
                alt=""
                my={4}
              />
            </Column>
          </LinearGradient>
          <Text fontSize={14} color="#6B7280" textAlign="center">
            <Text bold fontWeight={500} color="#1F2937">
              Bước 2:
            </Text>{" "}
            Nhập mã giao dịch
          </Text>
          <PrimaryInput
            placeholder="Nhập mã giao dịch"
            onChangeText={enterCode}
          />
          <Center mt={3}>
            <Image alt="" source={require("../../assets/payment-code.png")} />
          </Center>
          {errorShown && (
            <Text textAlign="center" color={"error.600"}>
              Mã giao dịch không hợp lệ
            </Text>
          )}
        </Box>
        <Button onPress={onConfirmPayment}>Xác nhận thanh toán</Button>
      </Column>
    </>
  );
};

export default Payment;

const styles = StyleSheet.create({
  qrBox: {
    height: 300,
    marginTop: 3,
    marginHorizontal: 50,
    borderRadius: 16,
  },
});
