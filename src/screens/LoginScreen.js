import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === '1234') {
      navigation.replace('MainApp'); // assuming MainApp is your main tab navigator
    } else {
      Alert.alert('Login Failed', 'Incorrect username or password');
    }
  };

  const handleSignupNavigation = () => {
    navigation.navigate('Signup'); // make sure 'Signup' is registered in your navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back To Shop</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <TouchableOpacity onPress={handleSignupNavigation}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  signupText: {
    textAlign: 'center',
    color: '#007bff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
