import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Card } from "react-native-elements";

import { Linking } from "react-native";

const PostComponent = (props) => {
  console.log("vv", props.item);
  return (
    <Card>
      <View style={[styles.margin20, styles.borderBottom]}>
        <View style={[styles.flexHorizontal]}>
          <EvilIcons
            name="user"
            size={24}
            color="black"
            style={[styles.margin5]}
          />
          <View style={[styles.flexVertical]}>
            <Text>{props.item.user}</Text>
            <Text>King</Text>
          </View>
        </View>
        <View style={[styles.border]}>
          <Text style={[styles.margin5]}>{props.item.text}</Text>
        </View>
        <View style={[styles.flexHorizontal]}>
          <Button style={[styles.padding10]} title={"LIKE"}>
            Like
          </Button>
          <Button style={[styles.padding10]} title={"COMMENTS"}>
            Comments
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flexHorizontal: {
    flexDirection: "row",
  },
  flexVertical: {
    flexDirection: "column",
  },
  margin20: {
    marginLeft: 20,
    marginRight: 20,
  },
  margin5: {
    margin: 5,
  },
  border: {
    border: "1px",
  },
  borderBottom: {
    borderBottom: "1px",
  },
  padding10: {
    padding: 10,
  },
});

export default PostComponent;
