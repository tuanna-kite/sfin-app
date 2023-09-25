import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import {
  Button,
  Center,
  Column,
  IconButton,
  Image,
  Pressable,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigations/config";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setPopup } from "../../../store/popup.reducer";
import { EPopupType } from "../../../types/popup";
import { setError } from "../../../store/error.reducer";
import SuccessPopup from "../../../components/SuccessPopup";
import * as ImagePicker from "expo-image-picker";
import { removeLoading, setLoading } from "../../../store/loading.reducer";
import { uploadImage } from "../../../types/image";
import { deleteObject, ref } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../../../firebase";
import { setUser } from "../../../store/user.reducer";
import LoadingOverlay from "../../../components/LoadingOverlay";

type Props = {} & NativeStackScreenProps<
  RootStackParams,
  "ProfileVerification"
>;

const ProfileVerification = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { popup } = useAppSelector((state) => state.popup);
  const { user } = useAppSelector((state) => state.user);

  const request = route.params.onPaymentRequest;

  const pickIdImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      orderedSelection: true,
      selectionLimit: 2,
    });
    if (!result.canceled) {
      try {
        const frontIdUri = result.assets[0].uri;
        const backIdUri = result.assets[1].uri;
        dispatch(setLoading());
        const frontImage = await uploadImage(frontIdUri);
        const backImage = await uploadImage(backIdUri);

        if (user?.frontIdName) {
          await deleteObject(ref(firebaseStorage, user.frontIdName));
        }
        if (user?.backIdName) {
          await deleteObject(ref(firebaseStorage, user.backIdName));
        }
        await updateDoc(doc(firebaseDb, "users", user!.phone), {
          frontIdUrl: frontImage.imageUrl,
          frontIdName: frontImage.imageName,
          backIdUrl: backImage.imageUrl,
          backIdName: backImage.imageName,
        });
        dispatch(
          setUser({
            ...user!,
            frontIdUrl: frontImage.imageUrl,
            frontIdName: frontImage.imageName,
            backIdUrl: backImage.imageUrl,
            backIdName: backImage.imageName,
          })
        );
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }
  };

  const pickPersonalImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
    });
    if (!result.canceled) {
      try {
        const frontPersonalUri = result.assets[0].uri;
        dispatch(setLoading());
        const frontImage = await uploadImage(frontPersonalUri);

        if (user?.frontPersonalName) {
          await deleteObject(ref(firebaseStorage, user.frontPersonalName));
        }

        await updateDoc(doc(firebaseDb, "users", user!.phone), {
          frontPersonalUrl: frontImage.imageUrl,
          frontPersonalName: frontImage.imageName,
        });
        dispatch(
          setUser({
            ...user!,
            frontPersonalUrl: frontImage.imageUrl,
            frontPersonalName: frontImage.imageName,
          })
        );
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }
  };

  const pickSchoolRecord = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
    });
    if (!result.canceled) {
      try {
        const recordUri = result.assets[0].uri;
        dispatch(setLoading());
        const image = await uploadImage(recordUri);

        if (user?.schoolRecordName) {
          await deleteObject(ref(firebaseStorage, user.schoolRecordName));
        }

        await updateDoc(doc(firebaseDb, "users", user!.phone), {
          schoolRecordName: image.imageName,
          schoolRecordUrl: image.imageUrl,
        });
        dispatch(
          setUser({
            ...user!,
            schoolRecordName: image.imageName,
            schoolRecordUrl: image.imageUrl,
          })
        );
      } catch (err) {
        Alert.alert("Thông báo", (err as any).message);
      } finally {
        dispatch(removeLoading());
      }
    }
  };

  async function updateVerified() {
    await updateDoc(doc(firebaseDb, "users", user!.phone), {
      verify: "verified",
    });
    dispatch(
      setUser({
        ...user!,
        verified: true,
      })
    );
  }

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
      navigation.navigate("LoanRequest", { loan: route.params.loan });
    }
  }
  const [page, setPage] = useState(1);
  return (
    <>
      <HeaderBackground text="Hồ sơ xác thực" hasBack />

      {popup && (
        <SuccessPopup
          onCancel={() => {
            navigation.navigate("TabNav");
            updateVerified();
          }}
        />
      )}
      {page === 1 && (
        <Column mx={4} justifyContent="center" pt={7}>
          <Text fontWeight={700} fontSize={16} textAlign={"center"}>
            Hình ảnh CCCD
          </Text>
          <Text fontSize={10} color="#6B7280" px={10} textAlign={"center"}>
            Chúng tôi cần biết bạn là ai để xác minh danh tính. Vui lòng cung
            cấp hình ảnh trong điều kiện đầy đủ ánh sáng để hệ thống quét thông
            tin được chính xác.
          </Text>
          <Center>
            <Pressable onPress={pickIdImage}>
              {!user?.frontIdUrl ? (
                <Image
                  mt={3}
                  alt=""
                  source={require("../../../../assets/take-pic.png")}
                />
              ) : (
                <Image
                  mt={3}
                  alt=""
                  size={"2xl"}
                  source={{ uri: user!.frontIdUrl }}
                />
              )}
            </Pressable>
            <Pressable onPress={pickIdImage}>
              {!user?.frontIdUrl ? (
                <Image
                  mt={3}
                  alt=""
                  source={require("../../../../assets/take-pic.png")}
                />
              ) : (
                <Image
                  mt={3}
                  alt=""
                  size={"2xl"}
                  source={{ uri: user!.backIdUrl }}
                />
              )}
            </Pressable>
          </Center>
          <Button mt={5} onPress={onNextPage}>
            Tiếp tục
          </Button>
        </Column>
      )}
      {page === 2 && (
        <Column mx={4} justifyContent="center" pt={7} mb={12} flex={1}>
          <Text fontWeight={700} fontSize={16} textAlign={"center"}>
            Ảnh cá nhân kèm CCCD
          </Text>
          <Text fontSize={10} color="#6B7280" px={10} textAlign={"center"}>
            Vui lòng cung cấp hình ảnh cá nhân kèm ảnh CCCD trước ngực trong
            điều kiện đầy đủ ánh sáng để hệ thống quét thông tin được chính xác.
          </Text>
          <Column flex={1} justifyContent="space-between">
            <Center>
              <Pressable onPress={pickPersonalImage}>
                {!user?.frontPersonalUrl ? (
                  <Image
                    mt={3}
                    alt=""
                    source={require("../../../../assets/take-pic.png")}
                  />
                ) : (
                  <Image
                    mt={3}
                    alt=""
                    size={"2xl"}
                    source={{ uri: user!.frontPersonalUrl }}
                  />
                )}
              </Pressable>
            </Center>
            <Button mt={5} onPress={onNextPage}>
              Tiếp tục
            </Button>
          </Column>
        </Column>
      )}
      {page === 3 && (
        <Column mx={4} pt={7} flex={1} mb={12}>
          <Text fontWeight={700} fontSize={16} textAlign={"center"}>
            Hình ảnh bảng điểm
          </Text>
          <Text fontSize={10} color="#6B7280" px={10} textAlign={"center"}>
            Vui lòng cung cấp hình ảnh bảng điểm có xác nhận của nhà trường
            trong điều kiện đầy dủ ánh sáng để hệ thống quét thông tin được
            chính xác.
          </Text>
          <Column flex={1} justifyContent={"space-between"}>
            <Center>
              <Pressable onPress={pickSchoolRecord}>
                {!user?.schoolRecordUrl ? (
                  <Image
                    mt={3}
                    alt=""
                    source={require("../../../../assets/take-pic.png")}
                  />
                ) : (
                  <Image
                    mt={3}
                    alt=""
                    size={"2xl"}
                    source={{ uri: user!.schoolRecordUrl }}
                  />
                )}
              </Pressable>
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
