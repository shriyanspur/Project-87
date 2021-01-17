import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'

export default class SettingScreen extends React.Component {
  constructor(){
    super();
    this.state={
      emailID: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      docId: ''
    }
  }

  getData = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('Users').where('Email_ID', '==', email).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        var data = doc.data()
        this.setState({
          emailID: data.Email_ID,
          firstName: data.First_Name,
          lastName: data.Last_Name,
          address: data.Address,
          contact: data.Contact,
          docId: doc.id
        })
      });
    })
  }

  updateData = () => {
    db.collection('Users').doc(this.state.docId).update({
      First_Name: this.state.firstName,
      Last_Name: this.state.lastName,
      Address: this.state.address,
      Contact: this.state.contact,
    })
    alert("Profile Updated Successfully")
  }

  componentDidMount(){
    this.getData();
  }

  render() {
    return (
      <View>
        <MyHeader title="Settings" navigation ={this.props.navigation}/>
        <View style={styles.container2}>
          <TextInput 
            style={styles.textInput1}
            placeholder= 'First Name'
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
            value ={this.state.firstName}
          />
          <TextInput 
            style={styles.textInput1}
            placeholder= 'Last Name'
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
            value ={this.state.lastName}
          />
          <TextInput 
            style={styles.textInput1}
            maxLength ={10}
            placeholder= 'Contact'
            keyboardType = 'numeric'
            onChangeText={(text)=>{
              this.setState({
                contact: text
              })
            }}
            value ={this.state.contact}
          />
          <TextInput 
            style={styles.textInput1}
            placeholder= 'Address'
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
            value ={this.state.address}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={()=>{this.updateDetails()}}
          >
            <Text style={styles.saveButtonText}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container2 :{
    flex: 1,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput1 :{
    marginTop:20,
    padding:10,
    width:"75%",
    height:35,
    alignSelf:'center',
    textAlign: 'center',
    borderColor:'rgb(255, 159, 58)',
    borderRadius:10,
    borderWidth:1,
  },
  textInput2 :{
    marginTop:20,
    padding:10,
    width:"75%",
    height:35,
    alignSelf:'center',
    textAlign: 'center',
    borderColor:'rgb(255, 159, 58)',
    borderRadius:10,
    borderWidth:1,
  },
  saveButton:{
    backgroundColor:"rgb(255, 159, 58)",
    justifyContent:'center',
    alignItems:'center',
    width:"75%",
    height:50,
    marginTop:20,
    borderColor: 'rgb(255, 159, 58)',
    borderRadius: 10,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.34,
    shadowRadius: 10.32,
    elevation: 16,
  },
  saveButtonText:{
    fontSize: 20,
    color: 'rbg(355, 355, 355)',
    fontWeight: "bold",
  }
})
