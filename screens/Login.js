import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";

//helper function
import { saveData, getData } from "../helpers/storage_init";

const image = {
  uri: "https://app.streamlineathletes.com/assets/programs/108/grand-valley-state-university_hero.jpg",
};

import { initGvsuForumDB } from "../helpers/forum_config";
import { setupUsersDataListener } from "../helpers/forum_users";

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
    getData(setLoginData);
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log(err);
    }
    setupUsersDataListener((users) => {
      setUsersData(users);
    });
    if (loginData.email) {
      navigation.navigate("Home");
    }
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
      let response = usersData.filter((user) => user.email === loginData.email);
      if (response.length > 0) {
        if (decrypt(response[0].password) === loginData.password) {
          saveData(response[0]);
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
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Not a member Yet?
            <Text
              style={{ color: "blue" }}
              onPress={() => navigation.navigate("Sign up")}
            >
              click here
            </Text>{" "}
            signup
          </Text>
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
  },
});

export default Login;
