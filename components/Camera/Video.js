import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";

export default function VideoScreen({ route }) {
  const { uri } = route.params;
  const navigation = useNavigation();

  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  // ฟังก์ชันบันทึกวิดีโอ
  let saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(uri).then(() => {
      Alert.alert("สำเร็จ", "บันทึกวิดีโอเรียบร้อยแล้ว");
      navigation.popToTop(); // กลับไปหน้าแรกของ Stack
    });
  };

  // ฟังก์ชันไม่บันทึกวิดีโอ
  let discardVideo = () => {
    Alert.alert("ยกเลิก", "ไม่ได้บันทึกวิดีโอ");
    navigation.popToTop(); // กลับไปหน้าแรกของ Stack
  };

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={saveVideo} style={styles.btn}>
          <Ionicons name="save-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={discardVideo} style={styles.btn}>
          <Ionicons name="trash-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  btn: {
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
});
