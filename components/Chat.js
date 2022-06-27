import React from 'react';
import { View, Text, Platform, KeyboardAvoidingView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

//Firestore Database
const firebase = require('firebase');
require('firebase/firestore');

//initialise the Firestore app
const firebaseConfig = {
  apiKey: "AIzaSyCpZ9f6W_wm8NCwCAzDJVz_XpFMSGdZvMw",
  authDomain: "meet-application-341317.firebaseapp.com",
  projectId: "meet-application-341317",
  storageBucket: "meet-application-341317.appspot.com",
  messagingSenderId: "402833301284",
  appId: "1:402833301284:web:678e654bd0fad11e01ddb1",
  measurementId: "G-CZR9Z95Y7P"
};


export default class Chat extends React.Component {
  
  constructor(){
    super();
    this.state ={
      messages: [],
      uid: user.uid,
      loggedInText: 'Hello there!',
      user: {
        _id: "",
        name: "",
        avatar: "",
        image: null,
        location: null,
      },
      isConnected: false,
    }

    // initializes the Firestore app
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    //Stores and retrieves the chat messages users send
    this.referenceChatMessages = firebase.firestore().collection("messages");

    this.referenceMessagesUser= null;
  }

  componentDidMount() {

    //Load messages via Firebase
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
      } else {
        console.log('offline');
      }
      // Authenticates user via Firebase
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
      },
      });
      this.referenceMessagesUser = firebase
                .firestore()
                .collection("messages")
                .where("uid", '==', this.state.uid);
                
                // save messages when user online
                this.saveMessages();
      this.unsubscribeMessagesUser = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
        
    });
    });
  };

  // stop listening to auth and collection changes
  componentWillUnmount() {
    this.unsubscribeMessagesUser();
    this.authUnsubscribe();
    
  }
  //onClick of Gifted chat send
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  };

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages: messages,
    });
  };

  //chat message bubble appearance (color)
  renderBubble(props) {
    return (
      <Bubble 
      {...props}
      wrapperStyle = {{
        right : {
          backgroundColor: '#000'
        }
      }}
      textStyle = {{
        right : {
          color: 'white'
        }
      }}
      />
    )
  };

  // Adds messages to cloud storage
 addMessages() {
  const message = this.state.messages[0];
  this.referenceChatMessages.add({
    uid: this.state.uid,
    _id: message._id,
    text: message.text || "",
    createdAt: message.createdAt,
    user: message.user,
    image: message.image || null,
    location: message.location || null,
  });
}

  render() {

    //updates name on chat screen (fron name written on Start screen)
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    const { bgColor } = this.props.route.params;

    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor}}>
        
        <Text>{this.state.loggedInText}</Text>
        
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />

        {/* Fixing the Android Keyboard */}
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}

      </View>
    )
  }
};

export default Chat;