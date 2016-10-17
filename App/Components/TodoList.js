import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ListView,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
  Image
} from 'react-native';
const firebase = require("firebase");

export default class TodoList extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true
    };
    this.todosRef = this.getRef().child('todos');
  }
  getRef() {
    return firebase.database().ref();
  }
  listenForItems(todosRef) {
    todosRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          key: child.key,
          text: child.val().text,
          complete: child.val().complete
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loading: false
      });
    });
  }
  componentDidMount() {
      this.listenForItems(this.todosRef);
  }
  toggleComplete(bool, key){
    firebase.database().ref('todos/'+key).update({complete: bool});
  }
  deleteTodo(key){
    firebase.database().ref('todos/'+key).set(null);
  }
  renderRow = (data) => {
    return (
      <View style={ styles.todo }>
        <Text style={ styles.todoText }>{ data.text }</Text>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Switch
            onValueChange={(value) => this.toggleComplete(!data.complete, data.key)}
            tintColor="#b5b5b7"
            onTintColor="#f2b632"
            thumbTintColor="#252839"
            value={data.complete} />
          <TouchableOpacity style={styles.deleteButtonWrapper} onPress={() => {this.deleteTodo(data.key)}}>
            <Image source={require('../img/ic_delete_black_24dp_1x.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    var loading;
    if(this.state.loading){
      loading = (<View>
        <Text style={styles.loadingText}>Carregando todos...</Text><ActivityIndicator
          animating={this.state.loading}
          style={ styles.loading }
        />
      </View>);
    }
    return (
      <View style={ styles.container }>
        {loading}
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          style={ styles.todoList }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  todoList: {
    flex: 1
  },
  todo: {
    padding: 16,
    backgroundColor: '#E7E7E7',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoText: {
    flex: 1,
    color: '#252839',
    fontSize: 16
  },
  deleteButtonWrapper: {
    marginLeft: 12
  },
  loading: {
    padding: 8
  },
  loadingText: {
    paddingTop: 16,
    textAlign: 'center',
    color: '#b5b5b7'
  }
});
