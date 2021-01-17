import * as React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/myHeader';

export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      allRequests : []
    }
    this.requestRef= null
  }

  getAllRequests =()=>{
    this.requestRef = db.collection("Requests")
    .onSnapshot((snapshot)=>{
      var allRequests = []
      snapshot.forEach((doc) => {
        allRequests.push(doc.data())
      })
      this.setState({allRequests:allRequests})
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) =>{
    return (
      <ListItem
        key={i}
        title={item.Item_Name}
        subtitle={item.Reason}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.viewButton} onPress = {()=>{
            this.props.navigation.navigate('receiverDetails', {'details': item})
          }}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }
    
  componentDidMount(){
    this.getAllRequests()
  }
    
  componentWillUnmount(){
    this.requestRef();
  }

  render() {
    return (
      <View>
        <MyHeader title="Barter App" navigation ={this.props.navigation}/>
        <View>
          {
            this.state.allRequests.length === 0
            ? (
              <View>
                <Text>
                  List of Requested Books
                </Text>
              </View>
            )
            : (
              <FlatList 
                keyExtractor = {this.keyExtractor}
                data = {this.state.allRequests}
                renderItem = {this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8
    }
  }, 
  viewButton: {
    backgroundColor:'#60B6E0',
    marginRight: 50,
    height: 40,
    width: 70,
    borderRadius: 15,
  },
  viewButtonText: {
    fontSize: 19,
    marginLeft: 15,
    marginTop: 6,
  }
})