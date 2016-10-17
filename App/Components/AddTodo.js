import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
const firebase = require("firebase");

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'What are you going ToDo?',
      text: ''
    };
    this.todosRef = this.getRef().child('todos');
  }
  getRef() {
    return firebase.database().ref();
  }
  submit(){
    if (this.state.text) {
      this.todosRef.push({
        text: this.state.text,
        complete: false
      });
      this.setState({text: ''});
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.placeholder}
          value={this.state.text}
          maxLength={50}
        />
        <TouchableOpacity onPress={() => {this.submit()}}>
          <Text style={styles.addButton}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16
  },
  textInput: {
    flex: 1,
    color: '#252839',
    marginLeft: 16,
    marginRight: 8,
    height: (Platform.OS == 'android') ? 38 : null,
    borderWidth: 0
  },
  addButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f2b632',
    marginLeft: 8,
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#252839',
    borderRadius: 4
  }
});
