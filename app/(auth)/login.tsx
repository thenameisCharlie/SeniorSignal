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
import { useState } from "react";
import  supabase from "@/lib/client";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);

  // Regex for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to handle form submission
  const handlePress = () => {
    if (validateForm()) {
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

    setError(newErrors); // Update error state
    return valid; // Return the validation result
  };

  // Function to show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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

      <MaterialCommunityIcons // Show/Hide password icon
        name={showPassword ? "eye-off" : "eye"}
        size={18}
        color="#aaa"
        style={styles.eyeIcon}
        onPress={toggleShowPassword}
      />
    </View>

      {error.password && (
        <Text style={styles.errorText}>{error.password}</Text> // Show specific password error
      )}

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
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
