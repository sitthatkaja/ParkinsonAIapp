import { CameraView, Camera } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";

export default function CameraFunction() {
  const [cameraPermission, setCameraPermission] = useState();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState();
  const [micPermission, setMicPermission] = useState();
  const [facing] = useState("front");
  const [video, setVideo] = useState();
  const [recording, setRecording] = useState(false);
  const [instruction, setInstruction] = useState("");
  let cameraRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      setCameraPermission(cameraPermission.status === "granted");
      setMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      setMicPermission(microphonePermission.status === "granted");
    })();
  }, []);

  if (
    cameraPermission === undefined ||
    mediaLibraryPermission === undefined ||
    micPermission === undefined
  ) {
    return <Text>Requesting Permissions....</Text>;
  } else if (!cameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings
      </Text>
    );
  }

  async function recordVideo() {
    setRecording(true);
    setInstruction("กรุณาขยับหน้าไว้ในกรอบ");

    setTimeout(() => {
      setInstruction("กรุณายิ้ม");
    }, 5000);

    cameraRef.current.recordAsync({
      maxDuration: 10,
    }).then((newVideo) => {
      setVideo(newVideo);
      setRecording(false);
    });
  }

  function stopRecording() {
    setRecording(false);
    cameraRef.current.stopRecording();
    setInstruction("");
  }

  if (video) {
    let uri = video.uri;
    navigation.navigate("Video", { uri });
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        mode="video"
      >
        <View style={styles.overlay}>
          <View style={styles.oval}></View>
        </View>

        <View style={styles.shutterContainer}>
          {recording ? (
            <TouchableOpacity style={styles.button} onPress={stopRecording}>
              <Ionicons name="stop-circle-outline" size={80} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={recordVideo}>
              <Ionicons name="play-circle-outline" size={80} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.message}>{instruction}</Text>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 70, // เพิ่มขนาดฟอนต์ตรงนี้
    color: "white",
    position: "absolute",
    top: 50,
    width: "100%",
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
  },
  shutterContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: "18%",
    left: "50%",
    transform: [{ translateX: -120 }],
    justifyContent: "center",
    alignItems: "center",
  },
  oval: {
    width: 240,
    height: 360,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: "white",
  },
});
