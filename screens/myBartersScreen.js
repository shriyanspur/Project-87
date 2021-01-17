import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class MyBartersScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      allBarters: []
    }
    this.requestRef = null
  }

  getAllBarters =()=>{
    this.requestRef = db.collection("All_Donations").where("Donor_ID", '==', this.state.userId).onSnapshot((snapshot)=>{
      var allBarters = snapshot.docs.map(document => document.data());
      this.setState({
        allBarters: allBarters,
      });
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, i }) =>(
    <ListItem
      key={i}
      title={item.item_name}
      subtitle={"Requested By: " + item.Request_By +" \ Status: " + item.Request_Status}
      leftElement={<Icon name="Item" type="font-awesome" color ='#696969'/>}
      titleStyle={{ color: 'black', fontWeight: 'bold' }}
      rightElement={
        <TouchableOpacity style={styles.button}>
          <Text style={{color:'#ffff'}}>Exchange</Text>
        </TouchableOpacity>
      }
      bottomDivider
    />
  )

  componentDidMount(){
    this.getAllBarters()
  }

  componentWillUnmount(){
    this.requestRef();
  }
  
  render() {
    return (
      <View>
        <MyHeader navigation={this.props.navigation} title="My Barters"/>
        <View>
          {
            this.state.allBarters.length === 0
            ? (
              <View>
                <Text>List of all Barters</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor = {this.keyExtractor}
                data = {this.state.allBarters}
                renderItem = {this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}