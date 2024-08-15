import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import CountCompo from "../components/CountCompo";

export default function CountdownTimer() {
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
        }}> การนับถอยหลัง </Text>
    </View>
      <CountCompo />
    </View>
    
    
  );
}
