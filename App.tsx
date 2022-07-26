/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

const SignUpTemplate = {
  name: {value: '', error: ''},
  email: {value: '', error: ''},
  phone: {value: '', error: ''},
  password: {value: '', error: ''},
  confirmPassword: {value: '', error: ''},
};

const App = () => {
  const [signUpForm, setSignUpForm] = useState({...SignUpTemplate}); //destructuring by spread operator
  const [loading, setLoading] = useState(false);
  // const [isSelected, setSelection] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleFormError = (key: string, value: string) => {
    let error = '';
    if (key === 'name') {
      if (value.length < 3) {
        error = 'Name must be at least 3 characters long';
      }
    } else if (key === 'email') {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
        error = 'Invalid Email';
      }
    } else if (key === 'phone') {
      if (value.length !== 10) {
        error = 'Phone must includes 10 characters only';
      }
    } else if (key === 'password') {
      if (value.length < 6) {
        error = 'Password must be at least 6 characters long';
      }
    } else if (key === 'confirmPassword') {
      if (value !== signUpForm.password.value) {
        error = 'Password does not match';
      }
    }

    return error;
  };

  const handleForm = (key: string, value: string) => {
    let currentSignUpForm: any = {...signUpForm};

    // Second way to update state
    currentSignUpForm[key]['value'] = value;
    currentSignUpForm[key]['error'] = handleFormError(key, value);

    setSignUpForm(currentSignUpForm);
  };

  useEffect(() => {
    console.log('signUpForm', signUpForm);
  }, [signUpForm]);

  const extractFormData = () => {
    let data: any = {};
    Object.entries(signUpForm).forEach(([key, value]) => {
      data[key] = value.value;
    });
    delete data['confirmPassword'];
    return data;
  };

  const postUser = async (data: any) => {
    try {
      const res = await axios.post('http://localhost:3000/user', data, {
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': 'dssgsjhgadshjgafskjkafkskhjh',
        },
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async () => {
    console.log('handleSubmit_signUpForm', signUpForm);

    const data = extractFormData();
    console.log('handleSubmit_extractedData', data);
    setLoading(true);
    try {
      const response: any = await postUser(data);
      if (response.status === 200) {
        setLoading(false);
        Alert.alert('Success', 'User created successfully');
      } else {
        throw response;
      }
    } catch (error: any) {
      // error handling
      console.log('handleSubmit_error', error);
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Error', error.message);
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'#000000'}
          style={{marginVertical: 70, marginHorizontal: 20}}
        />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Sign Up</Text>

          <View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={signUpForm.name.value}
              onChangeText={text => handleForm('name', text)}
            />
            <Text style={styles.error}>{signUpForm.name.error}</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={signUpForm.email.value}
              onChangeText={text => handleForm('email', text)}
            />
            <Text style={styles.error}>{signUpForm.email.error}</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={signUpForm.phone.value}
              onChangeText={text => handleForm('phone', text)}
            />
            <Text style={styles.error}>{signUpForm.phone.error}</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={signUpForm.password.value}
              onChangeText={text => handleForm('password', text)}
            />
            <Text style={styles.error}>{signUpForm.password.error}</Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={signUpForm.confirmPassword.value}
              onChangeText={text => handleForm('confirmPassword', text)}
            />
            <Text style={styles.error}>{signUpForm.confirmPassword.error}</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal:14
            }}>
            <View>
              <CheckBox
                boxType={'square'}
                onCheckColor={'white'}
                onFillColor={'#eb8b46'}
                onTintColor={'#eb8b46'}
                lineWidth={1}
                animationDuration={0.2}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
            </View>
            <View style={{marginLeft:5}}>
              <Text style={{fontSize:12}}>
                By creating an account you agreed the <Text style={{color:'#eb8b46',textDecorationLine:'underline'}}>Terms & Condition</Text> of
                NaWee
              </Text>
            </View>
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={handleSubmit}>
              <Text style={{color: 'white', display: 'flex'}}>Submit</Text>
            </TouchableOpacity>
            {/* <Button title="Submit" onPress={handleSubmit}/> */}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    marginTop: 4,
    marginBottom: 15,
    marginHorizontal: 5,
    color: 'red',
  },

  container: {
    flex: 1,
    // backgroundColor : '#eee',
    backgroundColor: '#ebe7e6',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '85%',
    // backgroundColor:'#ebe7e6',
    borderColor: '#eb8b46',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  heading: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,

    borderColor: '#eb8b46',
    // marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 150,
    // marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: '#eb8b46',
    borderColor: '#eb8b46',
    paddingVertical: 8,
  },

  btnView: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default App;
