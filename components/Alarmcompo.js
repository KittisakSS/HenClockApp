import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Modal, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAlarms } from '../components/AlarmContext';
import { Picker } from '@react-native-picker/picker';

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
  const { alarms, removeAlarm, updateAlarm } = useAlarms();
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTime, setNewTime] = useState(new Date());
  const [newRepeat, setNewRepeat] = useState('ครั้งเดียว');
  const navigation = useNavigation();

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleAddAlarm = () => {
    navigation.navigate('AddAlarmScreen');
  };

  const handleDeleteAlarm = (id) => {
    removeAlarm(id);
  };

  const handleEditAlarm = (alarm) => {
    const [hours, minutes] = alarm.time.split(':').map(Number);
    setSelectedAlarm(alarm);
    setNewTime(new Date(1970, 0, 1, hours, minutes)); // ตั้งค่าเริ่มต้นใหม่ให้ถูกต้อง
    setNewRepeat(alarm.repeat);
    setModalVisible(true);
  };

  const handleToggleSwitch = async (id) => {
    const alarm = alarms.find(alarm => alarm.id === id);
    if (alarm) {
      const updatedAlarm = alarm.enabled
        ? { ...alarm, enabled: false, notificationId: null }
        : { ...alarm, enabled: true, notificationId: await scheduleNotification(alarm) };
      updateAlarm(updatedAlarm);
    }
  };

  const scheduleNotification = async (alarm) => {
    const [hours, minutes] = alarm.time.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    if (alarmDate < now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alarm",
        body: `It's ${alarm.time}!`,
        priority: Notifications.AndroidNotificationPriority.MAX,
        presentation: 'banner',
      },
      trigger: { date: alarmDate, channelId: 'default' },
    });

    return notificationId;
  };

  const handleSaveChanges = () => {
    if (selectedAlarm) {
      const updatedAlarm = {
        ...selectedAlarm,
        time: `${newTime.getHours().toString().padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`,
        repeat: newRepeat,
      };
      updateAlarm(updatedAlarm);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <TouchableOpacity onPress={() => handleEditAlarm(item)}>
              <Text style={styles.alarmTime}>{item.time}</Text>
            </TouchableOpacity>
            <Text style={styles.alarmRepeat}>{item.repeat}</Text>
            <Switch
              value={item.enabled}
              onValueChange={() => handleToggleSwitch(item.id)}
            />
            <TouchableOpacity onPress={() => handleDeleteAlarm(item.id)}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAlarm}>
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>

      {/* Modal for editing alarm */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Alarm</Text>
            <Text style={styles.label}>Set Time:</Text>
            <TouchableOpacity onPress={() => setPickerVisible(true)}>
              <Text style={styles.timeText}>
                {newTime.getHours().toString().padStart(2, '0')}:
                {newTime.getMinutes().toString().padStart(2, '0')}
              </Text>
            </TouchableOpacity>

            {isPickerVisible && (
              <DateTimePicker
                value={newTime}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  setPickerVisible(false);
                  if (selectedDate) {
                    setNewTime(selectedDate);
                  }
                }}
              />
            )}

            <Text style={styles.label}>Repeat:</Text>
            <Picker
              selectedValue={newRepeat}
              onValueChange={(itemValue) => setNewRepeat(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="ครั้งเดียว" value="ครั้งเดียว" />
              <Picker.Item label="ทุกวัน" value="ทุกวัน" />
              <Picker.Item label="จันทร์ถึงศุกร์" value="จันทร์ถึงศุกร์" />
              <Picker.Item label="เสาร์ถึงอาทิตย์" value="เสาร์ถึงอาทิตย์" />
            </Picker>

            <Button title="Save" onPress={handleSaveChanges} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    padding: 20,
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
  addButton: {
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  timeText: {
    fontSize: 48,
    color: "#000",
    textAlign: "center",
    marginVertical: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default Alarmcompo;
