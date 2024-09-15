import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

const createNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'alarm-sound.mp3',
    });
  }
};

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
    { id: '1', time: '05:00', repeat: 'ครั้งเดียว', enabled: false, notificationId: null },
    { id: '2', time: '06:00', repeat: 'ทุกวัน', enabled: false, notificationId: null },
    { id: '3', time: '07:00', repeat: 'เสาร์ถึงอาทิตย์', enabled: false, notificationId: null },
    { id: '4', time: '08:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false, notificationId: null },
    { id: '5', time: '09:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false, notificationId: null },
    { id: '6', time: '10:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false, notificationId: null },
    { id: '7', time: '11:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false, notificationId: null },
    { id: '8', time: '12:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false, notificationId: null },
    { id: '9', time: '13:00', repeat: 'วันจันทร์ถึงวันศุกร์', enabled: false, notificationId: null },
  ]);

  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleToggleSwitch = async (id) => {
    const updatedAlarms = alarms.map(async (alarm) => {
      if (alarm.id === id) {
        if (alarm.enabled) {
          try {
            if (alarm.notificationId) {
              await Notifications.cancelScheduledNotificationAsync(alarm.notificationId);
            }
          } catch (error) {
            console.error("Error canceling notification:", error);
          }
          return { ...alarm, enabled: false, notificationId: null };
        } else {
          try {
            const notificationId = await scheduleNotification(alarm);
            return { ...alarm, enabled: true, notificationId };
          } catch (error) {
            console.error("Error scheduling notification:", error);
            return alarm; // Return the original alarm if there's an error
          }
        }
      }
      return alarm;
    });
    setAlarms(await Promise.all(updatedAlarms));
  };

  const handlePressTime = (alarm) => {
    setSelectedAlarm(alarm);
    setPickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') {
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
    } else if (event.type === 'dismissed') {
      setPickerVisible(false);
    }
  };

  const scheduleNotification = async (alarm) => {
    try {
      const [hours, minutes] = alarm.time.split(':').map(Number);
      const now = new Date();
      const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

      if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1); // Schedule for the next day if the time has already passed today
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm",
          body: `It's ${alarm.time}!`,
          priority: Notifications.AndroidNotificationPriority.MAX,  // For Android
          presentation: 'banner',  // For iOS to show the notification as a banner
        },
        trigger: {
          date: alarmDate,
          channelId: 'default',
        },
      });

      return notificationId;
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return (
    <View style={styles.container}>
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
  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  alarmTime: {
    fontSize: 50,
    color: "#FFF",
  },
  alarmRepeat: {
    fontSize: 20,
    color: "#AAA",
  },
});

export default Alarmcompo;
