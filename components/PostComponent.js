import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import { Linking } from 'react-native';

const PostComponent = () => {
    return (
        <View style={[styles.margin20, styles.borderBottom]}>
            <View style={[styles.flexHorizontal]}>
                <EvilIcons name="user" size={24} color="black"  style={[styles.margin5]}/>
                <View style={[styles.flexVertical]}>
                    <Text>sdcds</Text>
                    <Text>sdcds</Text>
                </View>
            </View>
            <View style={[styles.border]}>
                <Text style={[styles.margin5]}>dcvsdvlsvnsdkvnksdnvkjsnvkjsvjksnvksdnkfj</Text>
            </View>
            <View style={[styles.flexHorizontal]}>
                <Button style={[styles.padding10]}>Like</Button>
                <Button style={[styles.padding10]}>Comments</Button>
            </View>
            <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL('http://google.com')}>
            Google
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexHorizontal: {
        flexDirection: 'row'
    },
    flexVertical: {
        flexDirection: 'column'
    },
    margin20: {
        margin: 20
    },
    margin5: {
        margin: 5
    },
    border: {
        border: '1px'
    },
    borderBottom: {
        borderBottom: '1px'
    },
    padding10: {
        padding: 10
    }
  });
  

export default PostComponent;