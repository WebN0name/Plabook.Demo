import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Ipad from './src/Ipad'

export default function App() {
  return (
    <View style={styles.container}>
      <Ipad/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Math.round(Dimensions.get('window').height),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
