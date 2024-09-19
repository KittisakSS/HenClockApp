import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddAlarm from "../screens/AddAlarmScreen";
import BottomTab from "./BottomTab";
import AddAlarmScreen from "../screens/AddAlarmScreen";
import Alarmcompo from "../components/Alarmcompo";
import { AlarmProvider } from "../components/AlarmContext";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <AlarmProvider>
    <Stack.Navigator initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="Alarmcompo" component={Alarmcompo} />
      <Stack.Screen name="AddAlarmScreen" component={AddAlarmScreen} />
      
    </Stack.Navigator>
    </AlarmProvider>
  );
}
