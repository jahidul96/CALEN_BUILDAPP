import {auth} from "../firebase";
import {PhoneAuthProvider} from "firebase/auth";
import {Alert} from "react-native";

export const sendVerification = (
	fullphonenumber,
	recaptchaVerifier,
	navigation
) => {
	const phoneProvider = new PhoneAuthProvider(auth);
	phoneProvider
		.verifyPhoneNumber(fullphonenumber, recaptchaVerifier.current)
		.then((id) => {
			if (id) {
				navigation.navigate("OTP", {id, fullphonenumber});
			}
		})
		.catch((err) => {
			if (err.code == "auth/invalid-phone-number") {
				Alert.alert("", "Please, enter a valid phone number.");
			} else if (err.code == "auth/too-many-requests") {
				Alert.alert(
					"",
					"This number is temporary blocked for too many requests.Try later or try again with another number."
				);
			} else {
				return Alert.alert("", err.message);
			}
		});
};
