import { ListRenderItem, StyleSheet } from "react-native";
import React from "react";
import HeaderBackground from "../../components/ui/HeaderBackground";
import { Box, Column, FlatList, IStackProps, Icon, Row, Text } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  id: number;
  content: string;
  time: string;
  _stack: IStackProps;
} & NativeStackScreenProps<RootStackParams, "Notifications">;

const data = [
  {
    id: 1,
    content:
      "Gói vay 1 triệu của bạn đã được phê duyệt. Tiền đã được chuyển vào tài khoản momo của bạn.",
    time: "1 giờ trước",
  },
  {
    id: 2,
    content:
      "Bạn đã đăng ký gói vay 1 triệu. Chúng tôi sẽ tiến hành kiểm tra và phê duyệt gói vay của bạn.",
    time: "1 giờ trước",
  },
  {
    id: 3,
    content:
      "Bạn có một khoản vay sắp đến hạn thanh toán. Vui lòng thanh toán trước ngày 15/09/2023",
    time: "1 giờ trước",
  },
  {
    id: 4,
    content:
      "Bạn có một khoản vay sắp đến hạn thanh toán. Vui lòng thanh toán trước ngày 15/09/2023",
    time: "1 giờ trước",
  },
  {
    id: 5,
    content:
      "Gói vay 1 triệu của bạn đã được phê duyệt. Tiền đã được chuyển vào tài khoản momo của bạn.",
    time: "1 giờ trước",
  },
];

const NotificationTags = (props: Props) => {
  const { content, time } = props;
  return (
    <Column py={3} my={1} >
      <Text>{content}</Text>
      <Row alignItems='center' space={2}>
        <Icon as={<MaterialIcons name="schedule"/>} color='#9CA3AF' />
        <Text fontSize={12} color='#9CA3AF'>{time}</Text>
      </Row>
    </Column>
  );
};

const Notification = () => {
  const renderNotiTags: ListRenderItem<Props> = ({ item }) => {
    return <NotificationTags {...item} />;
  };

  return (
    <>
      <HeaderBackground text="Thông báo" />
      <FlatList
        p={3}
        data={data}
        renderItem={renderNotiTags}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={()=> <Box h={0.5} bg='white'></Box>}
      />
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({});
