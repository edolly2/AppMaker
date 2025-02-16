import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import CustomButton from "../components/Button";
import CustomTextInput from "../components/TextInput";
import ImageComponent from "../components/ImageComponent";
import ComponentEditor from "../components/ComponentEditor";

const COMPONENTS = [
  {
    id: "1",
    type: "button",
    label: "Button",
    color: "blue",
    width: 100,
    height: 50,
  },
  {
    id: "2",
    type: "textinput",
    placeholder: "Enter text...",
    width: 200,
    height: 50,
  },
  {
    id: "3",
    type: "image",
    source: { uri: "https://via.placeholder.com/100" },
    width: 100,
    height: 100,
  },
];

export default function EditorScreen() {
  const [items, setItems] = useState([]);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentDrop = (component) => {
    setItems((prevItems) => [...prevItems, component]);
  };

  const openEditor = (component) => {
    setSelectedComponent(component);
    setEditorVisible(true);
  };

  const closeEditor = () => {
    setEditorVisible(false);
    setSelectedComponent(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Builder - Drag & Drop</Text>

      <DraggableFlatList
        data={items}
        onDragEnd={({ data }) => setItems(data)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag }) => (
          <TouchableOpacity
            style={[
              styles.component,
              { width: item.width, height: item.height },
            ]}
            onLongPress={drag}
            onPress={() => openEditor(item)}
          >
            {item.type === "button" && (
              <CustomButton label={item.label} color={item.color} />
            )}
            {item.type === "textinput" && (
              <CustomTextInput placeholder={item.placeholder} />
            )}
            {item.type === "image" && <ImageComponent source={item.source} />}
          </TouchableOpacity>
        )}
      />

      <View style={styles.sidebar}>
        {COMPONENTS.map((component) => (
          <TouchableOpacity
            key={component.id}
            style={styles.draggableComponent}
            onLongPress={() => handleComponentDrop(component)}
          >
            {component.type === "button" && (
              <CustomButton label={component.label} color={component.color} />
            )}
            {component.type === "textinput" && (
              <CustomTextInput placeholder={component.placeholder} />
            )}
            {component.type === "image" && (
              <ImageComponent source={component.source} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedComponent && (
        <ComponentEditor
          visible={isEditorVisible}
          component={selectedComponent}
          onClose={closeEditor}
          onSave={(updatedComponent) => {
            const updatedItems = items.map((item) =>
              item.id === updatedComponent.id ? updatedComponent : item
            );
            setItems(updatedItems);
            closeEditor();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  sidebar: { width: 100, padding: 10, backgroundColor: "#ddd" },
  draggableComponent: {
    padding: 10,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  component: {
    margin: 5,
    padding: 10,
    backgroundColor: "#aaa",
    borderRadius: 5,
  },
});
