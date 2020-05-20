import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const componentDidMount = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };
  componentDidMount();
  console.log(Camera.Constants.Type);
  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No Permission yet</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );
  } else if (hasPermission === true) {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 0.75 }} type={type}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Flip
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}
