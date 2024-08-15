import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Alarmcompo from "../components/Alarmcompo";

export default function Alarm() {
  return (
    
    <View style={{ flex: 1,
        backgroundColor: '#000000',
        // alignItems: 'center',
        // justifyContent: 'center',
         }}>
      <StatusBar style="auto" />
      <View style = {{
        marginTop : 50,
      }} >
        <Text style = {{
            margin: 20,
            color : "#FFFFFF",
            fontSize : 40,
        }}> การปลุก </Text>
    </View>
      <Alarmcompo />
    </View>
    
    
  );
}
