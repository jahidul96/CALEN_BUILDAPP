import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { ProfileComp, NormalBtn } from "./Reuse/Reuse";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import COLORS from "../Colors/COLORS";
import { useNavigation } from "@react-navigation/native";
import Context from "../../context/Context";
import GroupList from "./GroupList";

const DrawerTab = ({ toggleNav, mygroups, setGroupIndex }) => {
  const navigation = useNavigation();
  const { loggedUser } = useContext(Context);

  // console.log("mygroups", mygroups);

  const navigateFunc = (t) => {
    if (t == "Account") {
      navigation.navigate("Account");
      toggleNav();
    } else if (t == "Home") {
      navigation.navigate("Home");
      toggleNav();
    } else {
      navigation.navigate("CreateGroup");
      toggleNav();
    }
  };
  return (
    <View style={styles.container}>
      <ProfileComp
        name={loggedUser ? loggedUser.username : "User"}
        email={loggedUser ? loggedUser.email : "yourEmail@gmail.com"}
        onPress={() => navigateFunc("Account")}
        pic={loggedUser?.imgUrl}
      />

      <View style={{ marginVertical: 10 }}>
        <DrawerTabItem
          text="CREATE GROUP"
          onPress={() => navigateFunc("CreateGroup")}
        />
      </View>
      <ScrollView>
        {mygroups.map((groupData, index) => (
          <GroupList
            key={groupData.id}
            groupData={groupData}
            toggleNav={toggleNav}
            index={index}
            setGroupIndex={setGroupIndex}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const DrawerTabItem = ({ onPress, text }) => (
  <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
    <AntDesign name="plus" size={22} color={COLORS.lightBlue} />
  </TouchableOpacity>
);

export default DrawerTab;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingRight: 18,
  },
  btnContainer: {
    width: "75%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    fontFamily: "Poppins-Regular",
    color: COLORS.lightBlue,
  },
  extraGroupStyle: {
    marginBottom: 20,
  },
});
