import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AppBar,
  ButtonComp,
  Input,
  LoadingComp,
} from "../../component/Reuse/Reuse";
import { postStyles } from "./PostStyles";
import * as DocumentPicker from "expo-document-picker";
import {
  addPostToFb,
  addPostToGroup,
  getAllGroups,
  getInvitedGroups,
  getMyGroups,
  getSingleGroup,
} from "../../firebase/FireStore/FirestoreFunc";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Context from "../../../context/Context";
import { Timestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../Colors/COLORS";
import TagInput from "../../component/TagInput";
import Picker from "../../component/Picker";

const Post = () => {
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const { loggedUser } = useContext(Context);
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const [invitedGroup, setInvitedGroup] = useState([]);
  const [show, setShow] = useState(false);
  const [groupname, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [type, setType] = useState("");

  // console.log("invitedGroup", invitedGroup);
  // console.log("myGroups", myGroups);

  const allAccesable_Group = myGroups.concat(invitedGroup);

  const selectGroup = (name, id) => {
    setGroupName(name);
    setGroupId(id);
    setShow(!show);
  };

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (
      result.mimeType.includes("video") ||
      result.mimeType.includes("application/pdf") ||
      result.mimeType.includes("audio") ||
      result.mimeType.includes("image")
    ) {
      setImage(result.uri);
      setType(result.mimeType);
      console.log(result.mimeType);
    } else {
      return Alert.alert("SORRY THIS FILE NOT ALLOWED");
    }
  };

  console.log(image);

  // console.log("user", user);
  // console.log("groupPosts ===>", groupPosts);

  const submit = async () => {
    let fileds = [image, desc, groupname];
    let required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("FILL ALL THE FIELD'S!");
    }
    if (tags.length == 0) {
      return Alert.alert("PROVIDE AT LEAST ONE TAG");
    }
    setUploading(true);
    const imgFile = await (await fetch(image)).blob();
    const imagesRef = ref(storage, `images/${imgFile._data.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, imgFile);

    let postData = {
      tags,
      description: desc,
      email: loggedUser.email,
      postedBy: loggedUser.fullname,
      uid: loggedUser.uid,
      postedAt: Timestamp.fromDate(new Date()),
      star: [],
      comments: [],
      groupId,
      groupname,
    };

    return uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setUploading(false);
        return Alert.alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          postData.fileUrl = { url: downloadURL, type };
          addPostToGroup(postData)
            .then((res) => {
              setUploading(false);
              Alert.alert("POST ADDED SUCCESFULLY");
              navigation.navigate("Home");
            })
            .catch((err) => {
              setUploading(false);
              Alert.alert(err.message);
            });
        });
      }
    );
  };

  useEffect(() => {
    getMyGroups(setMyGroups);
    getInvitedGroups(setInvitedGroup);
  }, []);

  return (
    <SafeAreaView style={postStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      {uploading && <LoadingComp text="POSTING..." />}
      <AppBar text="Memory" navigation={navigation} />
      <ScrollView>
        <View style={postStyles.imgWrapper}>
          <TouchableOpacity
            style={postStyles.imgcontainer}
            onPress={_pickDocument}
          >
            <Image
              source={require("../../../assets/images/upload.jpg")}
              style={postStyles.imgStyle}
            />
            {image ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                {type == "image/jpeg" ? (
                  <Ionicons name="image" size={25} color={COLORS.lightBlue} />
                ) : type == "video/mp4" ? (
                  <AntDesign
                    name="videocamera"
                    size={25}
                    color={COLORS.lightBlue}
                  />
                ) : type == "audio/amr" ? (
                  <MaterialIcons
                    name="multitrack-audio"
                    size={25}
                    color={COLORS.lightBlue}
                  />
                ) : (
                  <AntDesign name="file1" size={25} color={COLORS.lightBlue} />
                )}

                <Text style={postStyles.uploadText}>Added</Text>
              </View>
            ) : (
              <Text style={postStyles.uploadText}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={postStyles.inputContainer}>
          <View style={postStyles.rnStyle}>
            <Picker
              data={allAccesable_Group}
              onPress={selectGroup}
              show={show}
              setShow={setShow}
              groupname={groupname}
            />
          </View>
          <TagInput value={tags} setValue={setTags} />
          <View style={{ marginTop: 20 }}>
            <Input
              multiline={true}
              extraStyle={postStyles.inputExtraStyle}
              placeholder="Description"
              setValue={setDesc}
              numberOfLines={10}
            />
          </View>
          {uploading ? null : (
            <ButtonComp
              text="ADD MEMORY"
              extraStyle={postStyles.btnExtraStyle}
              onPress={submit}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
