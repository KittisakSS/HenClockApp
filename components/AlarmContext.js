import React, { createContext, useState, useContext, useEffect } from 'react';
import { saveAlarmsToStorage, loadAlarmsFromStorage } from '../storage/AlarmStorage';

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const loadAlarms = async () => {
      const storedAlarms = await loadAlarmsFromStorage();
      setAlarms(storedAlarms);
    };

    loadAlarms();
  }, []);

  const addAlarm = async (alarm) => {
    const updatedAlarms = [...alarms, alarm];
    setAlarms(updatedAlarms);
    await saveAlarmsToStorage(updatedAlarms);
  };

  const removeAlarm = async (id) => {
    const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
    setAlarms(updatedAlarms);
    await saveAlarmsToStorage(updatedAlarms);
  };

  const updateAlarm = async (updatedAlarm) => {
    const updatedAlarms = alarms.map(alarm => 
      alarm.id === updatedAlarm.id ? updatedAlarm : alarm
    );
    setAlarms(updatedAlarms);
    await saveAlarmsToStorage(updatedAlarms);
  };

  return (
    <AlarmContext.Provider value={{ alarms, addAlarm, removeAlarm, updateAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarms = () => useContext(AlarmContext);
