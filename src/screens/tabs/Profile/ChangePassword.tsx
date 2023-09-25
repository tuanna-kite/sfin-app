import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import { Button, Column, FormControl } from "native-base";
import FilledPasswordInput from "../../../components/ui/FilledPasswordInput";
import { useAppDispatch, useAppSelector } from "../../../store";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { setUser } from "../../../store/user.reducer";
import { UserProfile } from "../../../types/user";
import SuccessPopup from "../../../components/SuccessPopup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigations/config";
import { setPopup } from "../../../store/popup.reducer";
import { EPopupType } from "../../../types/popup";
import { changePasswordSchema, onInputChange } from "../../../utils/form";
import { ValidationError } from "yup";

type Props = {} & NativeStackScreenProps<RootStackParams, "ChangePassword">;

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  retypedPassword: string;
};

const ChangePassword = ({ navigation }: Props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    retypedPassword: "",
  });

  const dispatch = useAppDispatch();

  const { popup } = useAppSelector((state) => state.popup);
  const { user } = useAppSelector((state) => state.user);

  async function onChangePassword() {
    try {
      await changePasswordSchema.validate(formData);
      if (formData.newPassword !== formData.retypedPassword) {
        setMessage("Mật khẩu nhập lại không trùng khớp");
      } else {
        if (formData.currentPassword !== user!.password) {
          setMessage("Mật khẩu cũ không chính xác");
        } else {
          await updateDoc(doc(firebaseDb, "users", user!.phone), {
            password: formData.newPassword,
          });
          const docRef = doc(firebaseDb, "users", user!.phone);
          const data = {
            ...user!,
            password: formData.newPassword,
          };
          dispatch(setUser(data));
          dispatch(
            setPopup({
              type: EPopupType.Success,
              title: "Đổi mật khẩu thành công!",
            })
          );
        }
      }
    } catch (error) {
      Alert.alert("Thông báo", (error as ValidationError).message);
    }
  }

  return (
    <>
      <HeaderBackground text="Đổi mật khẩu" hasBack />
      {popup && <SuccessPopup onCancel={() => navigation.navigate("Home")} />}
      <Column px={5} pt={8} mb={5} justifyContent="space-between" flex={1}>
        <Column space={3}>
          <FilledPasswordInput
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            onDoChange={onInputChange<ChangePasswordForm>(
              "currentPassword",
              setFormData,
              formData
            )}
          />
          <FilledPasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            onDoChange={onInputChange<ChangePasswordForm>(
              "newPassword",
              setFormData,
              formData
            )}
          />
          <FilledPasswordInput
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            onDoChange={onInputChange<ChangePasswordForm>(
              "retypedPassword",
              setFormData,
              formData
            )}
          />
          <FormControl isInvalid>
            <FormControl.ErrorMessage>{message}</FormControl.ErrorMessage>
          </FormControl>
        </Column>
        <Button onPress={onChangePassword}>ĐỔI MẬT KHẨU</Button>
      </Column>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
