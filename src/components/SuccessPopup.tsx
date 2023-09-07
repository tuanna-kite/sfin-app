import { StyleSheet } from "react-native";
import React from "react";
import { AlertDialog, Button, Heading, Text } from "native-base";
import { useAppDispatch, useAppSelector } from "../store";
import { removePopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// TODO: Define Props

const SuccessPopup = ({ onCancel }: any) => {
  const { popup } = useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();
  const cancelRef = React.useRef(null);
  const onClose = () => {
    dispatch(removePopup());
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <AlertDialog isOpen={true} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Body>
          {popup?.type === EPopupType.Success ? (
            <MaterialIcons name="check-circle-outline" />
          ) : (
            <MaterialIcons name="error-outline" />
          )}
          <Heading>{popup?.desc}</Heading>
          <Text>{popup?.desc}</Text>
          <Button onPress={onClose}>Đóng</Button>
        </AlertDialog.Body>
       
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default SuccessPopup;

const styles = StyleSheet.create({});
