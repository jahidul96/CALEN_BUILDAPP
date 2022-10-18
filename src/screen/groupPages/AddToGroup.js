import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { AppBar, ButtonComp } from "../../component/Reuse/Reuse";
import COLORS from "../../Colors/COLORS";
import { useNavigation } from "@react-navigation/native";
import TagInput from "../../component/TagInput";
import { addUserToGroup } from "../../firebase/FireStore/FirestoreFunc";
import Context from "../../../context/Context";

const AddToGroup = ({ route }) => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const { id, group } = route.params;
  const [alreadyExits, setAlreadyExists] = useState(group?.participents);
  const { loggedUser } = useContext(Context);

  const addUser = () => {
    const Lower = [];

    users.forEach((element) => {
      Lower.push(element.toLowerCase());
    });
    if (users.length == 0) {
      return Alert.alert("AT LEAST ONE USER EMAIL REQUIRED!");
    }
    if (Lower.includes(loggedUser.email.toLowerCase())) {
      return Alert.alert("YOU CAN'T ADD YOUSELF!");
    }
    const data = alreadyExits.concat(Lower);
    setAlreadyExists(data);
    addUserToGroup(data, id)
      .then(() => {
        Alert.alert("USER ADDED");
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("SOMETHING WENT WRONG");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <AppBar navigation={navigation} />
      <ScrollView>
        <TagInput
          placeholder={"Enter Email..."}
          value={users}
          setValue={setUsers}
          extraInputStyle={styles.extraInputStyle}
        />
      </ScrollView>
      <View>
        <ButtonComp text="ADD" onPress={addUser} />
      </View>
    </View>
  );
};

export default AddToGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  extraInputStyle: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
