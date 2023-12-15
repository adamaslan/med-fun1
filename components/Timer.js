import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Picker, Button, TouchableOpacity, Audio } from 'react-native';

const Timer = () => {
  const [intervalDuration, setIntervalDuration] = useState(30); // Default interval duration in seconds
  const [intervals, setIntervals] = useState(5); // Default number of intervals
  const [selectedIntervalSound, setSelectedIntervalSound] = useState('');
  const [selectedEndingSound, setSelectedEndingSound] = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [backgroundSound, setBackgroundSound] = useState('');

  const intervalSounds = [
    // List of available interval sounds
    { name: 'Chime', path: require('./chime.mp3') },
    { name: 'Bell', path: require('./bell.mp3') },
    { name: 'Beep', path: require('./beep.mp3') },
  ];

  const endingSounds = [
    // List of available ending sounds
    { name: 'Applause', path: require('./applause.mp3') },
    { name: 'Fanfare', path: require('./fanfare.mp3') },
    { name: 'Victory', path: require('./victory.mp3') },
  ];

  const handleStartTimer = () => {
    setTimerActive(true);
    setTimeLeft(intervalDuration * intervals); // Calculate total timer duration
    // Start the timer loop with setInterval
  };

  const handleStopTimer = () => {
    setTimerActive(false);
    setTimeLeft(0);
    // Clear the interval
  };

  const backgroundSounds = [
    { name: 'Ambient Guitar', path: require('./ambguitar.mp3') },
    { name: 'Spanish Guitar 1', path: require('./inst521.mp3') },
    { name: 'Spanish Guitar 2', path: require('./Inst1020.mp3') },
  ];

  // Add sound playing functions for background and interval
  const playBackgroundSound = async (path) => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(path);
      await soundObject.setIsLoopingAsync(true);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playIntervalSound = async (path) => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(path);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  useEffect(() => {
    if (timerActive) {
      if (backgroundSound) {
        playBackgroundSound(backgroundSound);
      }

      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft % intervalDuration === 0 && selectedIntervalSound) {
          playIntervalSound(selectedIntervalSound);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
        if (backgroundSound) {
          soundObject.unloadAsync(); // Stop and unload background sound
        }
      };
    } else if (timeLeft === 0) {
      playSound(selectedEndingSound);
      setTimerActive(false);
    }
  }, [timerActive, timeLeft, selectedIntervalSound, backgroundSound]);

  return (
    <View style={{ padding: 10 }}>
      <Text>Interval Duration (seconds):</Text>
      <TextInput
        value={intervalDuration.toString()}
        onChangeText={(text) => setIntervalDuration(Number(text))}
      />
      <Text>Number of Intervals:</Text>
      <TextInput
        value={intervals.toString()}
        onChangeText={(text) => setIntervals(Number(text))}
      />
     <Text>Background Sound:</Text>
      <Picker
        selectedValue={backgroundSound}
        onValueChange={(itemValue) => setBackgroundSound(itemValue)}>
        {backgroundSounds.map((sound) => (
          <Picker.Item key={sound.name} label={sound.name} value={sound.path} />
        ))}
      </Picker>
      <Text>Interval Sound:</Text>
      <Picker
        selectedValue={selectedIntervalSound}
        onValueChange={(itemValue) => setSelectedIntervalSound(itemValue)}>
        {intervalSounds.map((sound) => (
          <Picker.Item key={sound.name} label={sound.name} value={sound.path} />
        ))}
      </Picker>
      <Text>Ending Sound:</Text>
      <Picker
        selectedValue={selectedEndingSound}
        onValueChange={(itemValue) => setSelectedEndingSound(itemValue)}>
        {endingSounds.map((sound) => (
          <Picker.Item key={sound.name} label={sound.name} value={sound.path} />
        ))}
      </Picker>
      {timerActive ? (
        <Button title="Stop Timer" onPress={handleStopTimer} />
      ) : (
        <Button title="Start Timer" onPress={handleStartTimer} />
      )}
      <Text style={{ fontSize: 18, marginTop: 10 }}>{timeLeft} seconds remaining</Text>
    </View>
  );
};

export default Timer;