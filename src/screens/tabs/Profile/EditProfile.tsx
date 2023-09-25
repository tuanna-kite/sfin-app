import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import {
  Avatar,
  Box,
  Button,
  Center,
  CheckIcon,
  Column,
  FormControl,
  Icon,
  IconButton,
  Image,
  Input,
  Pressable,
  Select,
} from "native-base";
import PrimaryInput from "../../../components/ui/PrimaryInput";
import moment from "moment";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../store";
import * as ImagePicker from "expo-image-picker";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { uploadImage } from "../../../types/image";
import { deleteObject, ref } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { setUser } from "../../../store/user.reducer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabsParams, RootStackParams } from "../../../navigations/config";
import { EGender, UserProfile } from "../../../types/user";
import { removePopup, setPopup } from "../../../store/popup.reducer";
import { EPopupType } from "../../../types/popup";
import SuccessPopup from "../../../components/SuccessPopup";
import FormDatePicker from "../../../components/ui/FormDatePicker";
import GenderSelect from "../../../components/ui/GenderSelect";

type Props = {} & NativeStackScreenProps<RootStackParams, "EditProfile">;

type ProfileForm = {
  userName: string;
  birthday: Date;
  gender: EGender;
  school: string;
};

export function onInputChange<FieldType>(
  field: keyof FieldType,
  setDataForm: any,
  dataForm: FieldType
) {
  return function (value: any) {
    setDataForm({
      ...dataForm,
      [field]: value,
    });
  };
}

const EditProfile = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { popup } = useAppSelector((state) => state.popup);

  const [image, setImage] = useState<string | null>(user?.avatarUrl || null);

  const [formData, setFormData] = useState<ProfileForm>({
    userName: user!.userName,
    birthday: new Date(user!.birthday),
    gender: user!.gender,
    school: user!.school,
  });

  const dispatch = useAppDispatch();

  async function updateData() {
    const docRef = doc(firebaseDb, "users", user!.phone);
    const data = {
      ...user!,
      ...formData,
      birthday: moment(formData.birthday).format("DD - MM - YYYY"),
      gender: formData.gender === EGender.M ? "Male" : "Female"
    };
    const userData = {
      ...user!,
      ...formData,
      birthday: moment(formData.birthday).format("YYYY-MM-DD"),
    }
    await updateDoc(docRef, data);
    dispatch(setUser(userData));
    navigation.navigate("TabNav");
  }

  function onFinish() {
    dispatch(
      setPopup({
        type: EPopupType.Confirm,
        desc: "Bạn có chắc chắn muốn thay đổi thông tin?",
        title: "Sửa thông tin",
      })
    );
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      try {
        const imageUri = result.assets[0].uri;
        dispatch(setLoading());
        const { imageName, imageUrl } = await uploadImage(imageUri);
        if (user?.avatarName) {
          await deleteObject(ref(firebaseStorage, user.avatarName));
        }
        await updateDoc(doc(firebaseDb, "users", user!.phone), {
          avatarUrl: imageUrl,
          avatarName: imageName,
        });
        dispatch(
          setUser({ ...user!, avatarUrl: imageUrl, avatarName: imageName })
        );
        setImage(imageUrl);
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }
  };

  return (
    <>
      <HeaderBackground text="Sửa thông tin" hasBack />
      {popup && (
        <SuccessPopup
          onCancel={() => dispatch(removePopup())}
          onContinue={updateData}
        />
      )}
      <Column p={5} mb={5} flex={1} justifyContent="space-between">
        <Column w="100%" alignItems="center" space={2}>
          <Column rounded="full">
            {image ? (
              <Avatar size="2xl" source={{ uri: image }} />
            ) : (
              <Center bg="white" rounded="full" w="32" h="32">
                <Ionicons name="person-outline" color="gray" size={32} />
              </Center>
            )}
            <IconButton
              _pressed={{ bg: "coolGray.300" }}
              position="absolute"
              variant="solid"
              bg="white"
              w="8"
              h="8"
              rounded="full"
              bottom={0}
              right={0}
              icon={
                <Icon
                  size="md"
                  as={Ionicons}
                  name="camera-outline"
                  color="red"
                />
              }
              onPress={pickImage}
            />
          </Column>
          <PrimaryInput
            label="Họ tên"
            placeholder="Vui lòng nhập họ và tên"
            onChangeText={onInputChange<ProfileForm>(
              "userName",
              setFormData,
              formData
            )}
            value={formData.userName}
          />
          <PrimaryInput
            label="Trường học"
            placeholder="Vui lòng nhập tên trường"
            onChangeText={onInputChange<ProfileForm>(
              "school",
              setFormData,
              formData
            )}
            value={formData.school}
          />
          <FormDatePicker
            value={formData.birthday}
            onChange={onInputChange<ProfileForm>(
              "birthday",
              setFormData,
              formData
            )}
          />
          <GenderSelect
            selected={formData.gender === EGender.M ? "Male" : "Female"}
            onChange={onInputChange<ProfileForm>(
              "gender",
              setFormData,
              formData
            )}
          />
        </Column>
        <Button onPress={onFinish}>XONG</Button>
      </Column>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
