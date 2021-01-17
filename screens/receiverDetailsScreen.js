import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyBartersScreen from '../screens/myBartersScreen';

export default class ReceiverDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userID: firebase.auth().currentUser.email,
      receiverID: this.props.navigation.getParam('details')['User_ID'],
      requestID: this.props.navigation.getParam('details')['Request_ID'],
      itemName: this.props.navigation.getParam('details')['Item_Name'],
      reason: this.props.navigation.getParam('details')['Reason'],
      receiverName: '',
      receiverContact: '',
      receiverAddress: '',
      receiverRequestDocID: '',
    }
  }

  getUserData = (userID) => {
    db.collection('Users').where('Email_ID', '==', userID).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          userName: doc.data().First_Name + doc.data().Last_Name
        })
      })
    })
  }

  getReceiverData = () => {
    db.collection('Users').where('Email_ID', '==', this.state.receiverID).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          receiverName: data.First_Name,
          receiverContact: data.Contact,
          receiverAddress: data.Address,
        })
      })
    })
    db.collection('Requests').where('Request_ID', '==', this.state.requestID).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        this.setState({
          receiverRequestDocID: doc.id
        })
      })
    })
  }

  updateBarterStatus = () => {
    db.collection('All_Donations').add({
      Item_Name: this.state.itemName,
      Request_ID: this.state.requestID,
      Request_By: this.state.receiverName,
      Donor_ID: this.state.userID,
      Request_Status: 'Donor Interested',
    })
  }

  addNotification = () => {
    var message = this.state.userName + ' has shown interest in exchanging the item'
    db.collection('All_Notifications').add({
      'TargetedUserID': this.state.receiverID,
      'Donor_ID': this.state.userID,
      'Request_ID': this.state.requestID,
      'Item_Name': this.state.itemName,
      'RequestDate': firebase.firestore.FieldValue.serverTimestamp(),
      'NotificationStatus': 'Unread',
      'Message': message,
    })
  }

  componentDidMount = ()=> {
    this.getReceiverData()
    this.getUserData(this.state.userID)
  }
    
  render() {
    return (
      <View>
        <View>
          <Card title={'Item Info'} titleStyle={{fontSize: 15, alignSelf: 'center'}}>
            <Card>
              <Text>
                Name: {this.state.itemName}
              </Text>
            </Card>
            <Card>
              <Text>
                Reason: {this.state.reason}
              </Text>
            </Card>
          </Card>
        </View>

        <View>
          <Card title={'Receiver Info'} titleStyle={{fontSize: 15, alignSelf: 'center'}}>
            <Card>
              <Text>
                Name: {this.state.receiverName}
              </Text>
            </Card>
            <Card>
              <Text>
                Contact: {this.state.receiverContact}
              </Text>
            </Card>
            <Card>
              <Text>
                Address: {this.state.receiverAddress}
              </Text>
            </Card>
          </Card>
        </View>

        <View>
          {
            this.state.receiverID != this.state.userID
            ? (
              <TouchableOpacity onPress={()=>{
                this.updateBarterStatus();
                this.addNotification();
                this.props.navigation.navigate('MyBarters');
              }}>
                <Text>
                  I want to Exchange
                </Text>
              </TouchableOpacity>
            )
            : (
              null
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   
})