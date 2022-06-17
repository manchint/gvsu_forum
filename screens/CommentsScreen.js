import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { updatePost } from "../helpers/forum_posts";
import { getData } from "../helpers/storage_init";
import { Button, Input, Card } from "react-native-elements";
const CommentsScreen = ({ route, navigation }) => {
  const [loginData, setLoginData] = useState();
  getData(setLoginData);
  console.log("jgfefwehfhwefhuwejdkjwefhjcbweh", route.params);
  const [comment, setComment] = useState("");
  const renderEachComment = (data) => {
    console.log("data", data);
    return (
      <View>
        <View>
          <Text item={data.item} />
        </View>
        <View>
          {/* <Input
                    value={comment}
                    onChangeText={(val) => setComment(val)}></Input>
                    <Button>comment</Button> */}
        </View>
      </View>
    );
  };
  const updateComment = () => {
    let comments = route.params.data.comments;
    if (comments === 0) {
      comments = [{ name: loginData.email, comment: comment }];
      //updatePost({ ...props.item, likes: ['sdcsdc']});
    } else {
      comments.push([{ name: loginData.email, comment: comment }]);
      // if (checkCurrentUserLike()) {
      //     likes = postData.likes.filter(item => item !== 'fdvcdfvx')
      // }
      //updatePost({ ...props.item, likes: ['sdcsdc']});
    }
    updatePost({ ...route.params.data, comments: comments });
  };
  return (
    <View>
      <FlatList data={route.data} renderItem={renderEachComment} />
      <Input value={comment} onChangeText={(val) => setComment(val)}></Input>
      <Button title={"Comment"} onPress={updateComment}></Button>
    </View>
  );
};

export default CommentsScreen;
