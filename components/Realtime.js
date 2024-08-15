import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Realtime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [textColor, setTextColor] = useState(generateRandomColor());
  const animatedColor = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      animateColor(); // เรียกใช้งานฟังก์ชัน animateColor เพื่อสร้างการเปลี่ยนแปลงสีอย่างต่อเนื่อง
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 1)`;
  }

  function animateColor() {
    setTextColor(generateRandomColor()); // สุ่มสีใหม่
    Animated.timing(animatedColor, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      animatedColor.setValue(0); // รีเซ็ตค่า animatedColor กลับไปที่ 0 เพื่อเตรียมพร้อมสำหรับการสร้างการเปลี่ยนแปลงสีอีกครั้ง
    });
  }

  const interpolatedColor = animatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [textColor, generateRandomColor()],
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.timeText,
          {
            color: interpolatedColor,
            textShadowColor: interpolatedColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          },
        ]}
      >
        {currentTime.toLocaleTimeString()}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 70,
    // fontWeight: 'bold',
  },
});

export default Realtime;
