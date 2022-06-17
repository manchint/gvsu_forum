import React, { useState } from "react";
import { Text, View, FlatList, Linking } from "react-native";
import { updatePost } from "../helpers/forum_posts";
import { getData } from "../helpers/storage_init";
import { Button, Input, Card } from "react-native-elements";
const CommentsScreen = ({ route }) => {
  const [loginData, setLoginData] = useState();
  const [comments, setComments] = useState([]);
  getData(setLoginData);
  const [comment, setComment] = useState("");
  const renderEachComment = (data) => {
    console.log("dhsahf", data);
    return (
      <Card key={`${route.params.data.id} ${data.index}`} style={{}}>
        <Text> {data.item.name}</Text>
        <Text>Comment: {data.item.comment}</Text>
      </Card>
    );
  };
  // useEffect(() => {
  //   try {
  //     initGvsuForumDB();
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setupPostsDataListener((posts) => {
  //     setPostsData(posts);
  //   });
  //   // <<<<<<< Updated upstream
  //   if (route.params?.name === "gvsu home")
  //     window.location.href("https://www.gvsu.edu");
  //   // =======
  //   // console.log("sdfgd", Object.keys(route.params));
  //   // >>>>>>> Stashed changes
  // }, []);
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
      <Text>History of Comments</Text>
      <FlatList
        // delayUpdate={true}
        data={route.params.data.comments}
        renderItem={renderEachComment}
        style={{ margin: 10 }}
      />
    </View>
  );
};

export default CommentsScreen;
