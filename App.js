import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
//importing screens
import HomeScreen from "./screens/HomeScreen";
import Signup from "./screens/Signup";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Sign up" component={Signup} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen
          name="GVSU Home"
          component={() => Linking.openURL("https://lms.gvsu.edu/ultra/institution-page")}
        />
        <Drawer.Screen
          name="Black Board"
          component={() =>
            Linking.openURL("https://lms.gvsu.edu/ultra/institution-page")
          }
        />
        <Drawer.Screen
          name="Banner"
          component={() => Linking.openURL("https://www.gvsu.edu/banner/")}
        />

        <Drawer.Screen
          name="Faculty Staff"
          component={() =>
            Linking.openURL("https://www.gvsu.edu/facultystaff.htm")
          }
        />

        {/* <Drawer.Screen name="BlackBoard"><Text style={{color: 'blue'}}
                onPress={() => Linking.openURL('http://google.com')}>
            Google
            </Text></Drawer.Screen> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const navStyling = {
  headerStyle: {
    backgroundColor: "#0065A4",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};
