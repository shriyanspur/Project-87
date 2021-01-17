import React, { Component} from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet } from 'react-native';
import firebase from 'firebase';
import db from '../config'

export default class MyHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      value: ""
    }
  }

  getNumberOfUnreadNotifications(){
    db.collection('AllNotifications').where('Notification_Status','==',"Unread").where('Targeted_UserID','==',this.state.userID)
    .onSnapshot((snapshot)=>{
      var unreadNotifications = snapshot.docs.map((doc) => doc.data())
      this.setState({
        value: unreadNotifications.length
      })
    })
  }

  componentDidMount(){
    this.getNumberOfUnreadNotifications()
  }


  BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() => {this.props.navigation.navigate('Notifications')}}
        />
        <Badge
          value={this.state.value}
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      </View>
    )
  }

  render(){
    return(
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        rightComponent={<this.BellIconWithBadge {...this.props}/>}
        containerStyle = {{ backgroundColor: 'red' }}
      />
    )
  }
}