import {
  ScrollView,
  Animated,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "./HomeStyles";
import { ButtonComp } from "../../component/Reuse/Reuse";
import Tab from "../../component/Tab";
import Context from "../../../context/Context";
import { Dimensions } from "react-native";
import {
  getCurrentUser,
  getInvitedGroups,
  getSingleGroupPosts,
  GroupsGet,
} from "../../firebase/FireStore/FirestoreFunc";
import DrawerTab from "../../component/DrawerTab";
import COLORS from "../../Colors/COLORS";

const Home = ({ navigation }) => {
  const { loggedUser, setLoggedUser } = useContext(Context);
  const [show, setShow] = useState(true);
  const movetoRight = useRef(new Animated.Value(1)).current;
  const [allPosts, setAllPosts] = useState([]);
  const [mygroups, setMyGroups] = useState([]);
  const [invitedGroup, setInvitedGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupindex, setGroupIndex] = useState(0);
  const windowWidth = Dimensions.get("window").width;

  const mergeAllGroup = mygroups.concat(invitedGroup);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setLoggedUser(user);
        setLoading(false);
      })
      .catch((err) => {
        console.log("user not found");
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GroupsGet()
        .then((data) => {
          // console.log(data);
          setMyGroups(data);
          getSingleGroupPosts(setAllPosts, data[groupindex]?.id);
          getInvitedGroups(setInvitedGroup);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    return unsubscribe;
  }, [groupindex]);

  const toggleNav = () => {
    Animated.timing(movetoRight, {
      toValue: show ? windowWidth / 1.3 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setShow(!show);
  };

  const offDrawerNav = () => {
    Animated.timing(movetoRight, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
    setShow(true);
  };

  const gotoPost = () => {
    if (mergeAllGroup.length == 0) {
      return Alert.alert("CREATE A GROUP TO ADD MEMORY!");
    }
    navigation.navigate("Post");
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      {loading ? (
        <View style={homeStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.lightBlue} />
          <Text style={homeStyles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <DrawerTab
            toggleNav={toggleNav}
            mygroups={mygroups}
            setGroupIndex={setGroupIndex}
          />
          <Animated.View
            onTouchMove={offDrawerNav}
            style={[
              homeStyles.wrapper,
              { transform: [{ translateX: movetoRight }] },
            ]}
            // ref={movetoRight}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <TopBar
                navigation={navigation}
                onPress={toggleNav}
                mygroups={mygroups}
                loggedUser={loggedUser}
                groupindex={groupindex}
              />

              <Tab
                allPosts={allPosts}
                mygroups={mygroups}
                invitedGroups={invitedGroup}
                selectedGroupId={mygroups[groupindex]?.id}
              />
              <View style={homeStyles.btnWrapper}>
                <ButtonComp
                  text="Memories"
                  plusText="+"
                  extraStyle={homeStyles.btnStyle}
                  extraTextStyle={homeStyles.extraTextStyle}
                  onPress={gotoPost}
                />
              </View>
            </SafeAreaView>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

const TopBar = ({ navigation, onPress, mygroups, loggedUser, groupindex }) => {
  const goToGroup = () => {
    navigation.navigate("MyGroup", {
      id: mygroups ? mygroups[groupindex]?.id : null,
    });
  };
  return (
    <View style={homeStyles.topbarStyle}>
      <TouchableOpacity onPress={onPress}>
        <Feather name="menu" size={25} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 17,
        }}
      >
        {mygroups ? mygroups[groupindex]?.value?.groupname : "GROUP NAME"}
      </Text>
      <TouchableOpacity onPress={goToGroup}>
        <Ionicons name="person-outline" size={25} />
        <Text
          style={{
            position: "absolute",
            right: -3,
            top: -5,
            fontFamily: "Poppins-Regular",
          }}
        >
          {mygroups && mygroups[groupindex]?.value?.participents?.length}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
