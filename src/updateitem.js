import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';

const Updateitem = ({ route, navigation }) => {
    const {tk, itemid, itemname, itemmoney, itemnote } = route.params;
    const [name, setname] = useState(itemname);
    const [money, setmoney] = useState(itemmoney);
    const [note, setnote] = useState(itemnote);

    const onUpdateData = () => {
        const data = {
            name: name,
            money: money,
            note: note,
        }
        firestore().collection('Users').doc(tk).collection('Personal').doc(itemid).update(data);
        navigation.pop();
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
                }}>Thêm sản phẩm</Text>
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
                    value={money}
                    keyboardType='numeric'
                    onChangeText={text => setmoney(text)}></TextInput>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Ghi chú"
                    value={note}
                    onChangeText={text => setnote(text)}></TextInput>
                <TouchableOpacity activeOpacity={0.5} onPress={onUpdateData}>
                    <Text style={{
                        fontSize: 20,
                        backgroundColor: 'grey',
                        marginTop: 20,
                        textAlign: 'center',
                    }}>Sửa sản phẩm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Updateitem