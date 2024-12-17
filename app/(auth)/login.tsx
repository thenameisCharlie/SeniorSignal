import { Image, StyleSheet, View, TextInput, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true); //display when form is invalid
  
  const handlePress = () => {

    if(email === '' || password === '') {
      setIsValid(false);
      alert('Please fill in all fields');
    }
    else {
      console.log("Form Submitted Successfully!")
    }

  };

  return(
    <View>
      <TextInput value={email} onChangeText={setEmail} placeholder='Email' keyboardType='email-address' style={styles.container}/>
      <TextInput value={password} onChangeText={setPassword} placeholder='Password' keyboardType='default' style={styles.container}/>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>


  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
},
});
