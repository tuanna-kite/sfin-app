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
import { UserProfile } from "../../../types/user";
import { removePopup, setPopup } from "../../../store/popup.reducer";
import { EPopupType } from "../../../types/popup";
import SuccessPopup from "../../../components/SuccessPopup";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type Props = {} & NativeStackScreenProps<RootStackParams,"EditProfile">;

const EditProfile = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const { popup } = useAppSelector((state) => state.popup);

  const [gender, setGender] = useState(user!.gender);
  const [dateShown, setDateShown] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(user!.birthDay);
  const [name, setName] = useState(user!.userName);
  const [schoolName, setSchoolName] = useState(user!.school);

  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>(user!.avatarUrl || null);

  async function updateData() {
    await updateDoc(doc(firebaseDb, "users", user!.phone), {
      userName: name,
      school: schoolName,
      birthDay: dateOfBirth,
      gender: gender,
    });
    const docRef = doc(firebaseDb, "users", user!.phone);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    dispatch(setUser(data as UserProfile));
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

  function dateShownHandler() {
    setDateShown(!dateShown);
  }
  function onChangeDate({ type }: DateTimePickerEvent, selectedDate: Date) {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      dateShownHandler();
    } else {
      dateShownHandler();
    }
    setDateOfBirth(moment(date).format("DD/MM/YYYY"));
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
      <HeaderBackground text="Sửa thông tin" />
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
            onChangeText={setName}
            value={name}
          />
          <PrimaryInput
            label="Trường học"
            placeholder="Vui lòng nhập tên trường"
            onChangeText={setSchoolName}
            value={schoolName}
          />
          {dateShown && (
            <RNDateTimePicker
              mode="date"
              display="calendar"
              value={date}
              onChange={onChangeDate}
              positiveButton={{ label: "Select" }}
            />
          )}
          <FormControl>
            <FormControl.Label>Ngày sinh</FormControl.Label>
            <Box shadow={2}>
              <Pressable onPress={dateShownHandler}>
                <Input
                  value={dateOfBirth}
                  isReadOnly
                  placeholder="Ngày sinh"
                  variant="filled"
                  InputRightElement={
                    <Icon
                      as={<MaterialIcons name="expand-more" />}
                      size={10}
                      ml="1"
                    />
                  }
                />
              </Pressable>
            </Box>
          </FormControl>
          <FormControl>
            <FormControl.Label>Giới tính</FormControl.Label>
            <Box shadow={2}>
              <Select
                variant="filled"
                selectedValue={gender}
                placeholder="Giới tính"
                _selectedItem={{ endIcon: <CheckIcon size={5} /> }}
                mt={1}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Select.Item label="Nam" value="Nam" />
                <Select.Item label="Nữ" value="Nữ" />
              </Select>
            </Box>
          </FormControl>
        </Column>
        <Button onPress={onFinish}>XONG</Button>
      </Column>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
