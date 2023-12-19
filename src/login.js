import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth'
const Login = ({navigation}) => {

    const [tk, settk] = useState('');
    const [mk, setmk] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const onClickDangNhap =() =>{
        auth()
          .signInWithEmailAndPassword(tk, mk)
          .then(() => {
            navigation.navigate('Home',{tk: tk});
            setErrorMessage('');
            settk('');
            setmk('');
          })
          .catch((e) => {
            console.error(e);
            setErrorMessage("Email hoặc mật khẩu không chính xác");
          });
    }
    
  return (
    <View style = {{
      backgroundColor: '#00BB00',
      flex: 1,
    }}>
        <View style = {{
            backgroundColor: 'white',
            margin: 15,
            flex: 7,
            borderRadius: 25,
        }}>
          {/* header */}
          <View style = {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style = {{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 20,
              
            }}>Đăng nhập</Text>
          </View>

          {/* body  */}
          <View style = {{
            flex: 5 ,
            margin: 20,
          }}>
            <View>
              <Text style = {{
                color: 'black',
                fontWeight: 'bold'
              }}>Email:</Text>
              <TextInput style = {{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                }}
                placeholder="abcd@gmail.com"
                value={tk}
                onChangeText={text => settk(text)}></TextInput>   
              </View>

              <View style = {{
                marginTop: 20,
              }}>
                <Text style = {{
                  color: 'black',
                  fontWeight: 'bold'
                }}>Mật khẩu</Text>
              <TextInput style = {{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                }}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                value={mk}
                onChangeText={text => setmk(text)}></TextInput>
              </View>
              <View style = {{
                marginTop: 40,
              }}>
                <TouchableOpacity activeOpacity={0.5} onPress={onClickDangNhap}>
                  <LinearGradient style={{
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }} colors={['#00FF00','#00DD00','#00AA00','#005500','#003300']}
                    useAngle={true}
                    angle={45}>
                  
                    <Text style ={{
                      fontSize: 20,
                      color: '#EE0000'
                    }}>ĐĂNG NHẬP</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style = {{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
                <Text style = {{
                  color: 'red'
                }}>{ErrorMessage}</Text>
              </View>
          </View>

          {/* footer */}
          <View style = {{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style = {{color: 'black',}}>Chưa có tài khoản</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('Register')}}>
                <Text style = {{
                color: 'blue',
                fontWeight: 'bold'
                }}> Đăng ký </Text>
              </TouchableOpacity>
          </View>

        </View>
        
    </View>
  );
};
export default Login;