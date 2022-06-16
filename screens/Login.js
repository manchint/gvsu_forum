import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";

const image = {
  uri: "https://app.streamlineathletes.com/assets/programs/108/grand-valley-state-university_hero.jpg",
};
const img = { img01d: require("../assets/Loginlogo.svg") };

const Login = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Password"
            placeholderTextColor="#003f5c"
          />
        </View>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "40%",
    height: 45,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "blue",
  },
});

export default Login;
