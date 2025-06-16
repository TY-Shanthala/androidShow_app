import React, { useContext } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { PRODUCTS } from '../data/products';
import { Button } from 'react-native-web';
import { CartContext } from '../context/CartContext';

const HomeScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  const renderItem = ({ item }) => (
    <View
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <Button
        title='More details'
        onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      </Button>
      <Button
        style={{ paddingTop: "2px" }}
        color='green'
        title='Add To Cart'
        onPress={() => {
          addToCart(item);
          navigation.navigate('Cart');
        }}
      ></Button>
    </View>
  );

  return (
    <FlatList
      data={PRODUCTS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  card: { marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  price: { fontSize: 16, color: 'green', marginTop: 5 }
});

export default HomeScreen;
