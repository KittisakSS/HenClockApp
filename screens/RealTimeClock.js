import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Realtime from "../components/Realtime";
import RealDate from "../components/RealDate";
import Thailand from "../components/Thailand";



export default function RealTimeClock() {
  return (
    
    <View style={{ flex: 1,
        backgroundColor: '#000000',
        // alignItems: 'center',
        // justifyContent: 'center',
         }}>
      <StatusBar style="auto" />
      <View style = {{
        marginTop : 0,
      }} >
        <Text style = {{
            margin: 20,
            color : "#FFFFFF",
            fontSize : 40,
        }}> นาฬิกา </Text>
    </View>
      <Realtime />
      <RealDate />
      <Thailand />
    </View>
    
    
  );
}
