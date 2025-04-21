import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraFunction from './components/Camera/CameraFunction';
import VideoScreen from './components/Camera/Video';


function StartScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        style={{
          width: "80%",
          padding: 10,
          borderColor: "red",
          borderWidth: 1,
          borderRadius: 15,
        }}
        onPress={() => navigation.navigate("Camera")}
      >
        <Text style={{ textAlign: "center", color: "red", fontSize: 18 }}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Parkinson App" component={StartScreen} />
        <Stack.Screen name="Camera" component={CameraFunction} />
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

