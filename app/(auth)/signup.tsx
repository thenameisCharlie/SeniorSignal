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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [error, setError] = useState({ email: "", password: "", userFirstName: "", userLastName: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<string | null>(null);
    //const [userId, setUserId] = useState("");

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
      alert("Form Submitted Successfully!");
      }
  };

  // Function to validate form fields
  const validateForm = () => {
    let newErrors = { email: "", password: "", userFirstName: "", userLastName: "" };
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
    
    // Check if first name is empty
    if (!userFirstName.trim()) {
      newErrors.userFirstName = "First name is required.";
      valid = false;
    }

    // Check if last name is empty
    if (!userLastName.trim()) {
      newErrors.userLastName = "Last name is required.";
      valid = false;
    }

    setError(newErrors); // Update error state
    return valid; // Return the validation result
  };

  //function to handle sign up
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

  ////function to handle user names and insert in the user profiles table. Figure out how to link id with the UUID of the user
  // const handleUserNames = async () => {
  //   const {data, error} = await supabase.from('user profiles').insert({
  //     id: userId,
  //     first_name: userFirstName,
  //     last_name: userLastName
  //   });
  //   if (error) {
  //     alert("Error signing up: " + error.message);
  //   } else {
  //     alert(
  //       "User names added successfully!"
  //     );
  //   }
  // }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[styles.inputContainer, error.userFirstName && styles.inputError]} //&& is a logical operator that returns the right-hand operand if the left-hand operand is true
        value={userFirstName}
        onChangeText={setUserFirstName}
        placeholder="First Name"
        placeholderTextColor={"grey"}
        keyboardType="default"
      />

      {error.userFirstName && (
        <Text style={styles.errorText}>{error.userFirstName}</Text> // Show specific first name error
      )}

      <TextInput 
        style={[styles.inputContainer, error.userLastName && styles.inputError]}
        value={userLastName}
        onChangeText={setUserLastName}
        placeholder="Last Name"
        placeholderTextColor={"grey"}
        keyboardType="default"
      />

      {error.userFirstName && (
        <Text style={styles.errorText}>{error.userFirstName}</Text> // Show specific first name error
      )}

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
        <Text style={styles.buttonText}>Sign up</Text>
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
    flex: 1,
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
