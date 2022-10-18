import { StyleSheet } from "react-native";
import COLORS from "../../Colors/COLORS";

export const postStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },

  imgWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  imgcontainer: {
    alignItems: "center",
  },
  imgStyle: {
    width: 60,
    height: 60,
  },

  uploadText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 6,
    letterSpacing: 1,
  },
  rnStyle: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    zIndex: 10,
  },

  inputExtraStyle: {
    height: 150,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  inputContainer: {
    padding: 4,
    marginTop: 30,
  },
  btnExtraStyle: {
    marginTop: 20,
  },
});
