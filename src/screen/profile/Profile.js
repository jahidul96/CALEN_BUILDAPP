import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBar, NormalBtn } from "../../component/Reuse/Reuse";
import Context from "../../../context/Context";
import { profileStyles } from "./ProfileStyles";
import COLORS from "../../Colors/COLORS";

const img =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsOUOgOXlM3N-FOMuEhE9-8zr6loeh8dsalA&usqp=CAU";

const Profile = ({ navigation }) => {
  const { user } = useContext(Context);
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <ScrollView style={profileStyles.contentWrapper}>
        <AppBar text="Account" navigation={navigation} />
        <View style={profileStyles.profileContainer}>
          <Text style={profileStyles.text}>Jahidul islam</Text>
          <Text style={profileStyles.text}>High School</Text>
          <Image source={{ uri: img }} style={profileStyles.imgStyle} />
          <NormalBtn text="Upload Profile pic" />
          <NormalBtn text="Contact" />
          <Text style={profileStyles.text}>Jahidul@gmail.com</Text>
          <Text style={profileStyles.text}>01881383269</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <NormalBtn text="Account" />
          <Text style={profileStyles.text}>Student</Text>
          <NormalBtn text="Albums" />
          <NormalBtn text="Change Password" />
          <NormalBtn text="Delete My Account" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
