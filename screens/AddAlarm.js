// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useNavigation } from "@react-navigation/native";

// const AddAlarm = ({ route }) => {
//   const navigation = useNavigation();
//   const [time, setTime] = useState(new Date());
//   const [repeat, setRepeat] = useState("ครั้งเดียว");
//   const { saveAlarms } = route.params;

//   const handleSave = () => {
//     const newAlarm = {
//       id: Date.now().toString(),
//       time: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`,
//       repeat,
//       enabled: false,
//       notificationId: null,
//     };
//     saveAlarms((prevAlarms) => [newAlarm, ...prevAlarms]);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>เลือกเวลาปลุก:</Text>
//       <DateTimePicker
//         value={time}
//         mode="time"
//         display="default"
//         onChange={(event, selectedDate) => setTime(selectedDate || time)}
//       />
//       <Text style={styles.label}>เลือกการตั้งค่าปลุก:</Text>
//       {/* Add options for repeat */}
//       <View style={styles.buttonGroup}>
//         <TouchableOpacity style={styles.button} onPress={() => setRepeat("ครั้งเดียว")}>
//           <Text style={styles.buttonText}>ครั้งเดียว</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => setRepeat("ทุกวัน")}>
//           <Text style={styles.buttonText}>ทุกวัน</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => setRepeat("วันจันทร์ถึงวันศุกร์")}>
//           <Text style={styles.buttonText}>จันทร์ถึงศุกร์</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => setRepeat("เสาร์ถึงอาทิตย์")}>
//           <Text style={styles.buttonText}>เสาร์อาทิตย์</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>บันทึก</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#000",
//   },
//   label: {
//     fontSize: 24,
//     color: "#fff",
//     marginVertical: 10,
//   },
//   buttonGroup: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//   },
//   button: {
//     backgroundColor: "#FF6347",
//     padding: 10,
//     borderRadius: 5,
//     margin: 5,
//   },
//   buttonText: {
//     color: "#fff",
//   },
//   saveButton: {
//     backgroundColor: "#32CD32",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });

// export default AddAlarm;
