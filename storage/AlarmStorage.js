// // AlarmStorage.js
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ALARMS_KEY = 'alarms';

// export const loadAlarms = async () => {
//   try {
//     const savedAlarms = await AsyncStorage.getItem(ALARMS_KEY);
//     if (savedAlarms) {
//       return JSON.parse(savedAlarms);
//     }
//     return [];
//   } catch (error) {
//     console.error('Failed to load alarms from storage', error);
//     return [];
//   }
// };

// export const saveAlarms = async (alarms) => {
//   try {
//     await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(alarms));
//   } catch (error) {
//     console.error('Failed to save alarms to storage', error);
//   }
// };
