import React, {useState} from 'react';
import {useRoute} from "@react-navigation/native";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Image,
  Dimensions
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GeneralInput from '../../components/GeneralInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import {updateError, isValidEmail, isValidPhone } from '../../../Utils/methods';
import ProfileImageDefault from '../../../assets/profileImage.png';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;



export default function ProfileScreen2({navigation}) {
  

  const SaveToPhone = async (item) => {
    // Remember, here item is a file uri which looks like this. file://..

  
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      try {
        const asset = await MediaLibrary.createAssetAsync(item);
        MediaLibrary.createAlbumAsync('Images', asset, false)
          .then(() => {
            console.log('File Saved Successfully!');
          })
          .catch(() => {
            console.log('Error In Saving File!');
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Need Storage permission to save file');
    }
  };
  


  const route = useRoute();

  


  const [error, setError] = useState('');


  const isValidForm = (values) => {
    if(values.title == '') return updateError('Title of the card is mandatory', setError)
    if(values.title.length > 30) return updateError('Title is too long', setError)
    if(values.name == '') return updateError('Full Name is mandatory', setError)
    if(values.name.length > 25) return updateError('Name is too long', setError)
    if(values.dateOfBirth && values.dateOfBirth.length > 15) return updateError('Birth date is too long', setError)
    if(values.email && !isValidEmail(values.email)) return updateError('Invalid email', setError)
    if(values.phone && !isValidPhone(values.phone)) return updateError('Invalid phone number', setError)
    if(values.facebook && values.facebook.length > 20) return updateError('Facebook is too long', setError)
    if(values.instagram && values.instagram.length > 20) return updateError('Instagram is too long', setError)
    if(values.linkedin && values.linkedin.length > 20) return updateError('Linkedin is too long', setError)
    if(values.twitter && values.twitter.length > 20) return updateError('Twitter is too long', setError)
    if(values.bio && values.bio.length > 100) return updateError('Bio is too long', setError)
    
  return true;
  }

  //const {width, height} = useWindowDimensions();




  const [selectedImage, setSelectedImage] = React.useState(null);
  

  const change = (values) => {
    navigation.navigate('Profile1', {selectedImage })
  }

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  


  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('profileList', jsonValue)
    } catch (e) {
      // saving error
      
    }
  }


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('profileList');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      
    }
  }

  //getData();


  
  return (
   
 
    <SafeAreaView>
  <ScrollView style={{paddingLeft:15, paddingRight:15}} showVerticalScrollIndicator={false}>
      <Text style={styles.title}>Add new profile</Text>

    
    <View style={styles.imageView}>
     {selectedImage && <Image style={styles.profileImage} source={{ uri: selectedImage.localUri }}   />}

                 {selectedImage ? ( () => null
                          ) :  <Image source={ProfileImageDefault } style={styles.profileImage}  />
                }

                
                <TouchableOpacity style={styles.changeImageButton}
                
                  onPress={openImagePickerAsync}>
                  <Text>
                    Change profile image
                  </Text>
                  
                </TouchableOpacity>
                
      
      

                          </View> 

                          {error ? (
                              <Text style={styles.error_text}>
                                  {error}
                              </Text>
                          ) : null}
    
    <Formik
      initialValues={{title:'', name:'', dateOfBirth:'', city: '', email:'', phone:'', facebook: '', instagram:'', linkedin:'', twitter:'',  bio:'', profileImage:''}}
      onSubmit={(values) => { 
        selectedImage ? values.profileImage = {uri:selectedImage.localUri} : values.profileImage = require('../../../assets/profileImage.png')
        if(isValidForm(values)) {
          route.params.addCard(values);
          storeData(values);
          change(values);
        }
      }}
    >

      {(props) => (
        
        <View style={styles.inputWrapper}>

        
        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Card title </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: Work, Social, Party...'
                onChangeText={props.handleChange('title')}
                value ={props.values.title}/>
        </View>
        </View>

            

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Full name </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: Mario Rossi'
                onChangeText={props.handleChange('name')}
                value ={props.values.fullName}/>
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> City </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: Rome'
                onChangeText={props.handleChange('city')}
                value ={props.values.city}/>
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Date of birth </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: 3/05/1999'
                onChangeText={props.handleChange('dateOfBirth')}
                value ={props.values.dateOfBirth}/>
        </View>
        </View>


        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Email Address </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: mariorossi@hotmail.it'
                onChangeText={props.handleChange('email')}
                value ={props.values.emailAddress}/>
        </View>
        </View>


        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Phone number </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: 348777777'
                onChangeText={props.handleChange('phone')}
                value ={props.values.phoneNumber}/>
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Facebook</Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: Mario Rossi'
                onChangeText={props.handleChange('facebook')}
                value ={props.values.facebook}/>
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Instagram</Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: @mariorossi'
                onChangeText={props.handleChange('instagram')}
                value ={props.values.instagram}/>
        </View>
        </View>


        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Linkedin </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: Mario Rossi'
                onChangeText={props.handleChange('linkedin')}
                value ={props.values.linkedin}/>
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Twitter </Text>
          <View style={styles.input}>
              <TextInput
                placeholder='Eg: mariorossi'
                onChangeText={props.handleChange('twitter')}
                value ={props.values.twitter}/>
        </View>
        </View>

        

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}> Bio </Text>
          <View style={styles.input}>
              <TextInput
                multiline
                placeholder='Eg: I am a computer science student at Sapienza University'
                onChangeText={props.handleChange('bio')}
                value ={props.values.bio}/>
        </View>
        </View>




         


            <View style={{alignItems:'center'}}>
              <CustomButton 
                        text= "SAVE"
                        onPress = {props.handleSubmit}
                        type="CIRCLE"
                        bgColor = 'black'
                        fgColor = 'white'/>
          
          </View>
        </View>
        
      )}

      
    </Formik>

  </ScrollView>
  </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  root: {
      //alignItems: 'center',
      //padding: 20,
  },
  title: {
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: width/10,
    marginTop:30,
    color: 'white'
  },
  imageView:{
    flexDirection: 'row',
    
    marginTop:20,
    //padding: 30,
  },
  profileImage:{
    width:width/4, 
    height:height/8,
    borderRadius:100
  },
  changeImageButton:{
    width: width/3,
    height: height/20,
    //padding: 15,
    //marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6, 
    backgroundColor: 'gainsboro',
    marginLeft: 30,
    marginTop: 20,
  },
  inputWrapper:{
    //flex:1,
    //padding:15,
    marginTop:35,
    justifyContent:'center',
  },
  input:{
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 6,
    marginBottom:15
  },
  error_text: {
    color:'red',
    fontSize:18,
    textAlign: 'center',
}, 
  
});
/*
<CustomButton 
                        style={styles.changeImageButton}
                        text= "Pick an image from camera roll"
                        onPress={pickImage}
                        icon={
                                <MaterialCommunityIcons
                                name="upload"
                                size={20}
                                color="black"
                                style={{marginRight: 5}}
                                 />
                            }
                        type="CIRCLE"
                        
                        />







const {height, width} = useWindowDimensions();

  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [cardTitle, setCardTitle] = useState('');
  const [bio, setBio] = useState('');





<Text style={styles.title}>Add profile card</Text>
          
          <View style={styles.imageView}>
            <Image source={require('../../../assets/profileImage.png')} style={styles.profileImage} resizeMode="contain"></Image>
                <TouchableOpacity style={styles.changeImageButton}>
                  <Text style={{fontWeight:'100'}} >
                    Change image
                  </Text>
                </TouchableOpacity>
          </View>
          
          <View style={styles.inputWrapper}>
          <GeneralInput    //FULL NAME
          style={styles.input}
          value = {fullName}
          setValue = {setFullName}
          label={'Full Name'}
          
          keyboardType="default"
          bgColor = 'white'
        />

<GeneralInput    //Birth
          style={styles.input}
          value = {dateOfBirth}
          setValue = {setDateOfBirth}
          label={'Date of birth'}
          
          keyboardType="default"
          bgColor = 'white'
        />
        
        <GeneralInput    //Email
          style={styles.input}
          value = {emailAddress}
          setValue = {setEmailAddress}
          label={'Email address'}
          
          keyboardType="default"
          bgColor = 'white'
        />

<GeneralInput    //phone number
          style={styles.input}
          value = {phoneNumber}
          setValue = {setPhoneNumber}
          label={'Phone number'}
          
          keyboardType="default"
          bgColor = 'white'
        />
        <GeneralInput    //Facebook
          style={styles.input}
          value = {facebook}
          setValue = {setFacebook}
          label={'Facebook'}
          
          keyboardType="default"
          bgColor = 'white'
        />
        <GeneralInput    //instagram
          style={styles.input}
          value = {instagram}
          setValue = {setInstagram}
          label={'Instagram'}
          
          keyboardType="default"
          bgColor = 'white'
        />
        <GeneralInput    //Linkedin
          style={styles.input}
          value = {linkedin}
          setValue = {setLinkedin}
          label={'Linkedin'}
          
          keyboardType="default"
          bgColor = 'white'
        />
        
        <GeneralInput    //Twitter
          style={styles.input}
          value = {twitter}
          setValue = {setTwitter}
          label={'Twitter'}
          
          keyboardType="default"
          bgColor = 'white'
        />

        <GeneralInput    //Twitter
          style={styles.input}
          value = {cardTitle}
          setValue = {setCardTitle}
          label={'Card title'}
          
          keyboardType="default"
          bgColor = 'white'
        />


        <GeneralInput    //FULL NAME
          style={styles.input}
          value = {bio}
          setValue = {setBio}
          label={'Bio'}
          
          keyboardType="default"
          bgColor = 'white'
        />


          </View>


          <View style={{alignItems:'center'}}>
            <CustomButton 
                      text= "SAVE"
                      onPress = {onSaveProfile}
                      type="CIRCLE"
                      bgColor = 'black'
                      fgColor = 'white'

                      
                  />
          </View>

*/