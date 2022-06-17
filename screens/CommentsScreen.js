import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Linking,
} from "react-native";
import { updatePost } from "../helpers/forum_posts";
import { getData } from "../helpers/storage_init";
import { Button, Input, Card } from "react-native-elements";
const CommentsScreen = ({ route }) => {
  const [loginData, setLoginData] = useState();
  const [comments, setComments] = useState([])
  getData(setLoginData);
  const [comment, setComment] = useState("");
  const renderEachComment = (data) => {
      console.log("dhsahf", data)
    return (
      <View>
          <Text item={data.item.comment} />
          <Text item={data.item.name} />
      </View>
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
  };
  return (
    <View>
      <Input value={comment} onChangeText={(val) => setComment(val)}></Input>
      <Button title={"Comment"} onPress={updateComment}></Button>
      <FlatList delayUpdate={true} data={route.params.data.comments} renderItem={renderEachComment} />
    </View>
  );
};

export default CommentsScreen;
