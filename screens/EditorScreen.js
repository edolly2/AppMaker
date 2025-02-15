import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import CustomButton from "../components/Button";
import CustomTextInput from "../components/TextInput";
import ImageComponent from "../components/ImageComponent";

const COMPONENTS = [
  { id: "1", type: "button", label: "Button", color: "blue" },
  { id: "2", type: "textinput", placeholder: "Enter text..." },
  {
    id: "3",
    type: "image",
    source: { uri: "https://via.placeholder.com/100" },
  },
];

export default function EditorScreen() {
  const [items, setItems] = useState(COMPONENTS);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drag & Drop Components</Text>

      <DraggableFlatList
        data={items}
        onDragEnd={({ data }) => setItems(data)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag }) => (
          <View style={styles.component} onLongPress={drag}>
            {item.type === "button" && (
              <CustomButton label={item.label} color={item.color} />
            )}
            {item.type === "textinput" && (
              <CustomTextInput placeholder={item.placeholder} />
            )}
            {item.type === "image" && <ImageComponent source={item.source} />}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  component: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
});
