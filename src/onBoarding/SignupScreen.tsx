import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from '@emotion/native';

import { Text, View, Pressable, StyleSheet, TextInput, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();

  const headerStyle = () => {
    navigation.setOptions({
      headerShown: true,
      title: '회원가입',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        ...Platform.select({
          ios: {
            fontWeight: '600',
            fontSize: 17,
          },
          android: {
            fontWeight: 'bold',
            fontSize: 15,
          },
        }),
      },
      headerStyle: {
        ...Platform.select({
          android: {
            borderWidth: 0.8,
          },
        }),
        borderColor: '#dfe2e5',
      },
      headerLeft: () => (
        <Pressable
          style={styles.BackIcon}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Image source={require(`../assets/icons/Left.png`)}></Image>
        </Pressable>
      ),
    });
  };

  headerStyle();

  const [inputID, setInputID] = useState('사용자 이름');
  const [inputNickname, setInputNickname] = useState('');

  const [inputCheck, setInputCheck] = useState(false);
  const [inputEmptyCheck, setInputEmptyCheck] = useState(false);

  const onPress = () => {
    navigation.navigate('AddStyle');
  };

  const handleInputID = useCallback(
    (e) => {
      setInputID(e);
      console.log(e);
    },
    [inputID],
  );

  const handleInputNickname = useCallback(
    (e) => {
      setInputNickname(e);
      console.log(e);
    },
    [inputNickname],
  );

  useEffect(() => {
    if (inputNickname.length > 0) {
      setInputCheck(true);
      setInputEmptyCheck(false);
    } else {
      setInputEmptyCheck(true);
      setInputCheck(false);
    }
  }, [inputNickname]);

  useEffect(() => {
    setInputEmptyCheck(false);
  }, []);

  return (
    <Wrapper>
      <Text style={styles.TextTitle}>이름/닉네임 작성하기</Text>
      <InputContainer>
        <View style={styles.inputImage}>
          <Image
            style={{ width: 24, height: 24, borderRadius: 12 }}
            source={require(`../assets/icons/profile_black.png`)}
          />
        </View>
        <TextInput
          autoCapitalize={'none'}
          onChangeText={handleInputID}
          style={styles.InPutID}
          value={inputID}
          editable={false}
        />
      </InputContainer>
      <InputContainer style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={styles.inputImage}>
            <Image
              style={{ width: 24, height: 24, borderRadius: 12 }}
              source={require(`../assets/icons/profile_black.png`)}
            />
          </View>
          <TextInput
            autoCapitalize={'none'}
            onChangeText={handleInputNickname}
            style={styles.InPutNickname}
            value={inputNickname}
            placeholder="닉네임"
          />
          {/* <Text style={styles.NicknameCheck}>중복확인</Text> */}
        </View>
      </InputContainer>
      <View style={styles.inputValidity}>
        {inputEmptyCheck ? (
          <Text style={styles.inputEmptyText}>닉네임을 입력해주세요.</Text>
        ) : (
          <></>
        )}
        {inputNickname.length >= 2 ? (
          <Text style={styles.inputValidityText}>닉네임을 사용할 수 있습니다.</Text>
        ) : (
          <></>
        )}
        {inputNickname.length >= 1 && inputNickname.length < 2 ? (
          <Text style={styles.inputValidityFalseText}>닉네임을 사용 중입니다.</Text>
        ) : (
          <></>
        )}
      </View>
      {inputCheck ? (
        <Pressable onPress={onPress} style={styles.SignupComplete}>
          <Text style={styles.SignupCompleteText}>완료</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.SignupFalse}>
          <Text style={styles.SignupCompleteText}>완료</Text>
        </Pressable>
      )}
    </Wrapper>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  TextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#2a3037',
  },
  InPutID: {
    paddingLeft: 15,
    fontStyle: 'normal',
    color: '#2a3037',
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '600',
      },
    }),
  },
  InPutNickname: {
    width: '75%',
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#2a3037',
  },
  NicknameCheck: {
    fontStyle: 'normal',
    color: '#7e8389',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        fontWeight: '500',
        fontSize: 15,
      },
      android: {
        fontWeight: '600',
        fontSize: 14,
      },
    }),
  },
  SignupComplete: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: '#fe554a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignupFalse: {
    width: 327,
    height: 56,
    borderRadius: 32,
    backgroundColor: '#DFE2E6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignupCompleteText: {
    fontSize: 15,
    fontWeight: '900',
    fontStyle: 'normal',
    color: '#ffffff',
  },
  BackIcon: {
    width: 50,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 20,
  },
  inputImage: {
    width: 43,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputValidity: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        paddingLeft: 55,
      },
      android: {
        paddingLeft: 65,
      },
    }),
  },
  inputEmptyText: {
    fontSize: 12,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '600',
      },
    }),
    color: '#2A3037',
  },
  inputValidityText: {
    fontSize: 12,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '600',
      },
    }),
    color: '#04E85F',
  },
  inputValidityFalseText: {
    fontSize: 12,
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontWeight: '600',
      },
    }),
    color: '#FA4A0C',
  },
});

const Wrapper = styled.View({
  paddingTop: 36,
  backgroundColor: '#fff',
  flex: 1,
  alignItems: 'center',
});

const InputContainer = styled.View({
  borderStyle: 'solid',
  borderWidth: 1,
  width: 327,
  height: 56,
  borderRadius: 32,
  borderColor: '#d0dbea',
  marginTop: 36,
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
});
