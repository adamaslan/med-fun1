import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_TIMER = 'timerData';
const STORAGE_KEY_COUNTER = 'counterData';

class DataStorage {
  // Save timer data to local storage
  async saveTimerData(data) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_TIMER, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving timer data:', error);
    }
  }

  // Load timer data from local storage
  async loadTimerData() {
    try {
      const dataString = await AsyncStorage.getItem(STORAGE_KEY_TIMER);
      if (dataString) {
        return JSON.parse(dataString);
      }
    } catch (error) {
      console.error('Error loading timer data:', error);
    }
    return null;
  }

  // Save counter data to local storage (similar implementation as saveTimerData)
  async saveCounterData(data) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_COUNTER, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving counter data:', error);
    }
  }

  // Load counter data from local storage (similar implementation as loadTimerData)
  async loadCounterData() {
    try {
      const dataString = await AsyncStorage.getItem(STORAGE_KEY_COUNTER);
      if (dataString) {
        return JSON.parse(dataString);
      }
    } catch (error) {
      console.error('Error loading counter data:', error);
    }
    return null;
  }
}

export default DataStorage;
