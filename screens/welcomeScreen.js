import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      contact: '',
      address: '',
      email: '',
      password: '',
      confirmPass: '',
      isModalVisible: false,
    }
  }

  showModal = ()=>{
    return (
      <Modal
        visible = {this.state.isModalVisible}
      >
        <View>
          <ScrollView style={{ width: '100%', backgroundColor: 'red' }}>
            <KeyboardAvoidingView>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  marginBottom: 25,
                  marginTop: 15,
                }}>
                Registration
              </Text>
              <TextInput
                placeholder="First Name"
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  borderRadius: 5,
                }}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
                placeholder="Last Name"
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  marginTop: 15,
                  borderRadius: 5,
                }}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                placeholder="Contact Number"
                maxLength = {8}
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  marginTop: 15,
                  borderRadius: 5,
                }}
                keyboardType='numeric'
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
                placeholder="Address"
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  marginTop: 15,
                  borderRadius: 5,
                }}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
                placeholder="Email ID"
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  marginTop: 15,
                  borderRadius: 5,
                }}
                keyboardType='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    email: text
                  })
                }}
              />
              <TextInput
                placeholder="Password"
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  marginTop: 15,
                  borderRadius: 5,
                }}
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />
              <TextInput
                placeholder="Confirm Password"
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  textAlign: 'center',
                  height: 35,
                  width: 250,
                  borderColor: 'black',
                  borderBottomWidth: 3,
                  marginTop: 15,
                  borderRadius: 5,
                }}
                secureTextEntry={true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPass: text
                  })
                }}
              />
              <View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    marginTop: 25,
                    backgroundColor: 'green',
                    width: 150,
                    height: 30,
                    marginBottom: 10,
                    borderColor: 'black',
                    borderRadius: 5,
                  }}
                  onPress={()=>{
                    this.userSignUp(this.state.email, this.state.password, this.state.confirmPass)
                  }}>
                  <Text style={{ alignSelf: 'center', marginTop: 4 }}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    backgroundColor: 'blue',
                    width: 150,
                    height: 30,
                    marginBottom: 10,
                    borderColor: 'black',
                    borderRadius: 5,
                  }}
                  onPress={()=>{
                    this.setState({isModalVisible: false})
                  }}>
                  <Text style={{ alignSelf: 'center', marginTop: 4 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  userLogin = (email, password)=> {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
        ()=>{
            this.props.navigation.navigate('Home')
        }
    )
    .catch(
      (error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      }
    );
  }

  userSignUp = (email, password, confirmPassword)=> {
    if (password != confirmPassword) {
      alert('Passwords do not match');
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
        ()=>{
          db.collection('Users').add({
            First_Name: this.state.firstName,
            Last_Name: this.state.lastName,
            Contact: this.state.contact,
            Address: this.state.address,
            Email_ID: this.state.email,
          })
          alert('User added successfully');
        }
    )
    .catch(
      (error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        //return alert(errorMessage);
      }
    );
    }
  }

  render() {
    return (
      <View style={styles.screenBack}>
        <View>
          {this.showModal()}
        </View>
        <Image source={require('../assets/icon 4.png')} style={{width: 150, height: 150, marginTop: 40, marginBottom: -80, alignSelf: 'center'}}/>
        <Text style={styles.appName}>B a r t e r</Text>
        <Text style={styles.appSubTitle}>A sharing app</Text>
        <TextInput
          style={styles.email}
          placeholder="abc@barter.com"
          //keyboardType = 'email-address'
          onChangeText={(text)=>{
            this.setState({
              email: text
            })
          }}
        />
        <TextInput
          style={styles.password}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        <TouchableOpacity style={styles.login} onPress={()=>{this.userLogin(this.state.email, this.state.password)}}>
            <Text style={styles.loginText}>
                Login
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signup} onPress={()=>{this.setState({isModalVisible: true})}}>
            <Text style={styles.signupText}>
                Sign-up
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenBack: {
    backgroundColor: 'rgb(255, 183, 108)',
    flex: 1,
  },
  appName: {
    alignSelf: 'center',
    marginTop: 115,
    fontSize: 60,
  },
  appSubTitle: {
    alignSelf: 'center',
    marginTop: 0,
    fontSize: 18,
  },
  email: {
    backgroundColor: 'rgb(255, 183, 108)',
    alignSelf: 'center',
    textAlign: 'center',
    width: 375,
    height: 50,
    borderColor: 'white',
    marginTop: 100,
    borderBottomWidth: 3,
  },
  password: {
    backgroundColor: 'rgb(255, 183, 108)',
    alignSelf: 'center',
    textAlign: 'center',
    width: 375,
    height: 50,
    borderColor: 'white',
    marginTop: 50,
    borderBottomWidth: 3,
  },
  login: {
    backgroundColor: 'rgb(255, 159, 58)',
    alignSelf: 'center',
    marginTop: 70,
    width: 125,
    alignItems: 'center',
    height: 35,
    borderColor: "red",
    borderRadius: 7,
  },
  loginText: {
    marginTop: 7,
  },
  signup: {
    backgroundColor: 'rgb(255, 159, 58)',
    alignSelf: 'center',
    marginTop: 30,
    width: 175,
    alignItems: 'center',
    height: 35,
    borderColor: "red",
    borderRadius: 7,
  },
  signupText: {
    marginTop: 7,
  },
  firstName: {
    alignSelf: 'center',
    backgroundColor: '#F8BA6F',
  },
  registerInputs: {
    alignSelf: 'center',
    backgroundColor: '#F8BA6F',
  },
});
