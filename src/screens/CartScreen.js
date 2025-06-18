import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Button
          title="Remove"
          onPress={() => removeFromCart(item.id)} 
        />
      </View>
    </View>
  );

  const handleBuyNow = () => {
    alert('Proceeding to Buy...');
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()} // ✅ Fix if id is a number
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹{getTotalAmount()}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  details: { flex: 1, paddingLeft: 10, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green', marginVertical: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f7f7f7',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: { fontSize: 18, fontWeight: 'bold' },
  buyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default CartScreen;