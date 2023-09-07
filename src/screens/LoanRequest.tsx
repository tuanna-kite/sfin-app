import { StyleSheet } from "react-native";
import React from "react";
import HeaderBackground from "../components/ui/HeaderBackground";
import { Box, Button, Column, Row, Text } from "native-base";
import PrimaryInput from "../components/ui/PrimaryInput";
import ErrorOverlay from "../components/ErrorOverlay";
import { useAppDispatch, useAppSelector } from "../store";
import SuccessPopup from "../components/SuccessPopup";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigations/config";

const textProps = {
  fontWeight: "700",
  fontSize: 16,
  color: "#FFFFFF",
};

type Props = NativeStackScreenProps<RootStackParams, "LoanRequest">;

const LoanRequest = ({ navigation }: Props) => {
  const { popup } = useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();
  function onSendRequest() {
    dispatch(
      setPopup({
        type: EPopupType.Error,
        title: "Yêu cầu của bạn đã được gửi đi",
        desc: "Chúng tôi sẽ kiểm tra trong 48h làm việc",
      })
    );
  }
  return (
    <>
      <HeaderBackground text="Gửi yêu cầu vay" />
      {popup && <SuccessPopup onCancel={() => navigation.navigate("Home")} />}
      <Column px={5} flex={1} mb={12} justifyContent="space-between">
        <Box>
          <Text fontSize={10} color="#6B7280" textAlign="center" my={7}>
            Thanh toán sẽ được tự động chuyển vào tài khoản Momo của bạn sau khi được chúng tôi phê
            duyệt. Thời gian tối đa là 48h.
          </Text>
          <Row bg="#F8A01E" rounded="2xl" p={5} space="32">
            <Column>
              <Column>
                <Text fontSize={12} color="#FFFFFF">
                  Số tiền vay
                </Text>
                <Text {...textProps}>1 Triệu VNĐ</Text>
              </Column>
              <Column>
                <Text fontSize={12} color="#FFFFFF">
                  Lãi
                </Text>
                <Text {...textProps}>0 VNĐ</Text>
              </Column>
            </Column>
            <Column>
              <Column>
                <Text fontSize={12} color="#FFFFFF">
                  Thời hạn
                </Text>
                <Text {...textProps}>30 ngày</Text>
              </Column>
              <Column>
                <Text fontSize={12} color="#FFFFFF">
                  Số tiền phải trả
                </Text>
                <Text fontWeight={700} fontSize={16} color="#FFFFFF">
                  1 Triệu VNĐ
                </Text>
              </Column>
            </Column>
          </Row>
          <PrimaryInput my={6} label="Mục đích vay" placeholder="Mục đích vay" />
          <PrimaryInput label="Thông tin tài khoản Momo" placeholder="Họ tên" />
          <PrimaryInput placeholder="Số điện thoại Momo" />
        </Box>
        <Button onPress={onSendRequest}>Gửi</Button>
      </Column>
    </>
  );
};

export default LoanRequest;

const styles = StyleSheet.create({});
