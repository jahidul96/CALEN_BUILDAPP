import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import COLORS from "../Colors/COLORS";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Video, AVPlaybackStatus } from "expo-av";

const pdfImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Td6HMS75aPbyo4oQKVnTIQr4YDjuy35GJQ&usqp=CAU";

export const SinglePost = ({
  postData,
  value,
  loggedUser,
  _LikeOnPost,
  details,
  seeGroupImage,
}) => {
  const navigation = useNavigation();
  const isLiked = value?.star.filter((s) => s.likedBy == loggedUser?.email);
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const gotoDetails = () => {
    navigation.navigate("FileDownload", {
      id: postData.id,
      fileUrl: postData.value.fileUrl,
    });
  };

  return (
    <View style={styles.TimelinePostContainer}>
      <TouchableOpacity
        style={[
          value.fileUrl.type == "image/jpeg" ||
          value.fileUrl.type == "video/mp4"
            ? styles.imgContainer
            : styles.fileContainer,
        ]}
        onPress={gotoDetails}
        activeOpacity={details ? 0.7 : 0.5}
      >
        <FileContentComp
          fileUrl={value.fileUrl}
          video={video}
          setStatus={setStatus}
        />
      </TouchableOpacity>

      <View
        style={{
          paddingHorizontal: 10,
        }}
      >
        <Tag tags={value.tags} onPress={seeGroupImage} />
        <View style={styles.nameContainer}>
          <Text style={[styles.tabitemText, { color: COLORS.darkGray }]}>
            PostedBy :
          </Text>
          <Text style={styles.name}>{value.postedBy}</Text>
        </View>
        <Text style={[styles.tabitemText]}>{value.description}</Text>
        <View style={styles.iconContainer}>
          <View style={{ flexDirection: "row" }}>
            <CommentComp value={value} postData={postData} />
            <LikedComp
              isLiked={isLiked}
              onPress={_LikeOnPost}
              value={value}
              postData={postData}
            />
          </View>
          <Text
            style={[
              styles.tabitemText,
              { color: COLORS.darkGray, fontSize: 12 },
            ]}
          >
            {value.postedAt.toDate().toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const FileContentComp = ({ fileUrl, video, setStatus }) => (
  <>
    {fileUrl.type == "image/jpeg" ? (
      <Image source={{ uri: fileUrl.url }} style={styles.imgStyle} />
    ) : fileUrl.type == "application/pdf" ? (
      <TouchableOpacity onPress={() => Linking.openURL(fileUrl.url)}>
        <ImageBackground source={{ uri: pdfImg }} style={styles.pdfWrapper}>
          <Text style={styles.pdfText}>Download Pdf</Text>
        </ImageBackground>
      </TouchableOpacity>
    ) : fileUrl.type == "audio/amr" ? (
      <TouchableOpacity
        style={styles.pdfWrapper}
        onPress={() => Linking.openURL(fileUrl.url)}
      >
        <MaterialIcons name="multitrack-audio" size={50} />
      </TouchableOpacity>
    ) : (
      <Video
        ref={video}
        style={styles.imgStyle}
        source={{
          uri: fileUrl.url,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    )}
  </>
);

export const Tag = ({ tags, onPress }) => (
  <TouchableOpacity
    style={styles.tagContainer}
    onPress={onPress ? onPress : null}
  >
    {tags.map((tag, i) => (
      <View key={i} style={styles.tagItem}>
        <Text style={[styles.tabitemText, styles.tagText]}>{tag}</Text>
      </View>
    ))}
  </TouchableOpacity>
);

const CommentComp = ({ value, postData }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostComment", { postData })}
    >
      <Entypo name="message" size={24} color={COLORS.lightBlue} />

      <View style={styles.commentCounter}>
        <Text style={styles.commentCounterText}>{value.comments.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const LikedComp = ({ isLiked, onPress, value, postData }) => (
  <>
    {isLiked.length == 0 ? (
      <TouchableOpacity
        style={styles.likedCounter}
        onPress={() => onPress(postData, isLiked)}
      >
        <Text style={styles.likeText}>{value.star.length}</Text>
        <Entypo
          name="star"
          size={20}
          color={COLORS.darkGray}
          style={{ marginLeft: 3, marginTop: -5 }}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.likedCounter}
        onPress={() => onPress(postData, isLiked)}
      >
        <Text style={styles.likeText}>{value.star.length}</Text>
        <Entypo
          name="star"
          size={20}
          color={COLORS.red}
          style={{ marginLeft: 3, marginTop: -5 }}
        />
      </TouchableOpacity>
    )}
  </>
);

const styles = StyleSheet.create({
  TimelinePostContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingBottom: 15,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  imgContainer: {
    width: "100%",
    height: 180,
    marginBottom: 10,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  fileContainer: {
    width: "100%",
    height: 100,

    marginBottom: 8,
  },
  pdfWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  pdfText: {},
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontFamily: "Poppins-Regular",
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 1,
    marginTop: -8,
  },
  imgStyle: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  commentCounter: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
  },
  commentCounterText: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: "Poppins-Bold",
  },
  likedCounter: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginTop: -5,
  },
  likeText: {
    fontFamily: "Poppins-Bold",
    fontSize: 17,
  },
  tabitemText: {
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },

  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tagItem: {
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tagText: { color: COLORS.darkGray, marginTop: 4, fontSize: 12 },
  addcommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  InputExtraStyle: {
    width: "65%",
    borderWidth: 1,
    borderColor: COLORS.gray,
    height: 40,
    borderRadius: 10,
    fontSize: 13,
  },
  ButtonExtraStyle: {
    width: "30%",
    height: 40,
    backgroundColor: COLORS.lightBlue,
    marginTop: -10,
    borderRadius: 10,
  },
  ButtonTextExtraStyle: {
    color: COLORS.white,
    fontSize: 13,
  },
});
