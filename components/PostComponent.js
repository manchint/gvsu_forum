import { StyleSheet, Text, View } from "react-native";
import React, {useEffect} from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Card } from "react-native-elements";

import { Linking } from "react-native";
import { initGvsuForumDB } from "../helpers/forum_config";
import { updatePost } from "../helpers/forum_posts";
const PostComponent = (props) => {
  useEffect(() => {
    try {
      initGvsuForumDB();
    } catch (err) {
      console.log("An Error occurred while initializing DB" + err);
    }
  }, [])
  const checkCurrentUserLike = () => {
    var currentUserLike = props.item.likes.filter(item => item === 'fdvcdfvx')
    return currentUserLike.length > 0
  }
  const updateLike = () => {
    let likes = props.item.likes;
    if (likes === 0) {
        likes = ['fdvcdfvx']
        //updatePost({ ...props.item, likes: ['sdcsdc']});
    }
    else {
        likes.push(['svsdsd'])
        if (checkCurrentUserLike()) {
            likes = postData.likes.filter(item => item !== 'fdvcdfvx')
        }
        //updatePost({ ...props.item, likes: ['sdcsdc']});
    }
    updatePost({ ...props.item, likes: likes});
  }
  const updateComment = () => {
    let comments = props.item.likes;
    if (comments === 0) {
        comments = [{name:'sdvsdv', comment:'sdvcdsvs'}]
        //updatePost({ ...props.item, likes: ['sdcsdc']});
    }
    else {
        comments.push([{name:'sdvsdv', comment:'sdvcdsvs'}])
        // if (checkCurrentUserLike()) {
        //     likes = postData.likes.filter(item => item !== 'fdvcdfvx')
        // }
        //updatePost({ ...props.item, likes: ['sdcsdc']});
    }
    updatePost({ ...props.item, comments: likes});
  }
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
            <Text>{props.item.date}</Text>
          </View>
        </View>
        <View style={[styles.border]}>
          <Text style={[styles.margin5]}>{props.item.text}</Text>
        </View>
        <View style={[styles.flexHorizontal]}>
          <Button style={[styles.padding10]} 
            title={props.item.likes === 0 ? ` ${props.item.likes} Likes` : `${props.item.likes.length} Likes`}
            onPress={updateLike}>
          </Button>
          <Button style={[styles.padding10]} 
            title={props.item.comments === 0 ? ` ${props.item.comments} Comments` : `${props.item.comments.length} Comments`}
            onPress={() => props.navigateToComments(props.item.comments)}>
            
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
