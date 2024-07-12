import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image source={require('../assets/Close.png')} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTitleWrapper}>
        <Text style={styles.headerTitle}>Emmanel Donkor jnr</Text>      
        <View style={styles.headerBottomLine}></View>
      </View>  
      <DrawerItem
        label="Store "
       /> 
      <DrawerItem
        label="Locations "
       /> 
      <DrawerItem
        label="Blog "
       /> 
      <DrawerItem
        label="Jewelery "
       /> 
      <DrawerItem
        label="Electronic "
       /> 
      <DrawerItem
        label="Clothing "
       /> 
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  headerTitleWrapper: {
    width: 90,
    marginLeft: 13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: 'gray'
  },
  headerBottomLine: {
    width: 65,
    marginTop: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'brown'
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
