import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, Vibration, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";

const CountCompo = () => {
  // ตั้งค่าเริ่มต้นของเวลาเป็น 00:00:00
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            Vibration.vibrate();
            triggerNotification();
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const triggerNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: "The countdown has ended.",
      },
      trigger: null,
    });
  };

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>ตัวจับเวลา</Text> */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={hours}
          style={styles.picker}
          onValueChange={(itemValue) => setHours(itemValue)}
        >
          {[...Array(24).keys()].map((i) => (
            <Picker.Item key={i} label={String(i)} value={i} />
          ))}
        </Picker>
        <Picker
          selectedValue={minutes}
          style={styles.picker}
          onValueChange={(itemValue) => setMinutes(itemValue)}
        >
          {[...Array(60).keys()].map((i) => (
            <Picker.Item key={i} label={String(i)} value={i} />
          ))}
        </Picker>
        <Picker
          selectedValue={seconds}
          style={styles.picker}
          onValueChange={(itemValue) => setSeconds(itemValue)}
        >
          {[...Array(60).keys()].map((i) => (
            <Picker.Item key={i} label={String(i)} value={i} />
          ))}
        </Picker>
      </View>
      <View style={styles.timer}>
        <Text style={styles.timerText}>
          {`${String(Math.floor(timeLeft / 3600)).padStart(2, "0")}:${String(
            Math.floor((timeLeft % 3600) / 60)
          ).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`}
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Start" onPress={startTimer} disabled={isRunning} />
        <Button title="Reset" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

  },
  picker: {
    height: 50,
    width: 100,
    color: "#fff",
    backgroundColor: "gray",
  },
  timer: {
    marginVertical: 40,

  },
  timerText: {
    color: "#fff",
    fontSize: 80,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
});

export default CountCompo;
