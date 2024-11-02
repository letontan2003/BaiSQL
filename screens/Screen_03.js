import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import axios from "axios";
import validation from "../vadidation/LoginValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Screen_03 = ({ navigation }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = () => {
    const validationErrors = validation(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting && !errors.email && !errors.password) {
      axios
        .post("http://localhost:8692/login", values)
        .then(async (res) => {
          if (res.data === "Success") {
            alert("Login Success");
            await AsyncStorage.setItem("userEmail", values.email);
            navigation.navigate("Screen_04");
          } else {
            alert("Invalid Email or Password");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsSubmitting(false));
    } else {
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, values, navigation]);

  return (
    <View style={styles.container}>

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/Data/Image20.png')} style={styles.image} />
      <Text style={styles.title}>Welcome!</Text>


      <TextInput
        placeholder="Enter email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={(value) => setValues({ ...values, email: value })}
      />

      {errors.email && <Text style={styles.error}>{errors.email}</Text>}




      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter password"
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible}
          value={values.password}
          onChangeText={(value) => setValues({ ...values, password: value })}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="gray"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}


      <TouchableOpacity onPress={handleSubmit} style={styles.button} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: '#333',
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'left',
    width: '100%',
  },
  error: {
    marginVertical: 4,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 15,
    color: "red",
    fontSize: 13,
    marginTop: -22,
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  groupInput: {
    position: "relative",
    marginBottom: 23,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 25,
    paddingVertical: 5,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Screen_03;
