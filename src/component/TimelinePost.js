import React, { useContext, useState } from "react";
import { likePost } from "../firebase/FireStore/FirestoreFunc";
import Context from "../../context/Context";
import { SinglePost } from "./TimelinePostSubComp";
import { useNavigation } from "@react-navigation/native";

const TimelinePost = ({ postData, id }) => {
  const { value } = postData;
  const { loggedUser } = useContext(Context);
  const navigation = useNavigation();

  const _LikeOnPost = (data, isLiked) => {
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
    <SinglePost
      postData={postData}
      value={value}
      loggedUser={loggedUser}
      _LikeOnPost={_LikeOnPost}
      seeGroupImage={seeGroupImage}
    />
  );
};

export default TimelinePost;
