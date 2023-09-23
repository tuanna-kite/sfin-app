import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import {
  Avatar,
  Box,
  Button,
  CheckCircleIcon,
  Column,
  Icon,
  IconButton,
  Image,
  Pressable,
  Row,
  Text,
} from "native-base";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabsParams, RootStackParams } from "../../../navigations/config";
import { useAppDispatch, useAppSelector } from "../../../store";
import { removeUser, setUser } from "../../../store/user.reducer";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { uploadImage } from "../../../types/image";
import { deleteObject, ref } from "firebase/storage";
import { firebaseDb, firebaseStorage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

type Props = {} & CompositeScreenProps<
  NativeStackScreenProps<RootStackParams>,
  BottomTabScreenProps<BottomTabsParams, "Profile">
>; // TODO: Change to BottomTabs

const Profile = ({ navigation }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string | null>(user!.avatarUrl || null);

  function onLoggedOut() {
    dispatch(removeUser());
  }

  function onProfileVerify() {
    navigation.navigate("ProfileVerification", { onPaymentRequest: false });
  }
  function onChangePassword() {
    navigation.navigate("ChangePassword");
  }
  function onEditProfile() {
    navigation.navigate("EditProfile");
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
      <HeaderBackground text="Thông tin" />
      <Column px={5} mb={5} flex={1} justifyContent="space-between">
        <Box>
          <Row space={"7"} my={7}>
            <Column rounded="full">
              <Avatar source={{ uri: user!.avatarUrl }} size="2xl" />
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
            <Column>
              <Text fontWeight={500} fontSize={16}>
                {user?.userName}
              </Text>
              {user?.verified ? (
                <Row alignItems="flex-end"  mt={1}
                mb={4} space={2}>
                  <Text
                    fontWeight={500}
                    fontSize={10}
                    textAlign={"center"}
                    color="#22C55E"

                  >
                    Đã xác thực
                  </Text>
                  <Icon as={<AntDesign name="checkcircle" />} size="xs" color="#22C55E"/>
                </Row>
              ) : (
                <Text
                  fontWeight={500}
                  fontSize={10}
                  color="#9CA3AF"
                  mt={1}
                  mb={4}
                >
                  Chưa xác thực
                </Text>
              )}
              <Button
                onPress={onEditProfile}
                rightIcon={<Icon as={<MaterialIcons name="edit" />} />}
              >
                Sửa thông tin
              </Button>
            </Column>
          </Row>
          <Column space={5}>
            <Pressable onPress={onProfileVerify}>
              <Row
                bg="white"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                shadow={2}
                rounded={"md"}
              >
                <Text fontSize={16}>Hồ sơ xác thực</Text>
                <Icon as={<MaterialIcons name="chevron-right" />} size={"lg"} />
              </Row>
            </Pressable>
            <Pressable>
              <Row
                bg="white"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                shadow={2}
                rounded={"md"}
              >
                <Text fontSize={16}>Trợ giúp và phản hồi</Text>
                <Icon as={<MaterialIcons name="chevron-right" />} size={"lg"} />
              </Row>
            </Pressable>
            <Pressable onPress={onChangePassword}>
              <Row
                bg="white"
                justifyContent="space-between"
                alignItems="center"
                p={3}
                shadow={2}
                rounded={"md"}
              >
                <Text fontSize={16}>Mật khẩu</Text>
                <Icon as={<MaterialIcons name="chevron-right" />} size={"lg"} />
              </Row>
            </Pressable>
          </Column>
        </Box>
        <Button onPress={onLoggedOut}>ĐĂNG XUÂT</Button>
      </Column>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
