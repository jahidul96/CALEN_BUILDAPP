import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const getCurrentUser = async () => {
  const userRef = doc(db, "Users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  let user;
  if (userSnap.exists()) {
    user = userSnap.data();
  } else {
    user = null;
  }
  // user && (user.uid = auth.currentUser.uid);
  // console.log(user);
  return user;
};

export const addUserToFB = async (info, id) => {
  await setDoc(doc(db, "Users", id), info);
};

export const addPostToFb = async (postData) => {
  await addDoc(collection(db, "Allposts"), postData);
};
export const addGroupToFb = async (groupData) => {
  await addDoc(collection(db, "Groups"), groupData);
};

export const addPostToGroup = async (postdata) => {
  await addDoc(collection(db, "AllGroupPosts"), postdata);
};

export const deleteFromFb = async (id, collectionname) => {
  await deleteDoc(doc(db, collectionname, id));
};

export const deleteGroupAllPost = async (id) => {
  const q = query(collection(db, "AllGroupPosts"), where("groupId", "==", id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    deleteFromFb(doc.id, "AllGroupPosts");
  });
};

export const getAllPosts = (setAllPosts) => {
  const cRef = collection(db, "Allposts");
  const q = query(cRef, orderBy("postedAt", "desc"));
  onSnapshot(q, (querySnapshot) => {
    let posts = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      posts?.push(data);
    });
    setAllPosts(posts);
  });
};

export const getSingleGroupPosts = (setGroupPosts, id) => {
  const cRef = collection(db, "AllGroupPosts");
  const q = query(cRef, where("groupId", "==", id));
  onSnapshot(q, (querySnapshot) => {
    let posts = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      posts.push(data);
    });
    setGroupPosts(posts);
  });
};

export const getMyGroups = (setMyGroups) => {
  const cRef = collection(db, "Groups");
  const q = query(cRef, where("uid", "==", auth.currentUser.uid));
  onSnapshot(q, (querySnapshot) => {
    let groups = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      groups.push(data);
    });
    setMyGroups(groups);
    // console.log(groups);
  });
};
export const GroupsGet = async () => {
  const q = query(
    collection(db, "Groups"),
    where("uid", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);
  let groups = [];
  querySnapshot.forEach((doc) => {
    let data = { value: doc.data(), id: doc.id };
    groups.push(data);
    console.log();
  });
  return groups;
};

export const getInvitedGroups = (setInvitedGroup) => {
  const cRef = collection(db, "Groups");
  const q = query(
    cRef,
    where("participents", "array-contains", auth.currentUser.email)
  );
  onSnapshot(q, (querySnapshot) => {
    let groups = [];
    querySnapshot.forEach((doc) => {
      let data = { value: doc.data(), id: doc.id };
      groups.push(data);
    });
    setInvitedGroup(groups);
  });
};

export const getAllGroups = async (setAllGroups) => {
  const querySnapshot = await getDocs(collection(db, "Groups"));
  let groups = [];
  querySnapshot.forEach((doc) => {
    let data = { value: doc.data(), id: doc.id };
    groups.push(data);
  });
  setAllGroups(groups);
};

export const getSinglePost = (setSinglePost, id) => {
  onSnapshot(doc(db, "AllGroupPosts", id), (doc) => {
    setSinglePost(doc.data());
  });
};
export const getSingleGroup = (id, setGroupPosts) => {
  onSnapshot(doc(db, "Groups", id), (doc) => {
    setGroupPosts(doc.data());
  });
};

export const addProfilePic = async (url) => {
  await setDoc(
    doc(db, "Users", auth.currentUser.uid),
    { imgUrl: url },
    { merge: true }
  );
};

export const addUserToGroup = async (data, id) => {
  await setDoc(doc(db, "Groups", id), { participents: data }, { merge: true });
};

export const commentPost = async (userComment, id) => {
  await setDoc(
    doc(db, "AllGroupPosts", id),
    { comments: userComment },
    { merge: true }
  );
};
export const likePost = async (liked, id) => {
  await updateDoc(
    doc(db, "AllGroupPosts", id),
    { star: liked },
    { merge: true }
  );
};

// export const uploadImage = async (image) => {
// 	const imgFile = await (await fetch(image)).blob();
// 	console.log(image, imgFile);
// 	// const storage = getStorage();
// 	const imagesRef = ref(storage, imgFile._data.name);
// 	const uploadTask = uploadBytesResumable(imagesRef, imgFile);

// 	return new Promise(async (resolve, reject) => {
// 		uploadTask.on(
// 			"state_changed",

// 			(snapshot) => {},
// 			(error) => {
// 				reject(error);
// 			},
// 			() => {
// 				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// 					resolve(downloadURL);
// 				});
// 			}
// 		);
// 	});
// };
