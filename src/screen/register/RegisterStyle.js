import {StyleSheet} from "react-native";
import COLORS from "../../Colors/COLORS";

export const registerStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.lightBlue,
		paddingHorizontal: 25,
		paddingVertical: 50,
		justifyContent: "center",
	},
	contentWrapper: {},

	logoWrapper: {
		width: "100%",
		marginBottom: 20,
		alignItems: "center",
	},
	bottomContainer: {
		alignItems: "center",
		marginTop: 20,
	},
	textStyle: {
		color: COLORS.white,
		fontFamily: "Poppins-Regular",
		fontSize: 13,
		marginBottom: 4,
	},
});
