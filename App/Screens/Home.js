import React, { Component } from 'react';
import { View } from 'react-native';
import TodoList from '../Components/TodoList'
import AddTodo from '../Components/AddTodo'

export default class Home extends Component {
  render(){
    return(
      <View style={{flex:1}}>
        <AddTodo />
        <TodoList />
      </View>
    );
  }
}
