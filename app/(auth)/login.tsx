import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

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
    } else if (password.length < 20) {
      // Validate password length
      newErrors.password = "Password must be at least 20 characters.";
      valid = false;
    }

    setError(newErrors); // Update error state
    return valid; // Return the validation result
  };

  return (
    <View>
      <TextInput
        style={[styles.inputContainer, error.email && styles.inputError]}
        value={email}
        onChangeText={setEmail}
        placeholder="example@email.com"
        placeholderTextColor={"grey"}
        keyboardType="email-address"
      />

      {error.email && (
        <Text style={styles.errorText}>This field is required*</Text>
      )}

      <TextInput
        style={[styles.inputContainer, error.password && styles.inputError]}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={"grey"}
        keyboardType="default"
      />

      {error.password && (
        <Text style={styles.errorText}>This field is required*</Text>
      )}

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    borderWidth: 1,
    width: 80,
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
  },
  inputContainer: {
    flex: 1,
    padding: 16,
    marginVertical: 10,
    justifyContent: "center",
    borderWidth: 1,
    width: 400,
    alignSelf: "center",
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
});
