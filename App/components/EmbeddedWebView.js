import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  Clipboard
} from "react-native";

import { WebView } from "react-native-webview";

const Screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: Screen.height * 0.85,
    backgroundColor: "#fff",
    // The properties below only work with iOS, not Android
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 0.25, // 25%
    shadowOffset: { width: 0, height: -1 }
  },
  loadingContainer: {
    position: "absolute",
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center"
  },
  topBar: {
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  inputText: {
    color: "#3d3c41"
  }
});

// Copying url to clipboard
writeToClipboard = async url => {
  await Clipboard.setString(url);
  alert("Copied to clipboard.");
};

export const EmbeddedWebView = ({ url }) => (
  <View style={styles.container}>
    <View style={styles.topBar}>
      <View style={styles.input}>
        <Text
          style={styles.inputText}
          numberofLines={1}
          ellipsizeMode="tail"
          onPress={() => this.writeToClipboard(url)}
        >
          {url}
        </Text>
      </View>
    </View>

    <WebView
      source={{ uri: url }}
      startInLoadingState
      renderLoading={() => (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    />
  </View>
);
