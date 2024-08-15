import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const RealDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // อัพเดททุก 1 นาที
    return () => clearInterval(interval);
  }, []);

  const getFormattedDate = (date) => {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear() + 543; // เปลี่ยนเป็น พ.ศ.

    return `วัน${day}ที่ ${dayOfMonth} ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{getFormattedDate(currentDate)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color : "#808080",
  },
});

export default RealDate;
