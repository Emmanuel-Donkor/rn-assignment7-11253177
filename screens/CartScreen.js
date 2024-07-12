import { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartContext } from '../App';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const shortTitle = (title) => {
    return title.length > 15 ? `${title.substring(0,15)}...` : title;
  };

  const shortDescription = (description) => {
    return description.length > 30 ?`${ description.substring(0,30)}...` : description;
  };

  return (
    <View style={styles.container}>
      <FlatList 
         contentContainerStyle={styles.cont} 
         ListHeaderComponent={() => (
          <View style={styles.checkoutLogo}>
            <Image source={require('../assets/Checkout.png')} />
          </View>
         )}
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
           
            <View style={styles.cartImageContainer}>
             <Image source={{ uri: item.image }} style={styles.cartImage} />
            </View>
           
            <View style={styles.cartItemLeft}>
              <View>
                <Text style={styles.cartTitle}>{shortTitle(item.title)}</Text>
              </View>
              
              <View>
                <Text style={styles.cartDescription}>{shortDescription(item.description)}</Text>
              </View>
              
               <View>
                <Text style={styles.cartPrice}>${item.price}</Text>
              </View> 
              
            </View>

              <TouchableOpacity 
              onPress={() => removeFromCart(item.id)}
              style={styles.removeBotton}
              > 
                <Image source={require('../assets/remove.png')} style={styles.remove} />
              </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <>
            <View  style={styles.totalContainer}>
              <Text>ESE. TOTAL</Text>
              <Text>{cartItems ? '$500' : '$0'}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} >
              <Image source={require('../assets/shoppingBag.png')} style={styles.plusIcon} />

              <Text style={styles.checkout} >CHECKOUT</Text>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 16,
  },
  checkoutLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150,
    height: 50,
    width: 30,
    marginTop: 16,
  },
  cartItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: -10,
  },
  cartImageContainer: {
    width: 100,
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    alignItems: 'center',
    backgroundColor: '#FFFF'
  },
  cartImage: {
    width: 86, 
    height: 120,   
    resizeMode: 'contain',
    marginTop: 20,
  },
  cartItemLeft: {
    flex: 1,
    justifyContent: "start",
  },
  cartTitle: {
    fontSize: 17,
  },
  cartDescription: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4
  },
  cartPrice: {
    fontSize: 15,
    color: '#D2691E',
  },
  removeBotton: {
    display: 'absolute',
    left: -25,
    top: 55,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 0,
    marginTop: 510,
    marginBottom: 10,
  },
  checkoutButton: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  checkout: {
    color: '#FFFF'
  },
});
