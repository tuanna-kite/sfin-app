import { StyleSheet, ViewProps, ListRenderItem } from "react-native";
import React, { useState } from "react";
import {
  Column,
  Text,
  FlatList,
  Divider,
  Row,
  Image,
  IStackProps,
  Center,
  Heading,
} from "native-base";
import HeaderBackground from "../../components/ui/HeaderBackground";
import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { IDebt, getAllDebts } from "../../types/debt";
import LoadingOverlay from "../../components/LoadingOverlay";
import moment from "moment";

type PackageTagProps = {
  data: IDebt;
  _stack?: IStackProps;
};

let CurrencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});

const PackageTag = (props: PackageTagProps) => {
  const { data, _stack } = props;
  let status = "";
  let colorStatus = "";
  if (!data.accept) {
    status = "Đang xác nhận";
    colorStatus = "primary.600";
  } else if (data.paid) {
    status = "Đã thanh toán";
    colorStatus = "#16A34A";
  } else {
    status = "Chưa thanh toán";
    colorStatus = "#DC2626";
  }

  return (
    <Column my={3} bg="#F3F4F6" shadow={2} rounded="3xl" {..._stack}>
      <Row justifyContent="space-between" p={5}>
        <Text color="#F8A01E" fontSize={20} fontWeight={700} textAlign="center">
          {CurrencyFormat.format(data.loan)}
        </Text>
        <Text color={colorStatus} fontWeight={500} textAlign="center">
          {status}
        </Text>
      </Row>

      <Divider />

      <Row justifyContent="space-between" p={5}>
        <Image source={require("../../../assets/credit-card.png")} alt="" />
        <Row>
          <Text color="#6B7280" fontSize="sm" fontWeight={500} textAlign="center">
            Vay {moment(data.createdAt).format("DD/MM/YYYY")}
          </Text>
          {data.paid && (
            <>
              <Divider orientation="vertical" mx={2} />
              <Text color="#6B7280" fontSize={10} fontWeight={500}>
                Ngày {moment(data.paidDate).format("DD/MM/YYYY")}
              </Text>
            </>
          )}
        </Row>
      </Row>
    </Column>
  );
};

const Activities = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const [activites, setActivites] = useState<IDebt[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      async function loadDebts() {
        try {
          dispatch(setLoading());
          const debts = await getAllDebts(user!.phone);
          setActivites(debts);
        } catch (err) {
          console.error(err);
        } finally {
          dispatch(removeLoading());
        }
      }
      loadDebts();
    }, [])
  );

  const renderPackageTag: ListRenderItem<IDebt> = ({ item }) => {
    return <PackageTag data={item} />;
  };

  if (isLoading) {
    return <LoadingOverlay style={{ backgroundColor: "white" }} />;
  }
  return (
    <>
      <HeaderBackground text="Hoạt động" />
      {activites.length ? (
        <FlatList flex={1} px={5} mt={7} data={activites} renderItem={renderPackageTag} />
      ) : (
        <Center flex="1" bg="white">
          <Heading fontWeight="semibold" fontSize="xl" color="muted.400">
            Chưa có hoạt động nào
          </Heading>
        </Center>
      )}
    </>
  );
};

export default Activities;

const styles = StyleSheet.create({});
