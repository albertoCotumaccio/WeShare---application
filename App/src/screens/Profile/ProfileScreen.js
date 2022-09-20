import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  Animated,
  Image,
  Modal
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import {useRoute} from "@react-navigation/native";
import CustomButton from '../../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Formik} from 'formik';
import ProfileScreen2 from './ProfileScreen2';
import ProfileScreen3 from './ProfileScreen3';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height *0.7;
const WIDTH = 15;


export default function ProfileScreen({navigation}) {

  const route = useRoute();
  
  //console.log(route.params)

    //console.log('ciao', route.params.values);
    const getData = async () => {
      //console.log('ciao prendo dati');
    try {
      const jsonValue = await AsyncStorage.getItem('profileList');
      //console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      
    }
  }
    
    const [cards,setCards] = useState([
      
  
      
    ]);
    //setCards(getData());

    

    

      //Aggiungere una card allo state
      const addCard = (card) =>{
        
        //console.log(card);
        card.id = Math.random();
        
        setCards((currentCards) =>{
          return [card, ...currentCards]
        });
      }

      const deleteCard = (key) => {
        setCards((prevCards) =>{
          
          return prevCards.filter(card => card.id != key);
        });
      }

      
    const onAddProfile = () => {
      navigation.navigate('Profile2', {addCard})
    }
    const onLongPressItem = (item) => {
      setModalDelete(true);
      setDeleteId(item.id);
      //console.log(deleteId);
    }
    
  
    

    //console.log(cards);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const [modalOpen, setModalOpen] = useState(false);
    
    const [modalDelete, setModalDelete] = useState(false);

    const [editItem, setEditItem] = useState();


    const [inputName, setInputName] = useState();
    const [inputTitle, setInputTitle] = useState();
    const [inputCity, setInputCity] = useState();
    const [inputBirth, setInputBirth] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [inputPhone, setInputPhone] = useState();
    const [inputFacebook, setInputFacebook] = useState();
    const [inputInstagram, setInputInstagram] = useState();
    const [inputLinkedin, setInputLinkedin] = useState();
    const [inputTwitter, setInputTwitter] = useState();
    const [inputBio, setInputBio] = useState();

    const[deleteId, setDeleteId] = useState();

    
    const handleEditItem= (editItem) => {
      const newCard= cards.map(item => {
        if (item.id == editItem){
          item.name = inputName;
          item.city = inputCity;
          item.title = inputTitle;
          item.dateOfBirth = inputBirth;
          item.email = inputEmail;
          item.phone = inputPhone;
          item.facebook = inputFacebook;
          item.instagram = inputInstagram;
          item.linkedin = inputLinkedin;
          item.twitter = inputTwitter,
          item.bio = inputBio;
          return item;
        }
        return item;
      })
      setCards(newCard);
    }

    
    const onPressSaveEdit = () => {
      handleEditItem(editItem);
      setModalOpen(false);
    }
    const onPressDelete = () => {
      //console.log(deleteId);
      deleteCard(deleteId);
      setModalDelete(false);
    }
    
    const onPressNotDelete = () => {
      setModalDelete(false);
    }

    const onPressItem = (item) => {
      setModalOpen(true);
      setInputName(item.name);
      setInputTitle(item.title);
      setInputCity(item.city);
      setInputBirth(item.dateOfBirth);
      setInputEmail(item.email);
      setInputPhone(item.phone);
      setInputFacebook(item.facebook);
      setInputInstagram(item.instagram);
      setInputLinkedin(item.linkedin);
      setInputTwitter(item.twitter);
      setInputBio(item.bio);
      setEditItem(item.id);
    }

    
    
    //addCard(route.params.values);

    return(


    
    
      <View style = {styles.root}>
      

      
    
    
    <Text style={styles.profileText}> 
        Your Profile
    </Text>
    
    {cards.length === 0 ? <Text style={{textAlignVertical: "center",textAlign: "center",fontSize:20,flex:1}}>Ops.. no cards found! Create a new one</Text> : null}
   

    <Animated.FlatList 
        
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: {x: scrollX}}}],
          {useNativeDriver:true}
        )}
        data = {cards} 
        keyExtractor = {(item) => item.id}
        renderItem={ ({item, index}) =>{ 
          
          //per alzare la card corrente
          const inputRange = [
            (index-1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index+1) * CARD_WIDTH,
          ];
          const outputRange = [0,-40,0];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange
          });
        
        return(
        <Animated.View style={{transform:[{translateY}]}}>
        <TouchableOpacity onPress={() => onPressItem(item) } onLongPress={() => onLongPressItem(item)}>
          <View style={styles.root2}>
            <View style={styles.profileCard}> 
          
                  <Text style={styles.title}>{item.title}</Text>

                  <Image source={item.profileImage} style={styles.profileImage}/>
                  
                  <Text style={styles.profileName}> {item.name}</Text> 

                  
                  { item.city ? <Text style={styles.profileCity}> {item.city} </Text>   : () => null}
                  { item.dateOfBirth ?  <Text style={styles.dateOfBirth}> {item.dateOfBirth} </Text>  : () => null}
                  {item.bio ? <Text style={styles.bio}>{item.bio}</Text> : () => null}
                  

                  { item.email ? 
                  <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>

                  
                              <MaterialIcons
                                  name="email"
                                  size={20}
                                  color="white"
                                  style={{marginRight: 5}} />  
                            
                  <Text  style={styles.social}>{item.email} </Text>
                  </View>
                  
                  : () => null}
                           

              
                  
                  {item .phone ?<View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    
                        <MaterialIcons
                            name="phone"
                            size={20}
                            color="white"
                            style={{marginRight: 5}}/>   
                          
                        <Text  style={styles.social}> {item.phone} </Text>
                  </View> : () => null }
                  
                  {item.instagram ? <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                     
                        <MaterialCommunityIcons
                            name="instagram"
                            size={20}
                            color="white"
                            style={{marginRight: 5}}/>   
                          
                        <Text  style={styles.social}> {item.instagram} </Text>
                  </View> : () => null}

                  {item.facebook ? <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                   
                        <MaterialCommunityIcons
                            name="facebook"
                            size={20}
                            color="white"
                            style={{marginRight: 5}}/>   
                          
                        <Text  style={styles.social}> {item.facebook} </Text>
                  </View> : () => null}

                  {item.twitter ? <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                     
                        <MaterialCommunityIcons
                            name="twitter"
                            size={20}
                            color="white"
                            style={{marginRight: 5}}/>   
                          
                        <Text  style={styles.social}> {item.twitter} </Text>
                  </View> : null}

                  {item.twitter ? <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    
                        <MaterialCommunityIcons
                            name="linkedin"
                            size={20}
                            color="white"
                            style={{marginRight: 5}}/>   
                         
                        <Text  style={styles.social}> {item.linkedin} </Text>
                  </View> : () => null}
                  
              
          </View>
          </View>
          </TouchableOpacity>
        </Animated.View>)
        
        }}
        horizontal
        //contentContainerStyle={{marginHorizontal: LATERAL_SPACE-50}}
        showsHorizontalScrollIndicator={false}
        decelerationRate = {0}
        snapToInterval={CARD_WIDTH + 15}
        scrollEventThrottle={16}
        pagingEnabled={true}
        bounces ={false}
      />
      <Modal visible={modalDelete}  transparent  onRequestClose={() => setModalDelete(false)} style={{  margin: 0, alignItems: 'center', justifyContent: 'center' }} >
              <View
                style={{
                    flex: 0.35,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "rgba(7, 53, 105,0.979)",
                    //height: 500,
                    marginTop: 200,
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: 36,
                    elevation: 8,
                    shadowOpacity: 0.25,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 6
                }}
              >
      
      <Text style={{fontSize: 18, fontWeight: '500',color:'white',marginBottom:20,marginTop:10}}>Do you want to delete the selected card?</Text>
                        
                        <View style={{flex:0.35, marginBottom:20}}>
                        <TouchableOpacity
                        onPress={onPressNotDelete}
                        style={{backgroundColor:'black', flex:1, borderRadius:30, width:200, alignItems:'center', justifyContent:'center'}}>
                          <Text style={{color:'white', fontWeight:'700'}}>BACK</Text>

                        </TouchableOpacity>
                        </View>

                        <View style={{flex:0.35}}>
                        <TouchableOpacity
                        onPress={onPressDelete}
                        style={{backgroundColor:'red', flex:1, borderRadius:30, width:200, alignItems:'center', justifyContent:'center'}}>
                          <Text style={{color:'white', fontWeight:'700'}}>DELETE CARD</Text>

                        </TouchableOpacity>
                        </View>
                        

                        
                      
             
                      
       </View>

       
      </Modal>  

      
      <Modal 
      visible={modalOpen}
      onRequestClose={() => setModalOpen(false)}>


    <SafeAreaView >
            <ScrollView style={{paddingLeft:15, paddingRight:10, backgroundColor:'#d4c1c1'}} showVerticalScrollIndicator={false}>
      <View style={styles.inputWrapper}>
        

      <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Card title</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputTitle(text)}
              defaultValue = {inputTitle}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Full name</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputName(text)}
              defaultValue = {inputName}
              editable = {true}
            />
        </View>
        </View>
        

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>City</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputCity(text)}
              defaultValue = {inputCity}
              editable = {true}
            />
        </View>
        </View>
        


        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Date of Birth</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputBirth(text)}
              defaultValue = {inputBirth}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Email address</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputEmail(text)}
              defaultValue = {inputEmail}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Phone Number</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputPhone(text)}
              defaultValue = {inputPhone}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Facebook</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputFacebook(text)}
              defaultValue = {inputFacebook}
              editable = {true}
            />
        </View>
        </View>


        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Instagram</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputInstagram(text)}
              defaultValue = {inputInstagram}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Linkedin</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputLinkedin(text)}
              defaultValue = {inputLinkedin}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Twitter</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputTwitter(text)}
              defaultValue = {inputTwitter}
              editable = {true}
            />
        </View>
        </View>

        <View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Bio</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText = {(text) => setInputBio(text)}
              defaultValue = {inputBio}
              editable = {true}
            />
        </View>
        </View>

        
      
      
      
      
      </View>

        <View style={{alignItems:'center'}}>
                        <CustomButton 
                        text= "SAVE"
                        onPress = {onPressSaveEdit}
                        type="CIRCLE"
                        bgColor = 'black'
                        fgColor = 'white'/>
             
            
          
          </View>

          </ScrollView>
          </SafeAreaView>
      </Modal>


    


               <CustomButton 
                    text= "ADD NEW PROFILE"
                    onPress = {onAddProfile}
                    type="CIRCLE"
                />
    
    
    
    </View>  
    )

}

const styles = StyleSheet.create({
  root:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 20
    
  },
  social:{
    color:'white',
    marginBottom:CARD_HEIGHT/80
  },
  inputWrapper:{
    //flex:1,
    //padding:15,
    marginTop:70,
    justifyContent:'center',
  },

  profileText:{
    fontWeight: '700',
    color: 'white',
    fontSize: width/10,
    lineHeight: 39, 
    marginTop: width/10,  
  },
  root2:{
    marginTop:50,
    height: CARD_HEIGHT,
    marginHorizontal: 10,
    //padding:10,
    alignItems: 'center'

},

profileCard:{
    
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'black',
    boxSizing : 'border-box',
    borderRadius: 30,
    alignItems: 'center'
    //marginRight:15
    
},
title:{
    fontWeight: '400',
    color: 'white',
    fontSize: width/18,
    //lineHeight: 39,
    marginTop:CARD_HEIGHT/70,
    fontWeight: 'bold',
},
bio:{
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
    marginBottom:CARD_HEIGHT/80
},
profileImage:{
    width: '35%',
    height: '20%',
    backgroundColor: "white",
    borderRadius: 50,
    marginVertical:10,
},
profileName:{
    fontWeight: '300',
    color: 'white',
    fontSize: 30,
    //lineHeight: 39,
  },
  profileCity:{
    fontWeight: '100',
    color: 'white',
    fontSize: 15,
    //lineHeight: 20,
  },
  dateOfBirth:{
    color: 'white',
    fontWeight: '200',
    marginBottom:CARD_HEIGHT/220
  },
  input:{
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 6,
    marginBottom:15
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
},

});
/*

<CustomButton 
                        text= "DELETE CARD"
                        onPress={onPressDelete}
                        type="CIRCLE"
                        bgColor = 'red'
                        fgColor = 'white'
                        icon={
                                <MaterialCommunityIcons
                                name="delete-forever"
                                size={20}
                                color="white"
                                style={{marginRight: 5}}
                                 />
                            }
                        />





<CustomButton 
                    text= "ADD NEW PROFILE"
                    onPress = {onAddProfile}
                    type="CIRCLE"
                />
    </View>







import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/CustomButton';
import ProfileCard from '../../components/ProfileCard';
//import ProfileCardItem from '../../components/ProfileCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//import ProfileCardItem from '../../components/ProfileCard';

import ProfileCardItem from '../../components/ProfileCard';

//import {cards as cards} from '../../components/ProfileCard/ProfileCard.js'
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CARD_WIDTH = width * 0.8;
const WIDTH = 15;




export default function ProfileScreen({navigation}) {
  //console.log(cards);
  




  const onAddProfile = () => {
    navigation.navigate('Profile2');
  }

  
  


  


  
  return (
    //navigation.push('Pagina', {name: 'parametro1', param2..})
    
    <SafeAreaView style = {styles.root}>
    <Text style={styles.profileText}> 
        Your Profile
    </Text>
    
    
    <ProfileCard/>




    <CustomButton 
                    text= "ADD NEW PROFILE"
                    onPress = {onAddProfile}
                    type="CIRCLE"
                />
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
    root:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      //padding: 20
      
    },

    profileText:{
      fontWeight: '700',
      color: 'white',
      fontSize: 30,
      lineHeight: 39, 
      marginTop: 30,  
    },

 
  });*/
  
/*
   
 <View style={{paddingLeft:20, paddingRight:20, alignItems: 'center'}}>
      
      <Text style={styles.profileText}> 
        Your Profile
      </Text>
      
      
      
        <ProfileCard  cardstyle={{width: width*0.3, maxWidth: width*3, maxHeight: height*3}}/>
        
        <CustomButton 
                    text= "ADD NEW PROFILE"
                    onPress = {onAddProfile}
                    type="CIRCLE"
                />
     

     
    </View>


*/
