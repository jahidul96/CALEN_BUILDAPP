import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../Colors/COLORS";

const Picker = ({ data, onPress, show, setShow, groupname }) => {
  //   console.log("data ==============>>>>>", data);

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setShow(!show);
        }}
      >
        <Text style={styles.groupname}>{groupname ? groupname : "Groups"}</Text>
        <AntDesign name="caretdown" />
      </TouchableOpacity>
      {show ? (
        <ScrollView style={styles.listWrapper}>
          <View>
            {data.map((group, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => onPress(group.value.groupname, group.id)}
              >
                <Text style={styles.text}>{group.value.groupname}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  listWrapper: {
    position: "absolute",
    top: 40,
    left: 0,
    width: "100%",
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 10,
    padding: 15,
  },
  groupname: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  text: {
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 5,
  },
});
