import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Colors/COLORS";
import { AppBar } from "../../component/Reuse/Reuse";
import { useNavigation } from "@react-navigation/native";
import { getSingleGroupPosts } from "../../firebase/FireStore/FirestoreFunc";
import { Video, AVPlaybackStatus } from "expo-av";

const GroupAllFile = ({ route }) => {
  const { value, id } = route.params;
  const navigation = useNavigation();
  const [groupPosts, setGroupPosts] = useState([]);
  const video = useRef(null);
  const [status, setStatus] = useState({});

  // console.log("id", id);
  // console.log("groupPosts", groupPosts[0].value);

  useEffect(() => {
    getSingleGroupPosts(setGroupPosts, id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <View style={styles.topbarContainer}>
        <AppBar navigation={navigation} text={value.groupname} />
      </View>
      <ScrollView style={styles.contentWrapper}>
        {groupPosts?.length == 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>NO ALBUM TILL NOW</Text>
          </View>
        ) : (
          <View style={styles.filesMainWrapper}>
            {groupPosts.map((post) => (
              <FileComp
                key={post.id}
                value={post.value.fileUrl}
                video={video}
                status={status}
                setStatus={setStatus}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupAllFile;

const FileComp = ({ value, video, status, setStatus }) => (
  <View style={styles.imgWrapper}>
    {value.type == "image/jpeg" ? (
      <Image source={{ uri: value.url }} style={styles.fileStyle} />
    ) : value.type == "video/mp4" ? (
      <Video
        ref={video}
        style={styles.fileStyle}
        source={{
          uri: value.url,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    ) : null}
  </View>
);

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
    paddingHorizontal: 15,
  },
  contentWrapper: {
    paddingVertical: 20,
  },
  filesMainWrapper: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imgWrapper: {
    width: "31%",
    height: 120,
    marginRight: 5,
    marginBottom: 10,
  },
  fileStyle: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
});
