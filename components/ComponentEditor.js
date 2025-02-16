import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Slider,
} from "react-native";

export default function ComponentEditor({
  visible,
  component,
  onClose,
  onSave,
}) {
  const [editedComponent, setEditedComponent] = useState(component);

  const handleSave = () => {
    onSave(editedComponent);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Customize Component</Text>
          {editedComponent.type === "button" && (
            <View>
              <Text>Color</Text>
              <TextInput
                value={editedComponent.color}
                onChangeText={(text) =>
                  setEditedComponent({ ...editedComponent, color: text })
                }
                style={styles.input}
              />
              <Text>Width</Text>
              <Slider
                value={editedComponent.width}
                onValueChange={(value) =>
                  setEditedComponent({ ...editedComponent, width: value })
                }
                minimumValue={50}
                maximumValue={300}
                step={10}
              />
              <Text>Height</Text>
              <Slider
                value={editedComponent.height}
                onValueChange={(value) =>
                  setEditedComponent({ ...editedComponent, height: value })
                }
                minimumValue={50}
                maximumValue={150}
                step={10}
              />
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginVertical: 10,
  },
  buttonsContainer: { flexDirection: "row", justifyContent: "space-between" },
  button: { padding: 10, backgroundColor: "#007BFF", borderRadius: 5 },
  buttonText: { color: "#fff" },
});
