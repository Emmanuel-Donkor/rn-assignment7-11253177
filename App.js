import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CustomHeader from './components/CustomHeader';
import CustomDrawerContent from './components/CustomDrawerContent';

// Context for ensuring cart data remains even when app is closed and reopened
export const CartContext = createContext();

  const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function loadCartItems() {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error('Failed to load cart items', error);
      }
    }

    loadCartItems();
  }, []);

  const addToCart = async (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart items', error);
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== productId));
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart items', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


// Navigation setup
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
			<Drawer.Navigator 
				initialRouteName="Home"
				screenOptions={{
					header: (props) => <CustomHeader {...props} />,
				}}
				drawerContent={ (props) => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen name="Home" component={HomeScreen}/>
				<Drawer.Screen name="Cart" component={CartScreen} />
				<Drawer.Screen
				 name="ProductDetail" 
				 options={{ drawerLabel: () => null, title: null }} 
				 component={ProductDetailScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
    </CartProvider>
  );
}


