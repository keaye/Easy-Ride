// screens/SignupScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text>← Back</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Create a New Account</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
        />
        <TextInput 
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <TextInput 
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>or continue with</Text>
        
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/google-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../assets/apple-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}
        >
          <Text>Already have an account? </Text>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#FF8C00',
    fontWeight: '600',
  },
});

export default SignupScreen;