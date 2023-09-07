import { StyleSheet, ViewProps, ListRenderItem } from "react-native";
import React from "react";
import {
  Center,
  Column,
  Text,
  FlatList,
  Input,
  Box,
  Divider,
  Row,
  Icon,
  Image,
  IStackProps,
  Pressable,
} from "native-base";
import HeaderBackground from "../../components/ui/HeaderBackground";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";

type PackageTagProps = {
  id:string;
  packageName: string;
  paid: boolean;
  startDate: string;
  endDate?: string;
  _stack: IStackProps;
}& NativeStackScreenProps<RootStackParams, "Activities">;

const data = [
  {
    id: 1,
    packageName: "Gói 1 triệu",
    paid: false,
    startDate: "15/08/2023",
  },
  {
    id: 2,
    packageName: "Gói 1 triệu",
    paid: true,
    startDate: "15/08/2023",
    endDate: "15/08/2023",
  },
  {
    id: 3,
    packageName: "Gói 1 triệu",
    paid: true,
    startDate: "15/08/2023",
    endDate: "15/08/2023",
  },
  {
    id: 4,
    packageName: "Gói 1 triệu",
    paid: true,
    startDate: "15/08/2023",
    endDate: "15/08/2023",
  },
  {
    id: 5,
    packageName: "Gói 1 triệu",
    paid: true,
    startDate: "15/08/2023",
    endDate: "15/08/2023",
  },
  {
    id: 6,
    packageName: "Gói 1 triệu",
    paid: true,
    startDate: "15/08/2023",
    endDate: "15/08/2023",
  },
  {
    id: 7,
    packageName: "Gói 1 triệu",
    paid: true,
    startDate: "15/08/2023",
    endDate: "15/08/2023",
  },
];

const PackageTag = (props: PackageTagProps) => {
  const { packageName, paid, startDate, endDate, _stack } = props;
  // function toPaymentScreen(){
  //   navigation.navigate('Payment')
  // }
  // function onPaying(){
  //   if (paid){
  //     toPaymentScreen();
  //   }
  // }
  return (
      <Column my={3} bg="#F3F4F6" shadow={2} rounded="3xl" {..._stack}>
        <Row justifyContent="space-between" p={5}>
          <Text
            color="#F8A01E"
            fontSize={20}
            fontWeight={700}
            textAlign="center"
          >
            {packageName}
          </Text>
          <Text
            color={!paid ? "#DC2626" : "#16A34A"}
            fontSize={10}
            fontWeight={500}
            textAlign="center"
          >
            {!paid ? "Chưa thanh toán" : "Đã thanh toán"}
          </Text>
        </Row>

        <Divider></Divider>

        <Row justifyContent="space-between" p={5}>
          <Image source={require("../../../assets/credit-card.png")} alt="" />
          <Row>
            <Text
              color="#6B7280"
              fontSize={10}
              fontWeight={500}
              textAlign="center"
            >
              <Text
                color="#6B7280"
                fontSize={10}
                fontWeight={500}
                textAlign="center"
              >
                Vay
              </Text>
              {startDate}
            </Text>
            {paid && (
              <>
                <Divider orientation="vertical" mx={2}></Divider>
                <Text
                  color="#6B7280"
                  fontSize={10}
                  fontWeight={500}
                  textAlign="center"
                >
                  <Text
                    color="#6B7280"
                    fontSize={10}
                    fontWeight={500}
                    textAlign="center"
                  >
                    Ngày
                  </Text>
                  {endDate}
                </Text>
              </>
            )}
          </Row>
        </Row>
      </Column>
  );
};

const Activities = () => {
  const renderPackageTag: ListRenderItem<PackageTagProps> = ({ item }) => {
    return <PackageTag {...item} />;
  };
  return (
    <>
      <HeaderBackground text="Hoạt động"></HeaderBackground>
      <FlatList
        flex={1}
        px={5}
        mt={7}
        data={data}
        renderItem={renderPackageTag}
        keyExtractor={(item)=> item.id}
      />
    </>
  );
};

export default Activities;

const styles = StyleSheet.create({});
