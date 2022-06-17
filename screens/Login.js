import React, { useState, useEffect } from "react";
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
//const img = { img01d: require("../assets/Loginlogo.svg") };

import { initGvsuForumDB } from "../helpers/forum_config";
import { setupUsersDataListener } from "../helpers/forum_users";
import { data } from "../helpers/user_config";

const CryptoJS = require("crypto-js");

const decrypt = (data) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};
const Login = ({ route, navigation }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errLogin, setErrLogin] = useState({
    email: "",
    password: "",
  });
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log(err);
    }
    setupUsersDataListener((users) => {
      setUsersData(users);
    });
  }, []);

  const validateAndLogin = () => {
    let isValidData = true;
    if (loginData.email === "") {
      isValidData = false;
      setErrLogin({ ...errLogin, email: "Please enter your email" });
    }
    if (loginData.password === "") {
      isValidData = false;
      setErrLogin({ ...errLogin, password: "Please enter your password" });
    }

    if (isValidData) {
      let data = usersData.filter((user) => user.email === loginData.email);
      if (data.length > 0) {
        if (decrypt(data[0].password) === loginData.password) {
          data = data[0];
          navigation.navigate("Home");
        } else setErrLogin({ ...errLogin, password: "Wrong password" });
      } else {
        //display error message no user found
      }
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.inputView}>
            <Input
              style={styles.TextInput}
              placeholder="Enter Email"
              placeholderTextColor="#003f5c"
              value={loginData.email}
              errorStyle={styles.inputError}
              errorMessage={errLogin.password}
              // errorMessage={"Hi"}

              onChangeText={(val) => setLoginData({ ...loginData, email: val })}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              style={styles.TextInput}
              placeholder="Enter Password"
              placeholderTextColor="#003f5c"
              value={loginData.password}
              secureTextEntry={true} //for not displaying the password
              errorStyle={styles.inputError}
              errorMessage={errLogin.password}
              onChangeText={(val) =>
                setLoginData({ ...loginData, password: val })
              }
            />
          </View>
          <Button
            style={{ marginTop: 30 }}
            title={"LOGIN"}
            onPress={validateAndLogin}
          ></Button>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    width: "70%",
    height: 45,
    marginBottom: 30,
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
  inputError: {
    color: "red",
    fontWeight: "bold",
    // fontSize: "25",
  },
});

export default Login;
