import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ButtonComp, Input, LinkTextComp } from "../../component/Reuse/Reuse";
import { useNavigation } from "@react-navigation/native";
import { registerStyles } from "../register/RegisterStyle";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Calendria_Logo_Yellow } from "../../svgImages";
import COLORS from "../../Colors/COLORS";

const ResetPassword = ({ route }) => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  const { outside } = route.params;

  const resetPass = () => {
    if (!email) {
      return Alert.alert("put a verified email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("succesfull");
        console.log("email sent to your mail box");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(error.message);
        // ..
      });
  };

  return (
    <View style={registerStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View style={[registerStyles.logoWrapper, { marginBottom: 30 }]}>
        <Calendria_Logo_Yellow width={"100%"} height={100} />
      </View>
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Enter your email. we'll send you a link to change a new password
          </Text>
        </View>
        <Input placeholder="Your Email..." setValue={setEmail} />
        <ButtonComp
          text="Forgot Password"
          onPress={resetPass}
          extraStyle={styles.extraStyle}
        />
      </View>
      <View style={registerStyles.bottomContainer}>
        {outside ? (
          <LinkTextComp
            linkText="Back"
            pageNavigation={() => navigation.navigate("Account")}
          />
        ) : (
          <LinkTextComp
            text="Don't Have an Account ?"
            linkText="Sign Up"
            pageNavigation={() => navigation.navigate("Register")}
          />
        )}
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  extraStyle: {
    marginTop: 5,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    color: COLORS.white,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
});
