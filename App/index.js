import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';
import Home from './Screens/Home';
import Icon from 'react-native-vector-icons/FontAwesome';
const firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAsh5WqReUlgIRYThesSaLaGOsOoSFpGcU",
  authDomain: "todo-a2392.firebaseapp.com",
  databaseURL: "https://todo-a2392.firebaseio.com",
  storageBucket: "todo-a2392.appspot.com",
  messagingSenderId: "1089373916093"
};

firebase.initializeApp(config);

export default class ToDo extends Component {
  renderScene(route, navigator) {
     if(route.name == 'Home') {
       return <Home navigator={ navigator } />
     }
     if(route.name == 'Login') {
       return <View style={ styles.todo }><Text>Login!</Text></View>
     }
  }
  render() {
    var NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        return null
      },
      RightButton(route, navigator, index, navState) {
        return <View style={ styles.rightButton }><Icon name="bolt" size={14} color="#FFF" /></View>
      },
      Title(route, navigator, index, navState) {
        return <View style={ styles.navTitle }><View><Text style={ styles.navTitleText }>ToDo</Text></View></View>
      }
    }
    return (
      <View
        style={ styles.container }>
        <StatusBar
          barStyle="light-content"
          hidden={false} />
        <Navigator
          initialRoute={{ name: 'Home' }}
          renderScene={ this.renderScene }
          style={ styles.navigator_ }
          navigationBar={
            <Navigator.NavigationBar
              style={ styles.nav }
              routeMapper={ NavigationBarRouteMapper } />
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator_: {
    paddingTop: (Platform.OS == 'ios') ? 64 : 56
  },
  nav: {
    backgroundColor: '#252839',
    padding: 0
  },
  navTitle: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: (Platform.OS == 'android') ? -70 : 0
  },
  navTitleText: {
    lineHeight: 40,
    fontSize: 18,
    color: '#b5b5b7'
  },
  rightButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: (Platform.OS == 'ios') ? 12 : 16
  }
});
