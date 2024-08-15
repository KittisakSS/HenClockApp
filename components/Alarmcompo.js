import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

// Configure Notification Channel for Android
const createNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'alarm-sound.mp3', // Ensure the sound attribute is set
    });
  }
};

// Request permissions for notifications
const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await createNotificationChannel();
  }
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to enable notifications to use the alarm feature.');
  }
};

const Alarmcompo = () => {
  const [alarms, setAlarms] = useState([
    { id: '1', time: '05:00', repeat: 'ครั้งเดียว', enabled: false },
    { id: '2', time: '06:00', repeat: 'ทุกวัน', enabled: false },
    { id: '3', time: '07:00', repeat: 'เสาร์ถึงอาทิตย์', enabled: false },
    { id: '4', time: '08:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false },
  ]);

  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleToggleSwitch = async (id) => {
    setAlarms((prevAlarms) =>
      prevAlarms.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );

    const toggledAlarm = alarms.find((alarm) => alarm.id === id);
    if (!toggledAlarm.enabled) {
      await scheduleNotification(toggledAlarm);
    } else {
      await cancelNotification(toggledAlarm.id);
    }
  };

  const handlePressTime = (alarm) => {
    setSelectedAlarm(alarm);
    setPickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentTime = selectedDate || new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newTime = `${hours}:${minutes}`;

    if (selectedAlarm) {
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.id === selectedAlarm.id ? { ...alarm, time: newTime } : alarm
        )
      );
      setSelectedAlarm(null);
    }

    setPickerVisible(false);
  };

  const scheduleNotification = async (alarm) => {
    const [hours, minutes] = alarm.time.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (alarmDate < now) {
      alarmDate.setDate(alarmDate.getDate() + 1); // Schedule for the next day if the time has already passed today
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alarm",
        body: `It's ${alarm.time}!`,
        sound: 'alarm-sound.mp3', // Ensure the sound attribute is set
      },
      trigger: {
        date: alarmDate,
        channelId: 'default',
      },
    });
  };

  const cancelNotification = async (id) => {
    // You need to track and cancel specific notifications
    // This is a placeholder as there is no direct method to cancel by ID in expo-notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Alarm Settings</Text> */}
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <TouchableOpacity onPress={() => handlePressTime(item)}>
              <Text style={styles.alarmTime}>{item.time}</Text>
            </TouchableOpacity>
            <Text style={styles.alarmRepeat}>{item.repeat}</Text>
            <Switch
              value={item.enabled}
              onValueChange={() => handleToggleSwitch(item.id)}
            />
          </View>
        )}
      />
      {isPickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    fontSize: 30,
    color: "#FFF",
    marginBottom: 20,
  },
  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  alarmTime: {
    fontSize: 24,
    color: "#FFF",
  },
  alarmRepeat: {
    fontSize: 16,
    color: "#AAA",
  },
});

export default Alarmcompo;
