import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { registerStyles } from "./RegisterStyle";
import {
  ButtonComp,
  Input,
  LinkTextComp,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import { fbUserRegister } from "../../firebase/FbAuth/FbAuthFunc";
import { addUserToFB } from "../../firebase/FireStore/FirestoreFunc";
import { useNavigation } from "@react-navigation/native";
import Context, { AuthContext } from "../../../context/Context";
import { Calendria_Logo_Yellow } from "../../svgImages";
import COLORS from "../../Colors/COLORS";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const navigation = useNavigation();
  const { setAuthUser } = useContext(AuthContext);
  const { setLoggedUser } = useContext(Context);
  const [uploading, setUploading] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const register = () => {
    const fileds = [email, password, username, fullname];
    const required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("PLEASE FILL ALL THE FIELD");
    }
    setUploading(true);

    fbUserRegister(email, password)
      .then((user) => {
        let { uid } = user.user;
        let userInfo = {
          email,
          username,
          fullname,
          uid,
          imgUrl: "",
        };
        addUserToFB(userInfo, uid);
        setLoggedUser(userInfo);
        setAuthUser(user);
        setUploading(false);
        navigation.navigate("Home");
      })
      .catch((err) => {
        setUploading(false);
        Alert.alert("SOMETHING WENT WRONG");
      });
  };

  const extraStyle = {
    marginTop: 10,
  };
  return (
    <View style={registerStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.lightBlue} />
      <View>
        <ScrollView>
          {uploading && <LoadingComp text="SIGNINGUP..." />}
          <View style={registerStyles.logoWrapper}>
            <Calendria_Logo_Yellow width={"100%"} height={100} />
          </View>
          <View>
            <Input placeholder="Full Name" setValue={setFullname} />
            <Input placeholder="Username" setValue={setUsername} />

            <Input placeholder="Email" setValue={setEmail} />
            <Input
              placeholder="Password"
              setValue={setPassword}
              secureTextEntry={true}
            />
            {uploading ? null : (
              <ButtonComp
                text="SIGN UP"
                onPress={register}
                extraStyle={extraStyle}
              />
            )}
          </View>
          <LinkTextComp
            text="Have an Account ?"
            linkText="Log In"
            pageNavigation={() => navigation.navigate("Login")}
          />

          <View style={registerStyles.bottomContainer}>
            <Text style={registerStyles.textStyle}>
              We need the permission for the service you use
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  registerStyles.textStyle,
                  { fontFamily: "Poppins-Bold" },
                ]}
              >
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;
