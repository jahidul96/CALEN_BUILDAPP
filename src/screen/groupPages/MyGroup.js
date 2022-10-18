import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  AppBar,
  LoadingComp,
  NormalBtn,
  ProfileComp,
} from "../../component/Reuse/Reuse";
import COLORS from "../../Colors/COLORS";
import AntDesign from "react-native-vector-icons/AntDesign";
import Context from "../../../context/Context";
import {
  deleteFromFb,
  deleteGroupAllPost,
  getSingleGroup,
} from "../../firebase/FireStore/FirestoreFunc";

const MyGroup = ({ route }) => {
  const navigation = useNavigation();
  const [group, setGroup] = useState(null);
  const { id } = route.params;
  const [uploading, setUploading] = useState(false);

  // console.log(id);
  // console.log(group);

  useEffect(() => {
    if (id == null) {
      return setGroup([]);
    } else {
      getSingleGroup(id, setGroup);
    }
  }, []);

  const deleteGroup = () => {
    setUploading(true);
    const collectionname = "Groups";
    deleteFromFb(id, collectionname)
      .then(() => {
        deleteGroupAllPost(id);
        setUploading(false);
        Alert.alert("GROUP DELETED");
        navigation.navigate("Home");
      })
      .catch((err) => {
        setUploading(false);
        Alert.alert("something went wrong!");
      });
  };

  //   console.log("groupfulldata", group);

  const { loggedUser } = useContext(Context);
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <View style={styles.topBarWrapper}>
        <AppBar navigation={navigation} />
      </View>
      {group?.length == 0 ? (
        <EmptyGroupComp navigation={navigation} />
      ) : (
        <ScrollView>
          {uploading && <LoadingComp />}
          <View style={styles.groupNameContainer}>
            <Text style={styles.name}>{group?.groupname}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.member}>{group?.participents?.length}</Text>
              <Text style={[styles.member, { marginLeft: 3 }]}>
                people in the group
              </Text>
            </View>
          </View>

          <View style={styles.middleContentWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddToGroup", { id, group })}
              style={styles.addPeopleContainer}
            >
              <AntDesign
                name="pluscircleo"
                size={26}
                color={COLORS.lightBlue}
              />
              <Text style={styles.addTExt}>Add people</Text>
            </TouchableOpacity>
            <View style={styles.profileWrapper}>
              <ProfileComp
                name={loggedUser ? loggedUser.username : "User"}
                email={loggedUser ? loggedUser.email : "yourEmail@gmail.com"}
                pic={loggedUser?.imgUrl}
                text={"Owner"}
              />
            </View>
            {group?.participents?.map((addeduser, i) => (
              <GroupMember key={i} addeduser={addeduser} />
            ))}
          </View>

          <View style={styles.middleContentWrapper}>
            <NormalBtn
              text="Delete Group"
              extratextStyle={{ color: "#000" }}
              onPress={deleteGroup}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyGroup;

const EmptyGroupComp = ({ navigation }) => (
  <View style={styles.emptyGroupContainer}>
    <Text style={styles.name}>NO GROUP TILL NOW</Text>
    <TouchableOpacity
      onPress={() => navigation.navigate("CreateGroup")}
      style={[styles.addPeopleContainer, { marginTop: 15 }]}
    >
      <AntDesign name="pluscircleo" size={26} color={COLORS.lightBlue} />
      <Text style={styles.addTExt}>CREATE</Text>
    </TouchableOpacity>
  </View>
);

const GroupMember = ({ addeduser }) => (
  <View style={styles.GroupMemberContainer}>
    <View style={styles.groupNameAvator}>
      <Text>{addeduser?.length > 2 && addeduser.slice(0, 1)}</Text>
    </View>
    <Text style={styles.memberEmail}>{addeduser}</Text>
  </View>
);

const styles = StyleSheet.create({
  topBarWrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 20,
    height: 40,
    justifyContent: "center",
  },
  emptyGroupContainer: {
    backgroundColor: COLORS.white,
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  groupNameContainer: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    minHeight: 80,
    justifyContent: "center",
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  member: {
    marginTop: 4,
    fontFamily: "Poppins-Light",
  },
  middleContentWrapper: {
    marginTop: 30,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  addPeopleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  addTExt: {
    marginLeft: 15,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  profileWrapper: {
    paddingVertical: 15,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    borderTopColor: COLORS.lightGray,
    borderTopWidth: 1,
  },
  GroupMemberContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  groupNameAvator: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
  },
  memberEmail: {
    marginLeft: 15,
    fontFamily: "Poppins-Regular",
  },
});
