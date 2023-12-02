import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const Counter = ({ goal, onUpdate }) => {
  // Local state for current count
  const [count, setCount] = useState(0);

  // Animated value for the ring progress
  const progress = new Animated.Value(0);

  // Update progress animation based on current count and goal
  useEffect(() => {
    Animated.timing(progress, {
      toValue: count / goal,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [count, goal]);

  // Increment counter on button press
  const handleIncrement = () => {
    setCount(count + 1);
    onUpdate(count + 1); // Update data storage with new count
  };

  // Component for the animated ring
  const Ring = () => {
    const ringStyle = {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ddd',
    };
    const innerRingStyle = {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: 'transparent',
      border: '10px solid #00e676',
      transform: [{ rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
    };

    return (
      <View style={ringStyle}>
        <Animated.View style={innerRingStyle} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Ring />
      <Text style={styles.countText}>{count} / {goal}</Text>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: 18,
    margin: 10,
  },
  button: {
    backgroundColor: '#00e676',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Counter;
