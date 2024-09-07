// WelcomeScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from './ThemedText';

const { height } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const animation = useSharedValue(0);

  // Define animated styles using the shared value
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      transform: [{ translateY: withSpring(0, { damping: 2, stiffness: 100 }) }],
    };
  });

  useEffect(() => {
    // Start the animation
    animation.value = withSpring(1, { damping: 2, stiffness: 100 });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <ThemedText type='title' style={styles.textTheme}>Welcome to the National Museum, Delhi!</ThemedText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:"100%"
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    },
    textTheme: {
    fontSize: 40,
    lineHeight: 42,
  }

});

export default WelcomeScreen;
