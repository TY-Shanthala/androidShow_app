import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { CartContext } from '../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Start with cart ID = 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Stop if no more carts

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/carts/${page}`);
      if (!response.ok) throw new Error('No more data');

      const data = await response.json();
      if (!data?.products?.length) {
        setHasMore(false);
        return;
      }

      const mapped = data.products.map((item) => ({
        id: `${item.id}-${page}`,
        name: item.title,
        price: item.price * item.quantity,
        image: item.thumbnail,
        quantity: item.quantity,
        description: item.description || 'No description',
      }));

      setProducts((prev) => [...prev, ...mapped]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.warn('Fetch error:', err.message);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <Pressable
        style={styles.detailsButton}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Text style={styles.buttonText}>More details</Text>
      </Pressable>

      <Pressable
        style={styles.cartButton}
        onPress={() => {
          addToCart(item);
          navigation.navigate('Cart');
        }}
      >
        <Text style={styles.buttonText}>Add To Cart</Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      onEndReached={fetchProducts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  price: { fontSize: 16, color: 'green', marginTop: 5 },
  detailsButton: {
    paddingVertical: 8,
    backgroundColor: 'blue',
    marginTop: 10,
    borderRadius: 4,
  },
  cartButton: {
    paddingVertical: 8,
    backgroundColor: 'green',
    marginTop: 10,
    borderRadius: 4,
  },
  buttonText: { color: 'white', textAlign: 'center' },
  loader: { paddingVertical: 20 },
});

export default HomeScreen;
