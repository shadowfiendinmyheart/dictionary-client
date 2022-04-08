import React from 'react';
import { StyleSheet, View } from 'react-native';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationScreen = () => {
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
