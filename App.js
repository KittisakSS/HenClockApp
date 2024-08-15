import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RealTimeClock from "./screens/RealTimeClock";
import Stopwatch from "./screens/Stopwatch";
import Alarm from "./screens/Alarm";
import CountdownTimer from "./screens/CountdownTimer";

export default function App() {
  return (
    // <RealTimeClock />
    // <Stopwatch />
    // <Alarm />
    <CountdownTimer/>
  );
}
