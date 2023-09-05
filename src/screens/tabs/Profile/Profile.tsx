import { StyleSheet } from "react-native";
import React from "react";
import HeaderBackground from "../../../components/ui/HeaderBackground";
import {
  Avatar,
  Box,
  Button,
  Column,
  Icon,
  Image,
  Pressable,
  Row,
  Text,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../../navigations/config";

type Props = {} & NativeStackScreenProps<RootStackParams, "Profile">;

const Profile = ({ navigation }: Props) => {
  function onProfileVerify() {
    navigation.navigate("ProfileVerification");
  }
  function onChangePassword() {
    navigation.navigate("ChangePassword");
  }
  function onEditProfile() {
    navigation.navigate("EditProfile");
  }
  return (
    <>
      <HeaderBackground text="Thông tin" />
      <Column px={5} mb={5} flex={1} justifyContent="space-between">
        <Box>
          <Row space={"7"} my={7}>
            <Image source={require("../../../../assets/avatar.png")} />
            <Column>
              <Text fontWeight={500} fontSize={16}>
                Jordyn Calzoni
              </Text>
              <Text
                fontWeight={500}
                fontSize={10}
                color="#9CA3AF"
                mt={1}
                mb={4}
              >
                Chưa xác thực
              </Text>
              <Button onPress={onEditProfile} rightIcon={<Icon as={<MaterialIcons name="edit" />} />}>
                Sửa thông tin
              </Button>
            </Column>
          </Row>
          <Column space={5}>
            <Pressable onPress={onProfileVerify}>
              <Row
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
        <Button>Đăng xuất</Button>
      </Column>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
