import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import supabase from "@/lib/client";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<string | null>(null);

  // Regex for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    // If user is already logged in, redirect to main page
    fetchUserData();
  });

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUserData(user.id);
    }

    if (userData) {
      window.location.href = "/";
    }
  };

  // Function to handle form submission
  const handlePress = () => {
    if (validateForm()) {
      handleSignUp();
      console.log("Form Submitted Successfully!");
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let valid = true;

    // Check if email is empty
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      // Validate email format
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    // Check if password is empty
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      // Validate password length
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    // setError(newErrors); // Update error state
    return valid; // Return the validation result
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      alert("Error signing up: " + error.message);
    } else {
      alert(
        "Sign up successful! Please check your email to verify your account."
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[styles.inputContainer, error.email && styles.inputError]}
        value={email}
        onChangeText={setEmail}
        placeholder="example@email.com"
        placeholderTextColor={"grey"}
        keyboardType="email-address"
      />

      {error.email && (
        <Text style={styles.errorText}>{error.email}</Text> // Show specific email error
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.passwordInput, error.password && styles.inputError]}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={"grey"}
          secureTextEntry={!showPassword} // Hide password
          keyboardType="default"
        />
      </View>

      {error.password && (
        <Text style={styles.errorText}>{error.password}</Text> // Show specific password error
      )}

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFA07A",
    padding: 10,
    borderRadius: 20,
    marginVertical: 20,
    borderWidth: 1,
    width: 200,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    width: 400,
    height: 50, // Consistent height for input container
    backgroundColor: "white", // Optional for better contrast
  },
  passwordInput: {
    flex: 1, // Allow TextInput to take up remaining space
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 10, // Padding for the TextInput
  },

  inputError: {
    borderColor: "red", // Red border when invalid
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 0,
    textAlign: "center",
    marginRight: 285,
  },
  eyeIcon: {
    marginLeft: 10,
  },
});
