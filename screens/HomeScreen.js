import { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { CartContext } from '../App';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

  const shortTitle = (title) => {
    return title.length > 19 ? `${title.substring(0,18)}...` : title;
  };

  const shortDescription = (description) => {
    return description.length > 23 ?`${ description.substring(0,23)}...` : description;
  };

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
				setError(error);
      } finally {
				setLoading(false);
			}
    }

    fetchProducts();
  }, []);


	if (error) { return <Text>{error}</Text> };

   return (
    <View style={styles.headerBottomContainer}>

      <View style={styles.headerBottom}>
        <Text style={styles.title}>OUR STORY</Text>
        <View style={styles.iconsContainer}>

          <TouchableOpacity style={styles.iconWrapper}>
           <Image source={require('../assets/Listview.png')} style={styles.icon} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconWrapper}> 
            <Image source={require('../assets/Filter.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          style={styles.container}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} 
          renderItem={({ item }) => (

            <View style={styles.productItemContainer}>
              <View style={styles.productItem}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                </TouchableOpacity>

                <TouchableOpacity  onPress={() => addToCart(item)} style={styles.plus}> 
                  <Image source={require('../assets/add_circle.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>

              <View style={styles.productText}>
                <Text style={styles.productTitle}>{shortTitle(item.title)}</Text>
                <Text style={styles.productDescription}>{shortDescription(item.description)}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </View>
            
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginHorizontal: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  headerBottomContainer: {
    flex: 1,
    padding: 16,

  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: 'gray'
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 7,
    backgroundColor: '#E0E0E0'
  },
  icon: {

  },
  productItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  productItem: {
    width: 154,
    height: 220,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    alignItems: 'center',
    backgroundColor: '#FFFF'
  },
  productImage: {
    width: 140, 
    height: 170,   
    resizeMode: 'contain',
    marginTop: 35,
  },
  plus: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    display: 'absolute',
    left: 54,
    bottom: 23
  },
  productText: {
    flex: 1,
    alignItems: 'start',
    marginTop: 5,
    marginBottom: 17,
    marginBottom: 10
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4
  },
  productPrice: {
    fontSize: 14,
    color: '#D2691E',
    marginBottom: 8,
  },
});