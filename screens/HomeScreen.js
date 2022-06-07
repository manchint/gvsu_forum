import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
//components
import PostComponent from '../components/PostComponent';


const HomeScreen = ({ route, navigation }) => {
    useEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity
            //   onPress={() =>
            //     navigation.navigate("Settings", {
            //       defaultDistanceUnits: unitState.distanceUnits,
            //       defaultBearingUnits: unitState.bearingUnits,
            //     })
            //   }
            >
              <Feather
                style={{ marginRight: 10 }}
                name="menu"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        });
      });
    return (
        <PostComponent/>
    )
}

export default HomeScreen;