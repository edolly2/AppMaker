import React from "react";
import { Image, StyleSheet } from "react-native";

export default function ImageComponent({ source }) {
  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: { width: 100, height: 100, margin: 5 },
});
