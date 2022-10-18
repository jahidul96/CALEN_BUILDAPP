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
import { createGroupStyles } from "./CreateGroupStyles";
import COLORS from "../../Colors/COLORS";
import * as DocumentPicker from "expo-document-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import TagInput from "../../component/TagInput";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Context from "../../../context/Context";
import { Timestamp } from "firebase/firestore";
import { addGroupToFb } from "../../firebase/FireStore/FirestoreFunc";

const CreateGroup = ({ navigation }) => {
  const [groupname, setGroupName] = useState("");
  const [info, setInfo] = useState(false);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [participents, setParticipents] = useState([]);
  const { loggedUser } = useContext(Context);
  const [uploading, setUploading] = useState(false);

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    console.log(result);
    if (result.mimeType.includes("image")) {
      setImage(result.uri);
    } else {
      Alert.alert("IMAGE FILE ONLY!");
    }
  };

  const toggle = () => {
    if (!groupname) {
      Alert.alert("PLEASE A NAME REQUIRED!");
      return;
    }
    setInfo(true);
  };

  const submit = async () => {
    const Lower = [];

    participents.forEach((element) => {
      Lower.push(element.toLowerCase());
    });
    let fileds = [image, tags, participents];
    let required = fileds.every(Boolean);
    if (!required) {
      return Alert.alert("FILL ALL FIELD'S");
    }
    if (tags.length == 0) {
      return Alert.alert("PROVIDE AT LEAST ONE TAG");
    }
    if (participents.length == 0) {
      return Alert.alert("AT LEAST ONE PARTICIPIENT REQUIRED!");
    }
    if (Lower.includes(loggedUser.email.toLowerCase())) {
      return Alert.alert("YOU CAN'T ADD YOUSELF!");
    }
    setUploading(true);
    const imgFile = await (await fetch(image)).blob();
    const imagesRef = ref(storage, `images/${imgFile._data.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, imgFile);

    let groupData = {
      groupname,
      tags,
      participents: Lower,
      email: loggedUser.email,
      createdBy: loggedUser.fullname,
      uid: loggedUser.uid,
      createdAt: Timestamp.fromDate(new Date()),
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
          groupData.groupImage = downloadURL;
          addGroupToFb(groupData)
            .then((res) => {
              setUploading(false);
              Alert.alert("GROUP CREATED");
              navigation.navigate("Home");
            })
            .catch((err) => {
              Alert.alert(err.message);
            });
        });
      }
    );
  };
  return (
    <SafeAreaView style={createGroupStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkGray} />
      <AppBar text="CREATE GROUP" navigation={navigation} />
      {uploading && <LoadingComp text="CREATING..." />}
      {info ? (
        <ScrollView style={createGroupStyles.detailsContainer}>
          <Details
            _pickDocument={_pickDocument}
            tags={tags}
            setTags={setTags}
            image={image}
            participents={participents}
            setParticipents={setParticipents}
            onPress={submit}
            uploading={uploading}
          />
        </ScrollView>
      ) : (
        <>
          <View style={createGroupStyles.inputWrapper}>
            <Input
              placeholder="Enter group name"
              extraStyle={createGroupStyles.inputextraStyle}
              setValue={setGroupName}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            {groupname.length > 2 ? (
              <ButtonComp
                text="Next"
                extraStyle={createGroupStyles.btnextraStyle}
                onPress={toggle}
              />
            ) : null}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const Details = ({
  _pickDocument,
  image,
  tags,
  setTags,
  setParticipents,
  participents,
  onPress,
  uploading,
}) => (
  <View
    style={{
      paddingBottom: 50,
    }}
  >
    <View style={createGroupStyles.imgWrapper}>
      <TouchableOpacity
        style={createGroupStyles.imgcontainer}
        onPress={_pickDocument}
      >
        <Image
          source={require("../../../assets/images/upload.jpg")}
          style={createGroupStyles.imgStyle}
        />
        {image ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <AntDesign name="file1" size={25} color={COLORS.lightBlue} />
            <Text style={createGroupStyles.uploadText}>Added</Text>
          </View>
        ) : (
          <Text style={createGroupStyles.uploadText}>GROUP IMAGE</Text>
        )}
      </TouchableOpacity>
    </View>

    <TagInput value={tags} setValue={setTags} />
    <TagInput
      value={participents}
      setValue={setParticipents}
      placeholder="Participent Email's"
      extraStyle={{ marginTop: 15 }}
    />
    {uploading ? null : (
      <ButtonComp
        text="CREATE"
        extraStyle={{ marginTop: 20, marginBottom: 20 }}
        onPress={onPress}
      />
    )}
  </View>
);

export default CreateGroup;
