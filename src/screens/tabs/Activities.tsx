import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Input } from "native-base";

const Activities = () => {
  return (
    <View>
      <Input variant={'underlined'} placeholder="Password" secureTextEntry={true}/>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({});


