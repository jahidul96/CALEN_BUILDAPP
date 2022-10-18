import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  ButtonComp,
  Input,
  LinkTextComp,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import { useNavigation } from "@react-navigation/native";
import { registerStyles } from "../register/RegisterStyle";
import { signinWithFb } from "../../firebase/FbAuth/FbAuthFunc";
import { getCurrentUser } from "../../firebase/FireStore/FirestoreFunc";
import { AuthContext } from "../../../context/Context";
import { Calendria_Logo_Yellow } from "../../svgImages";
import COLORS from "../../Colors/COLORS";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setAuthUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const login = async () => {
    const fileds = [email, password];
    const required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("PLEASE FILL ALL THE FIELD");
    }
    setUploading(true);
    signinWithFb(email, password)
      .then(async (data) => {
        await getCurrentUser().then((user) => {
          setAuthUser(user);
          setUploading(false);
          navigation.navigate("Home");
        });
      })
      .catch(() => {
        setUploading(false);
        Alert.alert("SOMETHING WENT WRONG");
      });
  };

  return (
    <View style={registerStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      {uploading && <LoadingComp text="LOGGINGIN..." />}
      <View style={registerStyles.logoWrapper}>
        <Calendria_Logo_Yellow width={"100%"} height={100} />
      </View>
      <View>
        <Input placeholder="Email" setValue={setEmail} />
        <Input
          placeholder="Password"
          setValue={setPassword}
          secureTextEntry={true}
        />
        {uploading ? null : <ButtonComp text="LOG IN" onPress={login} />}
      </View>
      <LinkTextComp
        text="Forgot password ?"
        pageNavigation={() =>
          navigation.navigate("ResetPassword", { outside: false })
        }
        extraStyle={{ marginTop: 20 }}
        textClick={true}
      />
      <LinkTextComp
        text="Don't Have an Account ?"
        linkText="Sign Up"
        pageNavigation={() => navigation.navigate("Register")}
        extraStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
