import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function Zodiact() {
  const zody = [
    {
      id: "1",
      title: "ราศีมังกร",
      Image: require("../assets/image/1Dragon.png"),
    },
    { id: "2", title: "ราศีกุมภ์ ", uri: ".../trip-2.jpg" },
  ];

  return (
    <View style={props.style}>
      <Text style={{ fontSize: 20 }}>Tour</Text>
      <Text style={{ color: "grey", marginBottom: 20 }}>
        Let find out what most interesting things
      </Text>
      <FlatList
        horizontal={true}
        data={zody}
        renderItem={({ item, index }) => {
          console.log(item, index, item.uri);
          return (
            <View style={{ marginRight: 10 }}>
              <Image
                style={{ width: 200, height: 150, borderRadius: 10 }}
                source={{
                  uri: item.uri,
                }}
              />
              <View
                style={{
                  marginTop: -30,
                  height: 30,
                  width: 200,
                  paddingHorizontal: 10,
                  backgroundColor: "black",
                  opacity: 0.5,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
