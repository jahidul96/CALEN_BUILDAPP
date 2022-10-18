import { StyleSheet } from "react-native";
import COLORS from "../../Colors/COLORS";

export const reuseStyles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "transparent",
    opacity: 0.6,
    justifyContent: "flex-end",
    paddingBottom: 120,
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    height: 45,
    backgroundColor: COLORS.yellow,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  plusText: {
    fontSize: 33,
    color: COLORS.white,
    fontFamily: "Poppins-Bold",
    marginRight: 3,
  },

  inputStyle: {
    width: "100%",
    height: 50,
    borderRadius: 20,
    fontSize: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    fontFamily: "Poppins-Regular",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  linkTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: COLORS.white,
    fontSize: 15,
  },
  linkText: {
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.white,
    letterSpacing: 1,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    height: 25,
    marginTop: -2,
  },

  AppBarStyle: {
    height: 50,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  AppBarText: {
    marginLeft: 25,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  NormalBtn: {
    marginBottom: 10,
  },
  NormalBtnText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLORS.lightBlue,
  },
  AccountComp: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  accountImg: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  accountLeftContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  accountTextContainer: {
    width: "80%",
  },
  accountName: {
    fontFamily: "Poppins-Bold",
    marginBottom: -5,
    fontSize: 13,
  },
  accountEmail: {
    fontFamily: "Poppins-Regular",
    marginBottom: -1,
    fontSize: 11,
  },
});
