import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddAlarm from "../screens/AddAlarm";
import BottomTab from "./BottomTab";

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="BottomTab">
      <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
      {/* <Stack.Screen name="AddAlarm" component={AddAlarm} /> */}
      
    </Stack.Navigator>
  );
}
