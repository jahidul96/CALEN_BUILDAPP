import { StyleSheet } from "react-native";
import COLORS from "../../Colors/COLORS";

export const createGroupStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputWrapper: {
    flex: 1,
    marginTop: 80,
  },
  inputextraStyle: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  btnextraStyle: {
    backgroundColor: COLORS.yellow,
    borderRadius: 5,
    height: 50,
  },
  detailsContainer: {
    marginTop: 30,
  },
  imgcontainer: {
    alignItems: "center",
  },
  imgStyle: {
    width: 60,
    height: 60,
  },
});
