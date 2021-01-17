import * as React from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import db from '../config';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      image: '#',
      name: '',
      docID: '',
    }
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker
    .launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userID);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };

  getUserProfile() {
    db.collection('Users')
    .where('Email_ID', '==', this.state.userID)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          name: doc.data().First_Name + " " + doc.data().Last_Name,
          docID: doc.id,
          image: doc.data().image,
        });
      });
    });
  }

  componentDidMount() {
    this.fetchImage(this.state.userID);
    this.getUserProfile();
  }

  render(){
    return(
      <View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            backgroundColor: 'orange',
          }}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size = 'medium'
            onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
          />

          <Text style={{ fontWeight: "100", fontSize: 20, paddingTop: 10 }}>
            {this.state.Name}
          </Text>
        </View>
        <View>
          <DrawerItems {...this.props}/>
        </View>
        <View>
          <TouchableOpacity
            style = {styles.logoutButton}
            onPress={()=> {
              this.props.navigation.navigate('welcomeScreen')
              firebase.auth().signOut()
            }}
          >
            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 500,
    marginLeft: 17,
    marginRight: 230,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 0.75,
    width: '40%',
    height: '20%',
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
})