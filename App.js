import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RealTimeClock from "./screens/RealTimeClock";
import Stopwatch from "./screens/Stopwatch";
import Alarm from "./screens/Alarm";
import CountdownTimer from "./screens/CountdownTimer";
import WorldClockScreen from "./screens/WorldClockScreen";
import BottomTab from "./navigations/BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigations/RootStack";

export default function App() {
  return (
    // <RealTimeClock />
    // <Stopwatch />
    // <Alarm />
    // <CountdownTimer/>
    // <WorldClockScreen />
    // <NavigationContainer>
    //         <BottomTab />
    // </NavigationContainer>
    <NavigationContainer>
     <RootStack />
    </NavigationContainer>
  );
}
