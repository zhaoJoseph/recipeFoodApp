import React, {useState} from 'react';

import {View, Text } from 'react-native';

import {Octicons, Ionicons} from '@expo/vector-icons';

import axios from 'axios';

import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    PageSubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    LeftIcon,
    StyledTextLabel,
    StyledTextInput,
    RightIcon,

 } from '../../components/styles.js';

import {Formik} from 'formik';

import * as yup from 'yup';

import {Colors} from '../../Constants/Colors';

const Register = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    const [message, setMessage] = useState();

    const handleRegister = (credentials) => {
    const url = "https://foodapi-vs7cd2fg5a-uc.a.run.app/register";
    axios.post(url, {params: {
      email: credentials.email,
      password: credentials.password
      }}).then((res) => {
        const result = res.data;
        if(result.message == 'Account Created!'){
          navigation.navigate('Login')

        }else{
          setMessage("An error occured please try again later");
        }
      
        
      }).catch((error) => {
        console.log(error);
        setMessage("An error occured please try again later");

    }).catch((error) => {
      console.log(error);
    })  
  }

    return (
        <StyledContainer>
            <InnerContainer>
                <PageTitle>App</PageTitle>
                <PageSubTitle>Create your Account</PageSubTitle>
                <Formik
                    initialValues={{email: '', password: '', }}
                    onSubmit={(values) => {
                      handleRegister(values);
                      }}
                    validationSchema={registerValidate}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <StyledFormArea>
                    <MyTextInput 
                    label="Email Address"
                    icon="mail"
                    placeholder="example@gmail.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholderTextColor={Colors.darklight}
                    keyboardType="email-address"
                    setMessage={setMessage}
                    /> 
                    {(errors.email && touched.email) && 
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
                    <MyTextInput 
                    label="Password"
                    icon="key"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    placeholderTextColor={Colors.darklight}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                    setMessage={setMessage}
                    /> 
                    {(errors.password && touched.password) &&
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>} 
                    <StyledButton
                    
                    onPress={handleSubmit}
                    >
                        <ButtonText>Create Account</ButtonText>
                    </StyledButton>
                        <ExtraView>
                        <ExtraText>
                            Already have an account? 
                        </ExtraText>
                        <TextLink
                        onPress={() => navigation.navigate("Login")}
                        >
                            <TextLinkContent> Login Here</TextLinkContent>
                        </TextLink>
                        </ExtraView>
                        <Text style={{ fontSize: 20, color: 'red', textAlign: 'center' }}>{message}</Text>
                    </StyledFormArea>
                )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );

}


const registerValidate = yup.object().shape({
    email: yup
      .string()
      .email()
      .required('email required'),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password required'),
})

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, setMessage, ...props}) => {
  return  (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.brand} />
      </LeftIcon>
      <StyledTextLabel>{label}</StyledTextLabel>
      <StyledTextInput onChange={()=> setMessage()} {...props}/>
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darklight}/>
        </RightIcon>
      )}
    </View> 
  )
}


export default Register;