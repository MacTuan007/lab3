import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth'

const Home = ({ navigation, route }) => {
  const [list, setList] = useState([]);
  const {tk} = route.params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        await firestore()
          .collection('Users')
          .doc(tk)
          .collection('Personal')
          .onSnapshot(querySnapshot => {
            const doc = querySnapshot.docs.map(doc => ({
              id: doc.id, ...doc.data()
            }));
            setList(doc)
          }
          );
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const onUpdate = (tk,itemid, itemname, itemmoney, itemnote) => {
    navigation.navigate('Updateitem', {tk, itemid, itemname, itemmoney, itemnote })
  }

  const onDelete = async (item) => {
    await firestore().collection('Users').doc(tk).collection('Personal').doc(item.id).delete();
  }

  return (
    <View style={{
      flex: 1,
      margin: 10,
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row'
      }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate('Personal',{tk})}}>
          <Text style={{
            backgroundColor: 'grey',
            borderRadius: 30,
            fontSize: 20,
            padding: 10,
            marginRight: 10,
          }}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate('Additem') }}>
          <Text style={{
            backgroundColor: 'grey',
            borderRadius: 30,
            fontSize: 20,
            padding: 10,
            marginLeft: 10,
          }}>Thêm ghi chú</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 5 }}>
        <FlatList
          data={list}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <View style={{
              borderWidth: 2,
              borderColor: 'grey',
              padding: 10,
              flexDirection: 'row',
            }}>
              <TouchableOpacity style={{
                borderWidth: 2,
                borderColor: 'grey',
                padding: 10,
                flex: 3,
                marginRight: 10,
              }}>
                <View style={{
                }}>
                  <Text>Tên: {item.name}</Text>
                  <Text>TIền: {item.money}</Text>
                  <Text>Ghi chú: {item.note}</Text>
                </View>
              </TouchableOpacity>
              <View style={{
                flex: 1,
              }}>
                <TouchableOpacity onPress={() => onUpdate(tk,item.id, item.name, item.money, item.note)}>
                  <Text style={{
                    backgroundColor: 'grey',
                    padding: 5,
                    fontSize: 20,
                    textAlign: 'center',
                    marginBottom: 5,
                  }}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item)}>
                  <Text style={{
                    backgroundColor: 'grey',
                    padding: 5,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>Xóa</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Home;
