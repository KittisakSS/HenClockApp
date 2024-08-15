// StopwatchScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StopwatchScreen = () => {
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        const now = Date.now();
        setCurrentTime(now - startTime);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, startTime]);

  const handleStartStop = () => {
    if (running) {
      setRunning(false);
    } else {
      const now = Date.now();
      setStartTime(now - currentTime);
      setRunning(true);
    }
  };

  const handleReset = () => {
    setStartTime(null);
    setCurrentTime(0);
    setRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          running ? styles.pauseButton : styles.startButton,
        ]}
        onPress={handleStartStop}
      >
        <Text style={styles.buttonText}>{running ? "Pause" : "Start"}</Text>
      </TouchableOpacity>
      {!running && startTime !== null && (
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  timeText: {
    fontSize: 80,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "#2ecc71",
  },
  pauseButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default StopwatchScreen;
