import { StyleSheet } from "react-native";
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

type Props = {} & NativeStackScreenProps<RootStackParams,"ChangePassword">

const ChangePassword = ({navigation}:Props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const { popup } = useAppSelector((state) => state.popup);
  const { user } = useAppSelector((state) => state.user);
  async function onChangePassword() {
    if (newPassword !== retypedPassword) {
      setMessage("Mật khẩu nhập lại không trùng khớp");
    } else {
      if (currentPassword !== user?.password) {
        setMessage("Mật khẩu cũ không chính xác");
      } else {
        await updateDoc(doc(firebaseDb, "users", user!.phone), {
          password: newPassword,
        });
        const docRef = doc(firebaseDb, "users", user!.phone);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        dispatch(setUser(data as UserProfile));
        dispatch(setPopup({type:EPopupType.Success,title:"Đổi mật khẩu thành công!"}))
      }
    }
  }

  return (
    <>
      <HeaderBackground text="Đổi mật khẩu" hasBack />
      {popup && <SuccessPopup onCancel={()=>navigation.navigate("Home")}/>}
      <Column px={5} pt={8} mb={5} justifyContent="space-between" flex={1}>
        <Column space={3}>
          <FilledPasswordInput
            label="Mật khẩu cũ"
            placeholder="Nhập mật khẩu cũ"
            onChangeText={setCurrentPassword}
          />
          <FilledPasswordInput
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            onChangeText={setNewPassword}
          />
          <FilledPasswordInput
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            onChangeText={setRetypedPassword}
          />
          <FormControl isInvalid>
            <FormControl.ErrorMessage>
              {message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Column>
        <Button onPress={onChangePassword}>ĐỔI MẬT KHẨU</Button>
      </Column>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
