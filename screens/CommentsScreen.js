import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Button, Input, Card } from "react-native-elements";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

//helper functions
import { updatePost } from "../helpers/forum_posts";
import { getData } from "../helpers/storage_init";

const CommentsScreen = ({ route }) => {
  const [loginData, setLoginData] = useState();
  getData(setLoginData);
  const [comment, setComment] = useState("");
  const renderEachComment = (data) => {
    return (
      <Card key={`${route.params.data.id} ${data.index}`}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="user-circle-o" size={24} color="black" />

          <Text style={{ marginLeft: 10 }}>{data.item.name}</Text>
        </View>

        <Text>Comment: {data.item.comment}</Text>
      </Card>
    );
  };
  const updateComment = () => {
    let comments = route.params.data.comments;
    if (comments === 0) {
      comments = [{ name: loginData.email, comment: comment }];
    } else {
      comments.push({ name: loginData.email, comment: comment });
    }
    updatePost({ ...route.params.data, comments: comments });
    setComment("");
  };
  return (
    <View style={{ flex: 1 }}>
      <Input
        value={comment}
        placeholder={"Enter Your Thoughts"}
        onChangeText={(val) => setComment(val)}
      ></Input>
      <Button
        title={"Comment"}
        onPress={updateComment}
        style={{ margin: 10 }}
        disabled={comment.length <= 0}
      ></Button>
      <Text>Comments History</Text>
      <FlatList
        data={route.params.data.comments}
        renderItem={renderEachComment}
        style={{ margin: 10 }}
      />
    </View>
  );
};

export default CommentsScreen;
