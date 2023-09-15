import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { AlertDialog, Button, Center, Heading, Text } from "native-base";
import { useAppDispatch, useAppSelector } from "../store";
import { removePopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// TODO: Define Props

const SuccessPopup = ({ onCancel, onContinue }: any) => {
  const { popup } = useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();
  const cancelRef = React.useRef(null);
  const onClose = () => {
    dispatch(removePopup());
    if (onCancel) {
      onCancel();
    }
  };
  const onConfirm = () => {
    dispatch(removePopup());
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <AlertDialog
      isOpen={true}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.Body>
          {popup?.type === EPopupType.Success && (
            <Center pt={2}>
              <MaterialIcons
                name="check-circle-outline"
                size={50}
                color="#F8A01E"
              />
              <Heading fontSize={16} mt={3} fontWeight="500">
                {popup?.title}
              </Heading>
              <Text textAlign="center" fontSize={10} my={1} color="#6B7280">
                {popup?.desc}
              </Text>
              <TouchableOpacity onPress={onClose} style={{ marginVertical: 3 }}>
                <Text textAlign="center" color="#F8A01E">
                  Xong
                </Text>
              </TouchableOpacity>
            </Center>
          )}
          {popup?.type === EPopupType.Confirm && (
            <Center pt={3}>
              <Heading fontWeight="500" fontSize={16}>
                {popup?.title}
              </Heading>
              <Text textAlign="center" fontSize={10} my={1} color="#6B7280">
                {popup?.desc}
              </Text>
              <TouchableOpacity
                onPress={onConfirm}
                style={{ marginVertical: 7 }}
              >
                <Text textAlign="center" color="#F8A01E">
                  Xác nhận
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={{ marginVertical: 7 }}>
                <Text textAlign="center">Bỏ qua</Text>
              </TouchableOpacity>
            </Center>
          )}
        </AlertDialog.Body>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({});
