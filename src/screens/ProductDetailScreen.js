import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { CartContext } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.brand}>Brand: {product.brand}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.discount}>({product.discountPercentage}% OFF)</Text>
      </View>

      <Text style={styles.stock}>{product.availabilityStatus}</Text>
      <Text style={styles.rating}>⭐ {product.rating}</Text>

      <Text style={styles.description}>{product.description}</Text>

      <Pressable
        style={styles.button}
        onPress={() => {
          addToCart(product);
          navigation.navigate('Cart');
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  brand: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
    marginRight: 8,
  },
  discount: {
    fontSize: 14,
    color: '#d9534f',
  },
  stock: {
    fontSize: 14,
    color: '#2e86de',
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    color: '#f1c40f',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
