import { Image, StyleSheet, View, TextInput, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return(
    <View>
      <TextInput value={email} onChangeText={setEmail} placeholder='Email' keyboardType='email-address'/>
      <TextInput value={password} onChangeText={setPassword} placeholder='Password' keyboardType='default'/>
    </View>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  textContainer: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});


  // return (
  //   <ParallaxScrollView
  //     headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
  //     headerImage={
  //       <Image
  //         source={require('@/assets/images/partial-react-logo.png')}
  //         style={styles.reactLogo}
  //       />
  //     }>
  //     <ThemedView style={styles.titleContainer}>
  //       <ThemedText type="title">Login</ThemedText>
  //     </ThemedView>
  //   </ParallaxScrollView>
  // );