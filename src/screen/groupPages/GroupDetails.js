import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../../Colors/COLORS";
import {
  getSingleGroup,
  getSingleGroupPosts,
  likePost,
} from "../../firebase/FireStore/FirestoreFunc";
import Context from "../../../context/Context";
import { SinglePost, Tag } from "../../component/TimelinePostSubComp";

const GroupDetails = ({ route }) => {
  const navigation = useNavigation();
  const [groupPosts, setGroupPosts] = useState([]);
  const { groupData } = route.params;
  const id = groupData.id;
  const { value } = groupData;
  const { loggedUser } = useContext(Context);

  useEffect(() => {
    getSingleGroupPosts(setGroupPosts, id);
  }, []);

  const _LikeOnPost = (data, isLiked) => {
    // console.log(data);
    if (isLiked.length == 0) {
      let val = [
        ...data.value.star,
        {
          likedBy: loggedUser.email,
        },
      ];
      likePost(val, data.id);
    } else {
      let val = data.value.star.filter((st) => st.likedBy != loggedUser.email);
      likePost(val, data.id);
    }
  };

  const seeGroupImage = () => {
    navigation.navigate("GroupAllFile", { value, id });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <View style={styles.topbarContainer}>
        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto name="arrow-left-l" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Post")}>
            <AntDesign name="pluscircleo" size={24} color={COLORS.lightBlue} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.groupNameContainer}>
          <Text style={styles.groupDate}>
            {value.createdAt.toDate().toLocaleDateString()}
          </Text>
          <Text style={styles.groupName}>{value.groupname}</Text>
          <Tag tags={value.tags} onPress={seeGroupImage} />
        </View>

        <View>
          {groupPosts.length == 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={[styles.groupName, { fontSize: 18 }]}>
                No post in this group till now
              </Text>
            </View>
          ) : (
            groupPosts.map((post, i) => (
              <SinglePost
                key={i}
                value={post.value}
                loggedUser={loggedUser}
                postData={post}
                _LikeOnPost={_LikeOnPost}
                details={true}
                seeGroupImage={seeGroupImage}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topbarContainer: {
    height: 60,
    width: "100%",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  groupNameContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: "center",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  groupDate: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  groupName: {
    fontFamily: "Poppins-Regular",
    fontSize: 22,
    letterSpacing: 1,
  },
  emptyContainer: {
    marginTop: 50,
    alignItems: "center",
  },
});
