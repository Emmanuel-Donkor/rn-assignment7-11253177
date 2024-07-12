import { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  
  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const shortTitle = (title) => {
    return title.length > 19 ? `${title.substring(0,18)}...` : title;
  };

  const shortDescription = (description) => {
    return description.length > 30 ?`${ description.substring(0,30)}...` : description;
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>

      <View style={styles.productItemContainer}>
       <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <View style={styles.productInfo}>
        <View style={styles.productText}>
          <Text style={styles.productTitle}>{shortTitle(product.title)}</Text>

          <Text style={styles.productDescription}>{shortDescription(product.description)}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
        </View>

        <TouchableOpacity>
          <Image source={require('../assets/Export.png')} style={styles.exportIcon}/>
        </TouchableOpacity>
    
        <View style={styles.materials}>
          <Text style={styles.materialsTitle}>MATERIALS</Text>
          <Text style={styles.materialsText}>We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.</Text>
        </View>

        <View style={styles.cautionsContainer}>
          <View style={styles.cautionWrapper}>
            <Image source={require('../assets/DoNotBleach.png')} style={styles.cautionIcon}/>
            <Text style={styles.caution}>Do not use bleach</Text>
          </View>

          <View style={styles.cautionWrapper}>
            <Image source={require('../assets/DoNotTumbleDry.png')} style={styles.cautionIcon}/>
            <Text style={styles.caution}>Do not tumble dry</Text>
          </View>

          <View style={styles.cautionWrapper}>
            <Image source={require('../assets/DoNotWash.png')} style={styles.cautionIcon}/>
            <Text style={styles.caution}>Dry clean with tetrachloroethylene</Text>
          </View>

          <View style={styles.cautionWrapper}>
            <Image source={require('../assets/IronLowTemperature.png')} style={styles.cautionIcon}/>
            <Text style={styles.caution}>Iron at a maximum of 110°C/230°F</Text>
          </View>
        </View>
        
        <View style={styles.deliveryInfo}>
          <View style={styles.delivery}>
           <Image source={require('../assets/Shipping.png')} style={styles.cautionIcon}/>
           <Text>Free Flat Rate Shipping</Text>
          </View>

          <Text style={styles.deliveryText}>Estimated to be delivered on</Text>
          <Text style={styles.deliveryText}>09/11/2021 - 12/11/2021</Text>

          <TouchableOpacity onPress={scrollToTop}>
           <Image source={require('../assets/Up.png')} style={styles.upIcon}/>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addToCartButton} >
        <View style={styles.addToCartButtonLeft}>
          <Image source={require('../assets/Plus.png')} style={styles.plusIcon} />
          <Text style={styles.addToCart} >ADD TO BASKET</Text>
        </View>

        <Image source={require('../assets/Heart.png')} style={styles.heartIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItemContainer: {
    height: 400,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    backgroundColor: '#FFFF'
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 75,
  },
  productInfo: {
    padding: 10,
    paddingTop: 0,
    paddingRight: 45,
    paddingBottom: 50
  },
  productText: {
    marginTop: 15
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 15,
    color: 'gray',
  },
  productPrice: {
    fontSize: 18,
    color: '#D2691E',
  },
  exportIcon: {
    display: 'absoolute',
    left:  290,
    top: -60,
    height: 18,
    width: 18,
  },
  materials: {
    marginBottom: 12
  },
  materialsTitle: {
    marginBottom: 5
  },
  materialsText: {
    fontSize: 14,
    color: 'gray',
  },
  cautionsContainer: {
    rowGap: 10,
    paddingBottom: 17,
    marginBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6'
  },
  cautionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  caution: {
    fontSize: 13,
    color: 'gray'
  },
  deliveryInfo: {

  },
  delivery: {
    fontSize: 13,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  deliveryText: {
   marginLeft: 33,
   fontSize: 13,
   color: 'gray'
  },
  upIcon: {
    display: 'absolute',
    left: 282,
    top: -58
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    marginBottom: 30,
    backgroundColor: 'gray',
  },
  addToCartButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  plusIcon: {
    color: 'with'
  },
  addToCart: {
    color: '#FFFF'
  },
  heartIcon: {

  },
});
