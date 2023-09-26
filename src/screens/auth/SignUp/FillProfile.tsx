import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Button, Column, Text } from "native-base";
import PrimaryInput from "../../../components/ui/PrimaryInput";
import moment from "moment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../../navigations/config";
import { EGender, UserProfile } from "../../../types/user";
import { fillProfileSchema, onInputChange } from "../../../utils/form";
import FormDatePicker from "../../../components/ui/FormDatePicker";
import GenderSelect from "../../../components/ui/GenderSelect";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../../firebase";
import { useAppDispatch } from "../../../store";
import { setUser } from "../../../store/user.reducer";
import { ValidationError } from "yup";

type Props = {} & NativeStackScreenProps<AuthStackParams, "FillProfile">;

type FillProfileForm = {
  userName: string;
  school: string;
  birthday: Date;
  gender: EGender;
};

const FillProfile = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();

  const { phone, password } = route.params;

  const [formData, setFormData] = useState<FillProfileForm>({
    userName: "",
    school: "",
    birthday: new Date(),
    gender: EGender.M,
  });

  async function updateData() {
    try {
      await fillProfileSchema.validate(formData);
      const age = moment(new Date()).diff(formData.birthday, "year");
      if (age < 18 || age > 25) {
        throw Error("Bạn cần trong độ tuổi sinh viên");
      }
      const docRef = doc(firebaseDb, "users", phone);
      const docData = {
        phone,
        password,
        ...formData,
        birthday: moment(formData.birthday).format("DD-MM-YYYY"),
        gender: formData.gender === EGender.M ? "Male" : "Female",
        verified: false,
      };
      const userData = {
        phone,
        password,
        ...formData,
        birthday: moment(formData.birthday).format("YYYY-MM-DD"),
      };
      await setDoc(docRef, docData);
      dispatch(setUser(userData as UserProfile));
    } catch (error) {
      Alert.alert("Thông báo", (error as ValidationError).message);
    }
  }

  return (
    <Column flex={1}>
      <Box alignItems="center" justifyContent="flex-end" height={88}>
        <Text fontSize={16} fontWeight={500} color="#111827">
          Thông tin cá nhân
        </Text>
      </Box>
      <Text fontSize={14} textAlign="center" paddingTop={30}>
        Vui lòng điền các thông tin sau
      </Text>
      <Box style={styles.inputContainer}>
        <Column space={2}>
          <PrimaryInput
            autoCapitalize="words"
            label="Họ tên"
            placeholder="Vui lòng nhập họ và tên"
            onChangeText={onInputChange<FillProfileForm>("userName", setFormData, formData)}
            value={formData.userName}
          />
          <PrimaryInput
            label="Trường học"
            placeholder="Vui lòng nhập tên trường"
            onChangeText={onInputChange<FillProfileForm>("school", setFormData, formData)}
            value={formData.school}
          />
          <FormDatePicker
            value={formData.birthday}
            onChange={onInputChange<FillProfileForm>("birthday", setFormData, formData)}
          />
          <GenderSelect
            selected={formData.gender === EGender.M ? "Nam" : "Nữ"}
            onChange={onInputChange<FillProfileForm>("gender", setFormData, formData)}
          />

          <Button rounded="lg" color="#F8A01E" marginTop={240} onPress={updateData}>
            TIẾP TỤC
          </Button>
        </Column>
      </Box>
    </Column>
  );
};

export default FillProfile;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    marginTop: 20,
  },
});
