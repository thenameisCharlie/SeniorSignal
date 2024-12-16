// INDEX = HOME SCREEN

import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import  supabase from "@/lib/client";

export default function HomeScreen() {
    const [userData, setUserData] = useState(String);  

    // A useEffect that will auto take the user to /login if they are not authenticated/logged in yet
    useEffect(() => {
      // fetchUser();
    }, []);
  
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserData(user.id.toString());
  
      if (userData) {
        window.location.href = "/";
      }
      else {
        window.location.href = "/login";
      }
    };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
