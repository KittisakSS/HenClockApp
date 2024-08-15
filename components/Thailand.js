import React from "react";
import { Image, View } from "react-native";

export default function Thailand() {
  return (
    <View style={{ padding: 70}}>
      {/* View ก้อนที่ 2 */}
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ flex: 1, resizeMode: "cover" }}
          source={require("../assets/image/ThaiCir.png")}
        />
      </View>
    </View>
  );
}