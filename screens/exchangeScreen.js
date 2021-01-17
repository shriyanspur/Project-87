import * as React from 'react';
import { View, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/myHeader';

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      User_ID: firebase.auth().currentUser.email,
      userDocId: '',
      name: '',
      reason: '',
      requestedItemName: '',
      exchangeID: '',
      itemStatus: '',
      docID: '',
      IsExchangeRequestActive: '',
    }
  }

  createUniqueID() {
    return Math.random().toString(36).substring(7)
  }

  addItem = async (ItemName, Reason) => {
    var randReqID = this.createUniqueID();

    db.collection('Requests').add({
      User_ID: this.state.User_ID,
      Item_Name: ItemName,
      Reason: Reason,
      Request_ID: randReqID,
      Item_Status: 'Requested',
      RequestDate: firebase.firestore.FieldValue.serverTimestamp(),
    })

    await this.getExchangeRequest()
      db.collection('Users').where("Email_ID", "==", User_ID).get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
          db.collection('Users').doc(doc.id).update({
            IsExchangeRequestActive: true
          })
        })
      })

    this.setState({
      name: '',
      reason: '',
    })

    alert('Item Requested Successfully');
  }

  getIsExchangeRequestActive(){
    db.collection('Users')
    .where('Email_ID','==',this.state.User_ID)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          IsExchangeRequestActive: doc.data().IsExchangeRequestActive,
          userDocId: doc.id
        })
      })
    })
  }

  getExchangeRequest = ()=>{
    var exchangeRequest = db.collection('Requests')
    .where('User_ID', '==', this.state.User_ID).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        if(doc.data().Item_Status !== 'Received') {
          this.setState({
            exchangeID: doc.data().Request_ID,
            requestedItemName: doc.data().Item_Name,
            itemStatus: doc.data().Item_Status,
            docID: doc.id
          })
        }
      })
    })
  }

  componentDidMount(){
    this.getExchangeRequest()
    this.getIsExchangeRequestActive()
  }

  receivedItem = (ItemName)=>{
    var userId = this.state.userName
    var exchangeId = this.state.exchangeId
    db.collection('Received_Items').add({
      User_ID: this.state.User_ID,
      Item_Name: ItemName,
      Exchange_ID: this.state.exchangeID,
      Item_Status: 'Received',
    })
  }

  updateExchangeRequestStatus = () => {
    db.collection('Requests').doc(this.state.docId)
    .update({
      Item_Status: 'Received'
    })

    db.collection('Users').where('Email_ID', '==', this.state.User_ID).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        db.collection('Users').doc(doc.id).update({
          IsExchangeRequestActive: false
        })
      })
    })
  }

  sendNotification = () => {
    db.collection('Users').where('Email_ID','==',this.state.User_ID).get()
    .then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var Name = doc.data().First_Name
        var LastName = doc.data().Last_Name

        db.collection('All_Notifications').where('Request_ID','==',this.state.exchangeID).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            var donorID  = doc.data().donor_ID
            var ItemName =  doc.data().Item_Name

            db.collection('All_Notifications').add({
              TargetUser_ID: donorID,
              Message: Name + " " + LastName + " received the " + ItemName ,
              Notification_Status: "Unread",
              Item_Name: ItemName
            })
          })
        })
      })
    })
  }


  render() {
    if (this.state.IsExchangeRequestActive === true) {
      return (
        <View>
          <MyHeader title="Add Item" navigation ={this.props.navigation}/>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
            <Text>Item Name</Text>
            <Text>{this.state.requestedItemName}</Text>
          </View>
          <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
            <Text> Item Status </Text>
            <Text>{this.state.itemStatus}</Text>
          </View>
          <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:30,marginTop:30}}
            onPress={()=>{
              this.sendNotification()
              this.updateExchangeRequestStatus();
              this.receivedItem(this.state.requestedItemName)
          }}>
            <Text>I received the Item</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      <View>
        <MyHeader title="Add Item" navigation ={this.props.navigation}/>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.name}
            placeholder="Item"
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
            value = {this.state.name}
          />
          <TextInput
            style={styles.reason}
            placeholder="Reason for Request"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                reason: text,
              });
            }}
            value = {this.state.reason}
          />
          <TouchableOpacity
            style={styles.requestButton}
            onPress={()=> {
              this.addItem(this.state.name, this.state.reason)
            }}
          >
            <Text style={styles.reqText}>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    }
  }
}

const styles = StyleSheet.create({
  name: {
    marginTop: 30,
    textAlign: 'center',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
  },
  reason: {
    marginTop: 15,
    textAlign: 'center',
    height: 200,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 3,
  },
  requestButton: {
    backgroundColor: 'rgb(45, 210, 165)',
    marginTop: 30,
    height: 50,
    alignSelf: 'center',
    width: 150,
    borderColor: 'rgb(45, 210, 165)',
    borderRadius: 10,
  },
  reqText: {
    alignSelf: 'center',
    marginTop: 7,
    fontSize: 25,
  },
});