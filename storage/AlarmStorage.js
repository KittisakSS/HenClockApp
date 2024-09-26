import AsyncStorage from '@react-native-async-storage/async-storage';

const ALARMS_KEY = 'alarms_data';

export const saveAlarmsToStorage = async (alarms) => {
  try {
    const jsonValue = JSON.stringify(alarms);
    await AsyncStorage.setItem(ALARMS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save alarms:", e);
  }
};

export const loadAlarmsFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(ALARMS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load alarms:", e);
    return [];
  }
};
