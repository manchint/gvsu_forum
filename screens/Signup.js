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
import { email } from "../helpers/user_config";

const image = {
  uri: "https://www.gvsu.edu/cms4/asset/C7753713-BC76-10D4-782FD4F10538B49B/campus_involvement[1550090245].jpg",
};
//const img = { img01d: require("../assets/Loginlogo.svg") };

import { initGvsuForumDB } from "../helpers/forum_config";
import { addUser } from "../helpers/forum_users";

const CryptoJS = require('crypto-js');

const encrypt = (text) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const Signup = ({route, navigation}) => {
  const [userData, setUserData] = useState({
    email:'',
    firstname:'',
    lastname:'',
    password:'',
    confirmPassword:''
  });

  const [errState, setErrState] = useState({
    email:'',
    firstname:'',
    lastname:'',
    password:'',
    confirmPassword:''
  })

  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log("An Error occurred while initializing DB"+err);
    }
  }, [])

  const validateUserData = () => {
    
    let isValidData = true
    setErrState({
      ...errState,
      email:'',
      firstname:'',
      lastname:'',
      password:'',
      confirmPassword:''
    })
    //Verifying Email
    if (userData.email === '') {
      isValidData = false
      console.log("sdvdavcx", userData)
      setErrState({...errState, email:'Please Enter your email'})
    }
    else if (!userData.email.endsWith('gvsu.edu')) {
      isValidData = false
      setErrState({...errState, email:'Please provide your GVSU email'})
    }

    //Verifying First Name
    if(userData.firstname === '') {
      isValidData = false
      setErrState({...errState, firstname:'Please enter your first name'})
    }

    //Verifying Last Name
    if(userData.lastname === '') {
      isValidData = false
      setErrState({...errState, lastname:'Please enter your last name'})
    }

    //Verifying First Name
    if(userData.password === '') {
      isValidData = false
      setErrState({...errState, password:'Please provide password'})
    }

    //Verifying First Name
    if(userData.confirmPassword === '') {
      isValidData = false
      setErrState({...errState, confirmPassword:'Please provide password'})
    }
    else if(userData.confirmPassword !== userData.password) {
      isValidData = false
      setErrState({...errState, confirmPassword:'Password doesnot match'})
    }

    if(isValidData) {
      delete userData.confirmPassword;
      addUser({...userData, password:encrypt(userData.password)});
      navigation.navigate("Login")
    }
    
  } 
  return(
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "blue",
            textAlign: "auto",
            padding: 10,
          }}
        >
          Welcome to GVSU
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={userData.email}
            errorStyle={styles.inputError}
            errorMessage={errState.email}
            onChangeText={(val) => setUserData({...userData, email:val})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            value={userData.firstname}
            errorStyle={styles.inputError}
            errorMessage={errState.firstname}
            onChangeText={(val) => setUserData({...userData, firstname:val})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            value={userData.lastname}
            errorStyle={styles.inputError}
            errorMessage={errState.lastname}
            onChangeText={(val) => setUserData({...userData, lastname:val})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={true} //for not displaying the password
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={userData.password}
            errorStyle={styles.inputError}
            errorMessage={errState.password}
            onChangeText={(val) => setUserData({...userData, password:val})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Your Password"
            secureTextEntry={true} //for not displaying the password
            placeholderTextColor="#003f5c"
            value={userData.confirmPassword}
            errorStyle={styles.inputError}
            errorMessage={errState.confirmPassword}
            onChangeText={(val) => setUserData({...userData, confirmPassword:val})}
          />
        </View>
        <Button style={styles.loginText} onPress={() => validateUserData()}>SIGNUP</Button>
        {/* <TouchableOpacity style={styles.loginBtn}>
          <Button style={styles.loginText} onPress={() => validateUserData()}>SIGNUP</Button>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  </View>
  )
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
  inputError: {
    color: "red",
  },
});

export default Signup;
