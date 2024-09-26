import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAlarms } from '../components/AlarmContext';

const Alarmcompo = () => {
  const { alarms, removeAlarm, updateAlarm } = useAlarms();
  const navigation = useNavigation();

  const handleAddAlarm = () => {
    navigation.navigate('AddAlarmScreen');
  };

  const handleDeleteAlarm = async (id) => {
    await removeAlarm(id);
  };

  const handleToggleSwitch = async (id) => {
    const alarm = alarms.find(alarm => alarm.id === id);
    if (alarm) {
      const updatedAlarm = {
        ...alarm,
        enabled: !alarm.enabled,
      };
      await updateAlarm(updatedAlarm);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            {/* เวลานาฬิกาปลุก */}
            <Text style={styles.alarmTime}>{item.time}</Text>
            {/* ป้ายกำกับการปลุก อยู่ระหว่างเวลานาฬิกาปลุกและ Switch */}
            <Text style={styles.alarmRepeat}>{item.repeat}</Text>
            {/* Switch และ ปุ่มถังขยะ */}
            <View style={styles.actionsContainer}>
              <Switch
                value={item.enabled}
                onValueChange={() => handleToggleSwitch(item.id)}
              />
              <TouchableOpacity onPress={() => handleDeleteAlarm(item.id)}>
                <Ionicons name="trash-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAlarm}>
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
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
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  alarmTime: {
    fontSize: 48,
    color: "#FFF",
    flex: 1, // กำหนด flex เพื่อจัดสัดส่วนเวลา
    textAlign: 'center', // จัดให้อยู่ตรงกลาง
  },
  alarmRepeat: {
    fontSize: 18,
    color: "#AAA",
    flex: 1, // กำหนด flex เพื่อจัดสัดส่วนป้าย
    textAlign: 'center', // จัดให้อยู่ตรงกลาง
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // กำหนด flex เพื่อจัดสัดส่วน switch และปุ่มถังขยะ
    justifyContent: "center", // จัดให้อยู่ตรงกลาง
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
});

export default Alarmcompo;
