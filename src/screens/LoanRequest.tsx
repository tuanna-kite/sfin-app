import { Alert, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderBackground from "../components/ui/HeaderBackground";
import { Box, Button, Column, Row, Text } from "native-base";
import PrimaryInput from "../components/ui/PrimaryInput";
import { useAppDispatch, useAppSelector } from "../store";
import SuccessPopup from "../components/SuccessPopup";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigations/config";
import { loanRequestSchema, onInputChange } from "../utils/form";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { setUser } from "../store/user.reducer";
import { ValidationError } from "yup";
import { LoanRequestForm } from "../types/debt";

const textProps = {
  fontWeight: "700",
  fontSize: 16,
  color: "#FFFFFF",
};

type Props = NativeStackScreenProps<RootStackParams, "LoanRequest">;

const LoanRequest = ({ navigation, route }: Props) => {
  const { popup } = useAppSelector((state) => state.popup);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const { loan } = route.params;
  const [loanArray, setLoanArray] = useState([0]);
  const [loanSum, setLoanSum] = useState(user!.totalLoan);

  const [formData, setFormData] = useState<LoanRequestForm>({
    loan: loan,
    reason: "asjdhfjasdf",
    fullname: "adsfasd",
    momo: "03254646456",
  });

  async function updateLoanRequest() {
    try {
      setLoanArray([...loanArray, loan]);
      let sum = 0;
      for (let i = 0; i < loanArray.length; i++) {
        sum += loan;
      }
      setLoanSum(sum);
      onSendRequest();
      await loanRequestSchema.validate(formData);
      const docRef = doc(firebaseDb, "users", user!.phone);
      const LoanRequestData = {
        ...user!,
        ...formData,
        totalLoan: user!.totalLoan + sum,
      };
      await updateDoc(docRef, LoanRequestData);
      dispatch(setUser(LoanRequestData));
    } catch (error) {
      Alert.alert("Thông báo", (error as ValidationError).message);
    }
  }

  function onSendRequest() {
    dispatch(
      setPopup({
        type: EPopupType.Success,
        title: "Yêu cầu của bạn đã được gửi đi",
        desc: "Chúng tôi sẽ kiểm tra trong 48h làm việc",
      })
    );
  }
  return (
    <>
      <HeaderBackground text="Gửi yêu cầu vay" hasBack />
      {popup && <SuccessPopup onCancel={() => navigation.navigate("Home")} />}
      <Column px={5} flex={1} mb={12} justifyContent="space-between">
        <Box>
          <Text fontSize={10} color="#6B7280" textAlign="center" my={7}>
            Thanh toán sẽ được tự động chuyển vào tài khoản Momo của bạn sau khi
            được chúng tôi phê duyệt. Thời gian tối đa là 48h.
          </Text>
          <Row bg="#F8A01E" rounded="2xl" p={5} space="32">
            <Column>
              <Column>
                <Text fontSize={12} color="#FFFFFF">
                  Số tiền vay
                </Text>
                <Text {...textProps}>{loan} Triệu VNĐ</Text>
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
                  {loan} Triệu VNĐ
                </Text>
              </Column>
            </Column>
          </Row>
          <PrimaryInput
            my={6}
            label="Mục đích vay"
            placeholder="Mục đích vay"
            onDoChange={onInputChange<LoanRequestForm>(
              "reason",
              setFormData,
              formData
            )}
          />
          <PrimaryInput
            label="Thông tin tài khoản Momo"
            placeholder="Họ tên"
            autoCapitalize="words"
            onDoChange={onInputChange<LoanRequestForm>(
              "fullname",
              setFormData,
              formData
            )}
          />
          <PrimaryInput
            placeholder="Số điện thoại Momo"
            keyboardType="number-pad"
            onDoChange={onInputChange<LoanRequestForm>(
              "momo",
              setFormData,
              formData
            )}
          />
        </Box>
        <Button onPress={updateLoanRequest}>Gửi</Button>
      </Column>
    </>
  );
};

export default LoanRequest;

const styles = StyleSheet.create({});
