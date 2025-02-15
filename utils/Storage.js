import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveProject(data) {
  try {
    await AsyncStorage.setItem("projectData", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving project:", error);
  }
}

export async function loadProject() {
  try {
    const data = await AsyncStorage.getItem("projectData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading project:", error);
    return null;
  }
}
