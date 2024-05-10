import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import {StoreContext} from '../store';
import {Appbar, Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const store = useContext(StoreContext);
  const [newEntity, setNewEntity] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState([]);

  const onChangeButton = () => {
    if (newEntity !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onPress = () => {
    firestore()
      .collection('Jobs')
      .add({
        name: newEntity,
      })
      .then(() => {
        console.log('Jobs added!');
      });
  };

  useEffect(() => {
    onChangeButton();

    firestore()
      .collection('Jobs')
      .onSnapshot(querySnapshot => {
        console.log('Total Jobs: ', querySnapshot.size);

        let jobs = [];
        querySnapshot.forEach(documentSnapshot => {
          console.log('Job ID: ', documentSnapshot.id, documentSnapshot.data());
          jobs.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });

        setData(jobs);
      });
  }, [newEntity]);

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        {/* <Appbar.Content title={store.user.fullName} /> */}
        <Appbar.Content title={'Todos List'}/>
        <Appbar.Content
          titleStyle={{ fontSize: 16,color: 'red' }}
          title={'Logout'}
          onPress={() => {
            store.logout();
            navigation.navigate('Login');
          }}
          style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}
        />
      </Appbar.Header>
      
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Text
              style={{
                fontSize: 20,
                padding: 16,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginBottom: 20,
        }}>
        <TextInput
          label="New ToDo"
          style={{width: '70%', height: 48}}
          value={newEntity}
          onChangeText={text => setNewEntity(text)}
        />
        <Button
          mode="contained"
          style={{
            width: '20%',
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
            backgroundColor: '#5ed3f3'
          }}
          disabled={disabled}
          onPress={() => onPress()}>
          Add
        </Button>
      </View>
    </View>
  );
};

export default Home;
