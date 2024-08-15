import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  // ดึงวันที่ปัจจุบันในรูปแบบ 'YYYY-MM-DD'
  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Calendar
        // ตั้งค่าวันที่ปัจจุบัน
        current={today}
        // แสดงเดือน/ปีปัจจุบัน
        monthFormat={'MMMM yyyy'}
        // ปิด header เริ่มต้น
        hideArrows={false}
        // ปรับแต่งหัวของปฏิทิน
        theme={{
          calendarBackground: '#FF6F61', // เปลี่ยนสีพื้นหลังของปฏิทิน
          textSectionTitleColor: '#fff',  // สีของชื่อวันในสัปดาห์
          todayTextColor: '#FFFFFF',  // สีของวันที่เป็นวันนี้
          dayTextColor: '#FFFFFF',  // สีของวันที่ปกติ
          selectedDayBackgroundColor: '#fff',  // พื้นหลังของวันที่เลือก
          selectedDayTextColor: '#FF6F61',  // สีของวันที่เลือก
          arrowColor: '#FFFFFF',  // สีของลูกศรเปลี่ยนเดือน
          monthTextColor: '#FFFFFF',  // สีของข้อความเดือน
          textDayFontWeight: '300',  // น้ำหนักของฟอนต์วันที่
          textMonthFontWeight: 'bold',  // น้ำหนักของฟอนต์เดือน
          textDayHeaderFontWeight: '500',  // น้ำหนักของฟอนต์วันในสัปดาห์
          textDayFontSize: 18,  // ขนาดฟอนต์วันที่
          textMonthFontSize: 20,  // ขนาดฟอนต์เดือน
          textDayHeaderFontSize: 16,  // ขนาดฟอนต์วันในสัปดาห์
        }}
        // กำหนดให้แสดงวันที่เลือกเป็นวันปัจจุบัน
        markedDates={{
          [today]: {
            selected: true,
            marked: true,
            selectedColor: '#fff',
            dotColor: '#FF6F61'
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',  // พื้นหลังของหน้าจอ
    justifyContent: 'center',
    padding: 10,
  },
});

export default CalendarScreen;
