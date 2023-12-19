import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

const Additem = ({ navigation, route }) => {
    const user = auth().currentUser;
    const [name, setname] = useState('');
    const [money, setmoney] = useState('');
    const [note, setnote] = useState('');
    const onThemSanPham = () => {
        try {
            const data = {
                name:  name ,
                money: money ,
                note:  note ,
            };
            firestore().collection('Users').doc(user.email).collection('Personal').add(data);
            navigation.pop();
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <View style={{
            margin: 10,
            flex: 1,
        }}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold'
                }}>Thêm ghi chú</Text>
            </View>
            <View style={{
                flex: 5,
            }}>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Tên"
                    value={name}
                    onChangeText={text => setname(text)}>
                </TextInput>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Tiền"
                    keyboardType='numeric'
                    value={money}
                    onChangeText={text => setmoney(text)}></TextInput>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Ghi chú"
                    value={note}
                    onChangeText={text => setnote(text)}></TextInput>
                <TouchableOpacity activeOpacity={0.5} onPress={onThemSanPham}>
                    <Text style={{
                        fontSize: 20,
                        backgroundColor: 'grey',
                        marginTop: 20,
                        textAlign: 'center',
                    }}>Xác nhận thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Additem