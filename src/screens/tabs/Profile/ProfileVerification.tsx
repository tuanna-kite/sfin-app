import { StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import { Button, Center, Column, IconButton, Image, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigations/config";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setPopup } from "../../../store/popup.reducer";
import { EPopupType } from "../../../types/popup";
import { setError } from "../../../store/error.reducer";
import SuccessPopup from "../../../components/SuccessPopup";

type Props = {} & NativeStackScreenProps<RootStackParams, "ProfileVerification">;

const ProfileVerification = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { popup } = useAppSelector((state) => state.popup);
  const request = route.params.onPaymentRequest;

  function onNextPage() {
    if (page < 3) {
      setPage(page + 1);
    }
  }

  function onConfirm() {
    if (!request) {
      dispatch(
        setPopup({
          type: EPopupType.Success,
          title: "Yêu cầu của bạn đã được gửi đi",
          desc: "Chúng tôi sẽ kiểm tra trong 48h làm việc",
        })
      );
    } else {
      navigation.navigate("LoanRequest");
    }
  }
  const [page, setPage] = useState(1);
  return (
    <>
      <HeaderBackground text="Hồ sơ xác thực" hasBack />
      {popup && <SuccessPopup onCancel={() => navigation.navigate("TabNav")} />}
      {page === 1 && (
        <Column mx={4} justifyContent="center" pt={7}>
          <Text fontWeight={700} fontSize={16} textAlign={"center"}>
            Hình ảnh CCCD
          </Text>
          <Text fontSize={10} color="#6B7280" px={10} textAlign={"center"}>
            Chúng tôi cần biết bạn là ai để xác minh danh tính. Vui lòng cung cấp hình ảnh trong
            điều kiện đầy đủ ánh sáng để hệ thống quét thông tin được chính xác.
          </Text>
          <Center>
            <Image mt={3} alt="" source={require("../../../../assets/take-pic.png")} />
            <Image mt={3} alt="" source={require("../../../../assets/take-pic.png")} />
          </Center>
          <Button mt={5} onPress={onNextPage}>
            Tiếp tục
          </Button>
        </Column>
      )}
      {page === 2 && (
        <Column mx={4} justifyContent="center" pt={7}>
          <Text fontWeight={700} fontSize={16} textAlign={"center"}>
            Ảnh cá nhân kèm CCCD
          </Text>
          <Text fontSize={10} color="#6B7280" px={10} textAlign={"center"}>
            Vui lòng cung cấp hình ảnh cá nhân kèm ảnh CCCD trước ngực trong điều kiện đầy đủ ánh
            sáng để hệ thống quét thông tin được chính xác.
          </Text>
          <Center>
            <Image mt={3} alt="" source={require("../../../../assets/take-pic.png")} />
            <Image mt={3} alt="" source={require("../../../../assets/take-pic.png")} />
          </Center>
          <Button mt={5} onPress={onNextPage}>
            Tiếp tục
          </Button>
        </Column>
      )}
      {page === 3 && (
        <Column mx={4} pt={7} flex={1} mb={12}>
          <Text fontWeight={700} fontSize={16} textAlign={"center"}>
            Hình ảnh bảng điểm
          </Text>
          <Text fontSize={10} color="#6B7280" px={10} textAlign={"center"}>
            Vui lòng cung cấp hình ảnh bảng điểm có xác nhận của nhà trường trong điều kiện đầy dủ
            ánh sáng để hệ thống quét thông tin được chính xác.
          </Text>
          <Column flex={1} justifyContent={"space-between"}>
            <Center>
              <Image mt={3} alt="" source={require("../../../../assets/take-pic.png")} />
              <IconButton
                mt={3}
                bg={"white"}
                _icon={{
                  as: MaterialIcons,
                  name: "add",
                  color: "#6B7280",
                  size: "md",
                }}
              />
            </Center>
            <Button mt={5} onPress={onConfirm}>
              Tiếp tục
            </Button>
          </Column>
        </Column>
      )}
    </>
  );
};

export default ProfileVerification;

const styles = StyleSheet.create({});
