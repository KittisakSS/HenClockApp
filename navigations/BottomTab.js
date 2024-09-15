import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome } from "@expo/vector-icons";
import RealTimeClock from "../screens/RealTimeClock";
import Alarm from "../screens/Alarm";
import Stopwatch from "../screens/Stopwatch";
import WorldClockScreen from "../screens/WorldClockScreen";
import CountdownTimer from "../screens/CountdownTimer";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white', // เปลี่ยนสีไอคอนเป็นสีขาวเมื่อ active
        tabBarInactiveTintColor: 'gray', // สีไอคอนเมื่อ inactive
        tabBarStyle: { backgroundColor: 'black' }, // เปลี่ยนสีแถบ navigation เป็นสีดำ
        height: 70, // ปรับความสูงของแถบ navigation ให้สูงขึ้น (ค่าเดิมประมาณ 50)
        paddingBottom: 10, // เพิ่ม padding ด้านล่างเพื่อให้ไอคอนอยู่ตรงกลาง
      }}
    >
      <Tab.Screen
        name="RealtimeClock"
        component={RealTimeClock}
        options={{
          tabBarLabel: "นาฬิกา",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="clock-o" color={color} size={30} />
          ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13, // ขนาดตัวอักษรที่ใหญ่ขึ้น
            fontWeight: 'bold', // ตัวอักษรหนา
          }
        }}
      />
      <Tab.Screen
        name="WorldClockScreen"
        component={WorldClockScreen}
        options={{
          tabBarLabel: "นาฬิกาโลก",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="globe" color={color} size={30} />
          ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13, // ขนาดตัวอักษรที่ใหญ่ขึ้น
            fontWeight: 'bold', // ตัวอักษรหนา
          }
        }}
      />
      <Tab.Screen
        name="Alarm"
        component={Alarm}
        options={{
          tabBarLabel: "นาฬิกาปลุก",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell-o" color={color} size={30} />
          ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13, // ขนาดตัวอักษรที่ใหญ่ขึ้น
            fontWeight: 'bold', // ตัวอักษรหนา
          }
        }}
      />
      <Tab.Screen
        name="Stopwatch"
        component={Stopwatch}
        options={{
          tabBarLabel: "จับเวลา",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bolt" color={color} size={30} />
          ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15, // ขนาดตัวอักษรที่ใหญ่ขึ้น
            fontWeight: 'bold', // ตัวอักษรหนา
          }
        }}
      />
      <Tab.Screen
        name="CountdownTimer"
        component={CountdownTimer}
        options={{
          tabBarLabel: "นับถอยหลัง",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="hourglass-half" color={color} size={30} />
          ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 15, // ขนาดตัวอักษรที่ใหญ่ขึ้น
            fontWeight: 'bold', // ตัวอักษรหนา
          }
        }}
      />
    </Tab.Navigator>
  );
}
