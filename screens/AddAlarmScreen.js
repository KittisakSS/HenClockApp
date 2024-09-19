import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import { useAlarms } from '../components/AlarmContext';

const AddAlarmScreen = ({ navigation }) => {
  const { addAlarm } = useAlarms();
  const [time, setTime] = useState(new Date());
  const [repeat, setRepeat] = useState("ครั้งเดียว");
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showTimePicker = () => {
    setPickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setPickerVisible(false);
    if (event.type === "set") {
      setTime(selectedDate || new Date());
    }
  };

  const handleSaveAlarm = () => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const newAlarm = {
      id: Math.random().toString(),
      time: `${hours}:${minutes}`,
      repeat,
      enabled: true,
      notificationId: null,
    };
    addAlarm(newAlarm);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ตั้งเวลานาฬิกาปลุก:</Text>
      <Text style={styles.timeText} onPress={showTimePicker}>
        {time.getHours().toString().padStart(2, "0")}:
        {time.getMinutes().toString().padStart(2, "0")}
      </Text>
      {isPickerVisible && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>ตั้งค่าการแจ้งเตือน:</Text>
      <Picker
        selectedValue={repeat}
        onValueChange={(itemValue) => setRepeat(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="ครั้งเดียว" value="ครั้งเดียว" />
        <Picker.Item label="ทุกวัน" value="ทุกวัน" />
        <Picker.Item label="จันทร์ถึงศุกร์" value="จันทร์ถึงศุกร์" />
        <Picker.Item label="เสาร์ถึงอาทิตย์" value="เสาร์ถึงอาทิตย์" />
      </Picker>

      <Button title="บันทึกนาฬิกาปลุก" onPress={handleSaveAlarm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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

export default AddAlarmScreen;
