import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Tag } from "./TimelinePostSubComp";
import COLORS from "../Colors/COLORS";
import { useNavigation } from "@react-navigation/native";

const img =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOUOgOXlM3N-FOMuEhE9-8zr6loeh8dsalA&usqp=CAU";

const tags = ["#local", "#funny"];

const Group = ({ groupData }) => {
  const navigation = useNavigation();
  const { value } = groupData;
  const id = groupData.id;

  // console.log("groupData", groupData);

  const seeGroupImage = () => {
    navigation.navigate("GroupAllFile", { value, id });
  };

  const gotoDetails = () => {
    navigation.navigate("Groupdetails", { groupData });
  };
  return (
    <TouchableOpacity style={styles.groupContainer} onPress={gotoDetails}>
      <Image source={{ uri: value.groupImage }} style={styles.GroupimgStyle} />
      <View style={styles.groupRightContainer}>
        <Text style={styles.name}>{value.groupname}</Text>
        <Text style={styles.tabitemText}>{value.createdBy}</Text>
        <View style={{ marginTop: 0 }}>
          <Tag tags={value.tags} onPress={seeGroupImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Group;

const styles = StyleSheet.create({
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  tabitemText: {
    marginBottom: 3,
    fontFamily: "Poppins-Regular",
    color: COLORS.darkGray,
  },
  groupContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  GroupimgStyle: {
    width: "35%",
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 5,
  },
  groupRightContainer: {
    marginLeft: 20,
  },
});
