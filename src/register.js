import { View, Text, TouchableOpacity, TextInput } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({ navigation }) => {
    const [tkdk, settkdk] = useState('');
    const [mkdk, setmkdk] = useState('');
    const [mkdk2, setmkdk2] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');

    function ktmk(mkdk, mkdk2) {
        if (mkdk === mkdk2)
            return true;
        setErrorMessage('Mật khẩu không trùng khớp')
        return false;
    }
    const taoUser = () => {
        const data = {
            name: '',
            address: '',
            gender: '',
        }
        firestore().collection('Users').doc(tkdk).set(data);
    }
    const onClickDangKy = () => {
        if (ktmk(mkdk, mkdk2)) {
            auth().createUserWithEmailAndPassword(tkdk, mkdk)
                .then(() => {
                    taoUser();
                    navigation.pop();
                })
                .catch((e) => {
                    console.error(e);
                    setErrorMessage("Email đã được đăng ký");
                    settkdk("");
                    setmkdk("");
                    setmkdk2("");
                });
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#00BB00',
        }}>
            <View style={{
                flex: 1,
                borderRadius: 25,
                backgroundColor: 'white',
                margin: 20,
            }}>
                {/* header  */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}>Đăng ký</Text>
                </View>

                {/* body */}
                <View style={{
                    flex: 6,
                    margin: 20,
                }}>
                    <Text style={{
                        fontWeight: 'bold',

                    }}>Nhập Email:</Text>
                    <TextInput style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginTop: 5,
                    }}
                        placeholder="abcd@gmail.com"
                        value={tkdk}
                        onChangeText={text => settkdk(text)}></TextInput>

                    <Text style={{
                        fontWeight: 'bold',
                        marginTop: 10,

                    }}>Nhập mật khẩu:</Text>
                    <TextInput style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginTop: 5,
                    }}
                        secureTextEntry={true}
                        placeholder="Nhập mật khẩu"
                        value={mkdk}
                        onChangeText={text => setmkdk(text)}></TextInput>

                    <Text style={{
                        fontWeight: 'bold',
                        marginTop: 10

                    }}>Nhập lại mật khẩu:</Text>
                    <TextInput style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 1,
                        marginTop: 5,
                    }}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={true}
                        value={mkdk2}
                        onChangeText={text => setmkdk2(text)}></TextInput>

                    <View style={{
                        marginTop: 40,
                    }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={onClickDangKy}>
                            <LinearGradient style={{
                                padding: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} colors={['#00FF00', '#00DD00', '#00AA00', '#005500', '#003300']}
                                useAngle={true}
                                angle={45}>

                                <Text style={{
                                    fontSize: 20,
                                    color: '#EE0000'
                                }}>XÁC NHẬN ĐĂNG KÝ</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style ={{
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style = {{
                            color: 'red',
                        }}>{ErrorMessage}</Text>
                    </View>
                </View>

                {/* footer */}
                <View style={{
                    flex: 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <Text>Đã có tài khoản</Text>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Text style={{
                            color: 'blue',

                        }}>Quay lại đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Register