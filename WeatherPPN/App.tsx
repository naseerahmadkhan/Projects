import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import Home from './src/screens/home/Home';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 1 second

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  return (
    <PaperProvider>
      {showSplash ? (
        <View style={styles.container}>
          <Image
            source={require('./src/assets/bg.jpeg')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ) : (
        <Home />
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default App;
