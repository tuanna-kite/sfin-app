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
} from "native-base";
import HeaderBackground from "../../components/ui/HeaderBackground";
import { MaterialIcons } from "@expo/vector-icons";

type PackageTagProps = {
  packageName: string;
  paid: boolean;
  startDate: string;
  endDate?: string;
};

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
  const { packageName, paid, startDate, endDate } = props;
  return (
    <Center w="100%" h="20%" bg="#F3F4F6" shadow={2} rounded="3xl">
      <Box flex={1} w="100%">
        <Center flex={1}>
          <Row justifyContent="space-between" w="85%">
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
        </Center>
      </Box>
      <Divider></Divider>
      <Box flex={1} w="100%">
        <Center flex={1}>
          <Row justifyContent="space-between" w="85%">
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
              )}
            </Row>
          </Row>
        </Center>
      </Box>
    </Center>
  );
};

const Activities = () => {
  const renderPackageTag: ListRenderItem<PackageTagProps>=({item})=>{
    return <PackageTag {...item} />
  }
  return (
    <>
      <HeaderBackground text="Hoạt động"></HeaderBackground>
      <Column bg={"amber.100"} flex={1} mx={5} mt={10}>
        <FlatList
          data={data}
          renderItem={renderPackageTag}
        />
      </Column>
    </>
  );
};

export default Activities;

const styles = StyleSheet.create({});
