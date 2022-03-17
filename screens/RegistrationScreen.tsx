import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, Vibration, View } from 'react-native';
import { NativeBaseProvider, Box, Button, Icon, Input } from 'native-base';
import { Entypo } from '@native-base/icons';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';

const RegistrationScreen = () => {
  const handlePressButton = () => {
    Vibration.vibrate(1000);
  };

  return (
    <View style={styles.container}>
      <RegistrationForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegistrationScreen;
