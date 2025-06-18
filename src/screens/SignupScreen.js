import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function SignupScreen({ navigation }) {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name should be at least 3 characters')
      .required('Name is required'),
    age: Yup.number()
      .typeError('Age must be a number')
      .min(13, 'You must be at least 13 years old')
      .required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string()
      .min(10, 'Address should be at least 10 characters')
      .required('Address is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    gmail: Yup.string()
      .matches(/^[^\s@]+@gmail\.com$/, 'Enter a valid Gmail address')
      .required('Gmail is required'),
  });

  const handleFormSubmit = (values) => {
    Alert.alert('Signup Successful', `Welcome, ${values.name}!`);
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Formik
        initialValues={{
          name: '',
          age: '',
          gender: '',
          address: '',
          phone: '',
          gmail: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              placeholder="Age"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
            />
            {touched.age && errors.age && <Text style={styles.error}>{errors.age}</Text>}

            <TextInput
              placeholder="Gender"
              style={styles.input}
              onChangeText={handleChange('gender')}
              onBlur={handleBlur('gender')}
              value={values.gender}
            />
            {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

            <TextInput
              placeholder="Address"
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80 }]}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {touched.address && errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <TextInput
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={styles.input}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <TextInput
              placeholder="Gmail"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={handleChange('gmail')}
              onBlur={handleBlur('gmail')}
              value={values.gmail}
              autoCapitalize="none"
            />
            {touched.gmail && errors.gmail && <Text style={styles.error}>{errors.gmail}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Already have an account? Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 16,
    textAlign: 'center',
    color: '#555',
    textDecorationLine: 'underline',
  },
});
 