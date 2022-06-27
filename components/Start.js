import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import BackgroundImage from '../assets/BackgroundImage.png';

//colour options for background - chosen by user
const colors = {
  color1: "#090C08",
  color2: "#474056",
  color3: "#8A95A5",
  color4: "#B9C6AE",
};

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgColor: '',
    };
  }

  //choose color
  changeColor = (newColor) => {
    this.setState({ bgColor: newColor });
  }

  render() {    

    return (
      <View style={styles.container}>

        {/* background image  */}
        <ImageBackground 
          source={BackgroundImage} 
          style={styles.backgroundImage}
          resizeMode="cover" 
        />
          <View style={styles.titleContainer}>
              <Text style={styles.title}>Chat App</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.textInputContainer}>
        
              <TextInput
                accessible={true}
                accessibilityLabel='Your name'
                accessibilityHint='Enter you name that will show on the chat'
                style={styles.inputField}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your name" 
              />
              <Text>Your wrote: {this.state.name}</Text>
            
            </View>

            <View style={styles.colorPaletteContainer}>
              
              <Text style={styles.colorPaletteText}>Choose Background Color: </Text>
              <View style={styles.colorPalette}>
                <TouchableOpacity
                  accessibilityLabel= 'black backgroud colour'
                  accessibilityHint= 'sets chat backgroud colour to black'
                  accessibilityRole= 'button'
                  style={[styles.color, styles.color1]}
                  onPress={() => this.changeColor(colors.color1)}
                />

                <TouchableOpacity
                  accessibilityLabel= 'dark grayish violet backgroud colour'
                  accessibilityHint= 'sets chat backgroud colour to dark grayish violet'
                  accessibilityRole= 'button'
                  style={[styles.color, styles.color2]}
                  onPress={() => this.changeColor(colors.color2)}
                />

                <TouchableOpacity
                  accessibilityLabel= 'grayish blue backgroud colour'
                  accessibilityHint= 'sets chat backgroud colour to grayish blue'
                  accessibilityRole= 'button'
                  style={[styles.color, styles.color3]}
                  onPress={() => this.changeColor(colors.color3)}
                />

                <TouchableOpacity
                  accessibilityLabel= 'grayish green backgroud colour'
                  accessibilityHint= 'sets chat backgroud colour to grayish green'
                  accessibilityRole= 'button'
                  style={[styles.color, styles.color4]}
                  onPress={() => this.changeColor(colors.color4)}
                />

              </View>        

            </View>

            <Pressable
              accessible={true}
              accessibilityLabel='Start Chatting'
              accessibilityHint='Click to start chatting'
              accessibilityRole='Button'
              style={styles.chatButton}
              title="Start Chatting"
              onPress={()=> this.props.navigation.navigate('Chat',{
                username: this.state.username,
                bgColor: this.state.bgColor
              })}>
              <Text style={styles.chatButtonText}>
                Start Chatting
              </Text>
            </Pressable> 

          </View>  
      </View>
    );
  }
}

//styling 
const styles = StyleSheet.create({
  container: {
    flex: 1,
},
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: '50%',
    width: '88%',
    alignItems: 'center',
    paddingTop: 100
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 10,
},
  formContainer: {
    backgroundColor: '#fff',
    padding: 10,
    width: '88%',
    height: '44%',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  //text input container
  textInputContainer: {
    flexDirection: 'row',
    borderColor: '#757083',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  inputField: {
    width: '100%',
    fontSize: 16,
    fontWeight: 300,
    fontColor:  '#757083',
    opacity: '50%'
  },

  // color platte container syling
  colorPaletteContainer: {
    flexDirection: 'column',
  },
  colorPaletteText: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
    opacity: '100%'
},
  colorPalette: {
    flexDirection: 'row',
  },
  color: {
    width: 50,
    height: 50,
    marginRight:16,
    borderRadius: 50/2,
  },
  color1:{
    backgroundColor: colors.color1
  },
  color2:{
    backgroundColor: colors.color2
  },
  color3:{
    backgroundColor: colors.color3
  },
  color4:{
    backgroundColor: colors.color4
  },
  // chat button styling
  chatButton: {
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 16,
    color: "#757083",
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
}

});

export default Start;