import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const Personal = ({ navigation, route }) => {
    const { tk } = route.params;
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [gender, setgender] = useState('');

    useEffect(() => {
        const getuser = async () => {
            try {
                const docSnapShot = await firestore().collection('Users').doc(tk).get();
                if (docSnapShot.exists) {
                    const data = docSnapShot.data();
                    setname(data.name)
                    setaddress(data.address)
                    setgender(data.gender)
                }
                else console.log('Document does not exist!');
            }
            catch (e) {
                console.error(e);
            }
        };
        getuser();
    }, [])
    const updateUser = async () => {
        const data = {
            name: name,
            address: address,
            gender: gender,
        }
        await firestore()
            .collection('Users')
            .doc(tk)
            .update(data)
        navigation.pop()
    }

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
                flex: 1,
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                }}>Thông tin cá nhân</Text>
            </View>
            <View style={{
                flex: 6,
                margin: 20,
            }}>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Tên của bạn"
                    value={name}
                    onChangeText={text => setname(text)}></TextInput>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Địa chỉ hiện tại"
                    value={address}
                    onChangeText={text => setaddress(text)}></TextInput>
                <TextInput style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginTop: 5,
                }}
                    placeholder="Giới tính"
                    value={gender}
                    onChangeText={text => setgender(text)}></TextInput>
                <TouchableOpacity activeOpacity={0.5} onPress={updateUser}>
                    <Text style={{
                        backgroundColor: 'grey',
                        borderRadius: 30,
                        fontSize: 20,
                        padding: 10,
                        marginTop: 20,
                        textAlign: 'center'
                    }}>Lưu thông tin</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Personal