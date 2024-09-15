import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from "react-native";

const countries = [
  {
    name: "United Kingdom",
    timeZone: "Europe/London",
    flag: require("../assets/uk.png"),
  },
  {
    name: "Japan",
    timeZone: "Asia/Tokyo",
    flag: require("../assets/japan.png"),
  },
  {
    name: "South Korea",
    timeZone: "Asia/Seoul",
    flag: require("../assets/korea.png"),
  },
  {
    name: "Singapore",
    timeZone: "Asia/Singapore",
    flag: require("../assets/singapore.png"),
  },
  {
    name: "India",
    timeZone: "Asia/Kolkata",
    flag: require("../assets/india.png"),
  },
  {
    name: "France",
    timeZone: "Europe/Paris",
    flag: require("../assets/france.png"),
  },
  {
    name: "Germany",
    timeZone: "Europe/Berlin",
    flag: require("../assets/germany.png"),
  },
  {
    name: "United States",
    timeZone: "America/New_York",
    flag: require("../assets/usa.png"),
  },
  {
    name: "Turkey",
    timeZone: "Europe/Istanbul",
    flag: require("../assets/turkey.png"),
  },
  {
    name: "China",
    timeZone: "Asia/Shanghai",
    flag: require("../assets/china.png"),
  },
];

const WorldClockScreen = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimes = countries.map((country) => {
        const time = new Date().toLocaleString("en-US", {
          timeZone: country.timeZone,
        });
        return { ...country, time };
      });
      setTimes(currentTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.country}>{item.name}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Image source={item.flag} style={styles.flag} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>นาฬิกาทั่วโลก</Text>
      <FlatList
        data={times}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    color: "white",
    padding: 20,
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 1,
  },
  list: {
    flex: 1,
    marginTop: 60, // เพิ่มช่องว่างด้านบนเพื่อไม่ให้ทับข้อความ header
  },
  item: {
    width: Dimensions.get('window').width,
    alignItems: "center",
    padding: 20,
    marginTop : 200,
  },
  flag: {
    width: 400,
    height: 320,
    marginTop: 30,
  },
  country: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  time: {
    fontSize: 34,
    color: "white",
  },
});

export default WorldClockScreen;
