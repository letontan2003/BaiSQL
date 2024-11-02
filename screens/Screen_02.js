import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from "expo-checkbox";
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import axios from "axios";
import validation from "../vadidation/SigupValidation";

const Screen_02 = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setErrors(validation(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (
      isSubmitting &&
      errors.name === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("http://localhost:8692/signup", values)
        .then(() => {
          alert("Created Account Successfully");
          navigation.navigate("Screen_03");
        })
        .catch((err) => console.log(err))
        .finally(() => setIsSubmitting(false));
    } else setIsSubmitting(false);
  }, [errors, isSubmitting, navigation, values]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      {/* Add Image19 */}
      <Image source={require('../assets/Data/Image19.png')} style={styles.logo} />

      <Text style={styles.title}>Nice to see you!</Text>
      <Text style={styles.subtitle}>Create your account</Text>



      <TextInput
        value={values.name}
        onChangeText={(value) => {
          setValues({ ...values, name: value });
          console.log(values);
        }}
        placeholder="Enter your user name"
        style={styles.input}
      />

      {errors.name && (
        <Text style={styles.error}>{errors.name}</Text>
      )}



      <TextInput
        value={values.email}
        onChangeText={(value) => {
          setValues({ ...values, email: value });
          console.log(values);
        }}
        placeholder="Enter your email address"
        style={styles.input}
        keyboardType="email-address"
      />
      {errors.email && (
        <Text style={styles.error}>{errors.email}</Text>
      )}



      <View style={styles.passwordContainer}>
        <TextInput
          value={values.password}
          onChangeText={(value) =>
            setValues({ ...values, password: value })
          }
          placeholder="Enter your password"
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible} // Toggle visibility
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
      {errors.password && (
        <Text style={styles.error}>{errors.password}</Text>
      )}


      {/* I agree with Terms & Conditions */}
      <View style={styles.groupCheckBox}>
        <CheckBox
          style={styles.CheckBox}
          value={checked}
          onValueChange={() => setChecked((prev) => !prev)}
        />
        <Text style={styles.agreeText}>I agree with</Text>
        <TouchableOpacity>
          <Text style={styles.termsText}> Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} >
        <Text style={styles.buttonText}>Continue</Text>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 25,

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
    paddingVertical: 5,
    width: '100%',
    marginBottom: 25,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  groupCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  agreeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  termsText: {
    fontSize: 14,
    color: '#1e90ff',
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

export default Screen_02;
