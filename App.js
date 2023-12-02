import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Timer from './components/Timer'; // Your timer component
import Counter from './components/Counter';
import DataStorage from './components/Storage';
import HeatmapChart from './components/HeatmapChart';
import CounterHeatmap from './components/CounterHeatmap';

const App = () => {
  const [dataStorage, setDataStorage] = useState(new DataStorage());

  const handleTimerComplete = (timerData) => {
    // Save timer data to local storage
    dataStorage.saveTimerData(timerData);
  };

  const handleCounterUpdate = (count) => {
    // Save counter data to local storage
    dataStorage.saveCounterData(count);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Timer onComplete={handleTimerComplete} />
        <Counter goal={10} onUpdate={handleCounterUpdate} />
      </View>
      <View style={styles.heatmaps}>
        <HeatmapChart dataStorage={dataStorage} />
        <CounterHeatmap dataStorage={dataStorage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  heatmaps: {
    flex: 1,
  },
});

export default App;
