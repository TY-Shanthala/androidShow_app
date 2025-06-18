import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCarts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/carts/${page}`);
      const data = await res.json();

      // dummyjson returns a single cart object at that endpoint
      if (data && data.products && data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.warn('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail || 'https://via.placeholder.com/150' }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.price}>
        ₹{item.price}{' '}
        <Text style={styles.discount}>({item.discountPercentage}% OFF)</Text>
      </Text>
      {/* <Text style={styles.stock}>Stock: {item?.stock}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text> */}

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.detailButton}
          onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
          <Text style={styles.buttonText}>Details</Text>
        </Pressable>
        <Pressable
  style={styles.cartButton}
  onPress={() => {
    addToCart(item);
    navigation.navigate('Cart');
  }}
>
  <Text style={styles.buttonText}>Add</Text>
</Pressable>

      </View>
    </View>
  );

  const renderFooter = () =>
    loading ? <ActivityIndicator style={{ marginVertical: 16 }} size="large" color="blue" /> : null;

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      onEndReached={fetchCarts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  brand: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  price: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#228B22',
  },
  discount: {
    fontSize: 12,
    color: '#d9534f',
  },
  stock: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  rating: {
    fontSize: 13,
    marginTop: 4,
    color: '#f1c40f',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#3498db',
    paddingVertical: 6,
    borderRadius: 5,
  },
  cartButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#2ecc71',
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default HomeScreen;
