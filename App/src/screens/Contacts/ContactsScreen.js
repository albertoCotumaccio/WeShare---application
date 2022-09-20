// import React in our code
import { useEffect, useState } from 'react';
import {useRoute} from "@react-navigation/native";
// import all the components we are going to use
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ProfileImageDefault from "../../../assets/profileImage.png";
import CustomButton from '../../components/CustomButton';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.2;

export default function ContactsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [deleteId,setDeleteId]=useState();

  const route = useRoute();
  //console.log(route.params.card)
  
  const [cards, setCards] = useState([
    {
        id: '10',
        title: "Le mie info",
        image: require("../../../assets/cards_images/0.jpg"),
        full_name: "Francesco Totti",
        city: "Rome, Italy",
        email: "Francesco@totti.com",
        phone: "062340524",
        birth: "27-09-1976",
        bio: "Ex soccer player, now manager",
        moment: "2022-06-23 22:30:45",
        facebook: "FrancescoTottiOfficial",
        instagram: "FrancescoTotti",
        twitter: "totti",
        linkedin: "francescototti"
    },
  ]);
  
  const sourceImage = (contact) => {
    return contact.image ? contact.image : ProfileImageDefault
  }
  
   const listacontatti = () => {
    //console.log("PARAMS: ", route.params);
    (route.params !== undefined && cards.includes(route.params) === false) ? setCards((currentCards) => {
      return [route.params, ...currentCards]
    }) : route.params = undefined;
  }
  
  listacontatti();

  var lengthContacts = cards.length;
  
  
   useEffect(() => {
    setFilteredDataSource(cards);
     setMasterDataSource(cards);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.full_name
          ? item.full_name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const[modalDelete, setModalDelete]=useState(false);

  const onLongPressItem = (item) => {
    setModalDelete(true);
    setDeleteId(item.id);
  }

  const onPressDelete = () => {
    //console.log(deleteId);
    deleteCard(deleteId);
    setModalDelete(false);
  }

  const onPressNotDelete = () => {
    setModalDelete(false);
  }

  const deleteCard = (key) => {
    console.log('prima filter: ',cards);
    setCards((prevCards) =>{
      return prevCards.filter(card => card.id !== key);
    });
    console.log('dopo filter: ',cards);
  }
  
  const ItemView = ({ item }) => {
    return (
      <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Contacts2", item);
        }}
        onLongPress ={ () => onLongPressItem(item)}
      >
        <View style={{flexDirection: "row" }}>
          <Image source={sourceImage(item)} style={styles.profileImage} />
            <View style={{paddingLeft:15, paddingTop:5, justifyContent: 'center'}}>
              <Text style={styles.cardtitle}>{item.full_name}</Text>
               <Text style={styles.cardsubtitle}>{item.title}</Text>
          <Text style={styles.cardtext}>{item.city}</Text>
          <Text style={styles.cardtext}>{item.moment}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={{alignItems: "center", flex:1 }}>
        <Text style={styles.title}>Contacts ({lengthContacts})</Text>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          inputContainerStyle={{backgroundColor: 'white'}}
          containerStyle={{
            backgroundColor: 'transparent', borderWidth: 0, borderBottomColor:"transparent", borderTopColor:'transparent'  , borderRadius: 0, width: width * 0.95
          }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        <FlatList
          style={{ paddingBottom:10 }}
          data={search === '' ? cards.sort((a, b) => a.moment.localeCompare(b.moment)) : cards.filter(x => filteredDataSource.includes(x)).sort((a, b) => a.moment.localeCompare(b.moment))}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>

      <Modal visible={modalDelete}  transparent  onRequestClose={() => setModalDelete(false)} style={{  margin: 0, alignItems: 'center', justifyContent: 'center' }} >
     
     <View
                style={{
                    flex: 0.35,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "rgba(7, 53, 105,0.979)",
                    height: 500,
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
    </SafeAreaView>

    

  );
};

const styles = StyleSheet.create({
  root: {
      flex: 1,
  },
  viewTile: {
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    color: "white",
    fontSize: 30,
    lineHeight: 39,
    marginTop: 30,
  },
  profileImage: {
    width: width / 5,
    height: height / 10,
    borderRadius: 100,
  },
  item: {
    backgroundColor: "black",
    borderRadius: 30,
    width: CARD_WIDTH,
    // height: CARD_HEIGHT,
    flex: 1,
    flexDirection: "row",
    boxSizing: "border-box",
    padding: 20,
    marginVertical: 5,
  },
  searchBar: {
    backgroundColor: "white"
  },
    cardtitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  cardsubtitle: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  cardtext: {
    // fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  cardMoment: {
    color: "#525252",
    paddingLeft: 50,
  },
  title: {
    fontWeight: "700",
    color: "white",
    fontSize: 30,
    lineHeight: 39,
    marginTop: 30,
  },
});