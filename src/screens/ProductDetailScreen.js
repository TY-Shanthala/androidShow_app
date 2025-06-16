import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { CartContext } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Button title="Add to Cart"
                onPress={() => {
                    addToCart(product);
                    navigation.navigate('Cart');
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    image: { width: '100%', height: 250, resizeMode: 'contain' },
    name: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
    price: { fontSize: 20, color: 'green' },
    description: { fontSize: 16, marginVertical: 10 }
});

export default ProductDetailScreen;
