import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Register from "./src/screen/register/Register";
import Login from "./src/screen/login/Login";
import Home from "./src/screen/home/Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/firebase";
import Context, { AuthContext } from "./context/Context";
import CreateGroup from "./src/screen/creategroup/CreateGroup";
import Account from "./src/screen/account/Account";
import Post from "./src/screen/post/Post";
import PostComment from "./src/screen/postComment/PostComment";
import ResetPassword from "./src/screen/resetpassword/ResetPassword";
import MyGroup from "./src/screen/groupPages/MyGroup";
import GroupDetails from "./src/screen/groupPages/GroupDetails";
import AddToGroup from "./src/screen/groupPages/AddToGroup";
import FileDownload from "./src/screen/groupPages/FileDownload";
import GroupAllFile from "./src/screen/groupPages/GroupAllFile";

const Stack = createNativeStackNavigator();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [authUser, setAuthUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
          "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
          "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // console.log("user", user);
      } else {
        console.log("not logged in user");
      }
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Context.Provider value={{ loggedUser, setLoggedUser }}>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <NavigationContainer onLayout={onLayoutRootView}>
          {authUser ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="CreateGroup" component={CreateGroup} />
              <Stack.Screen name="PostComment" component={PostComment} />
              <Stack.Screen name="Post" component={Post} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Groupdetails" component={GroupDetails} />
              <Stack.Screen name="MyGroup" component={MyGroup} />
              <Stack.Screen name="AddToGroup" component={AddToGroup} />
              <Stack.Screen name="FileDownload" component={FileDownload} />
              <Stack.Screen name="GroupAllFile" component={GroupAllFile} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </Context.Provider>
  );
};
export default App;
