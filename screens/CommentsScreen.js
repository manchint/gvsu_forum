import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Linking,
  } from "react-native";
import { Button, Input, Card } from "react-native-elements";
const CommentsScreen = ({route, navigation}) => {
    console.log("jgfefwehfhwefhuwejdkjwefhjcbweh", route.params)
    const [comment, setComment] = useState('')
    const renderEachComment = (data) => {
        console.log("data", data)
        return (
            <View>
                <Input
                    value={comment}
                    onChangeText={(val) => setComment(val)}></Input>
                <Button>comment</Button>
                {/* <Text item={data.item} /> */}
            </View>
        )
      };
    return(
        <FlatList data={route.data} renderItem={renderEachComment}/>
    )
}

export default CommentsScreen;