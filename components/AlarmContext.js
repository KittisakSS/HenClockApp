import React, { createContext, useState, useContext } from 'react';

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);

  const addAlarm = (alarm) => {
    setAlarms((prevAlarms) => [...prevAlarms, alarm]);
  };

  const removeAlarm = (id) => {
    setAlarms((prevAlarms) => prevAlarms.filter(alarm => alarm.id !== id));
  };

  const updateAlarm = (updatedAlarm) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) => (alarm.id === updatedAlarm.id ? updatedAlarm : alarm))
    );
  };

  return (
    <AlarmContext.Provider value={{ alarms, addAlarm, removeAlarm, updateAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarms = () => useContext(AlarmContext);
