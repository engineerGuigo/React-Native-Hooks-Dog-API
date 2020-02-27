import React, { useState } from 'react';
import {SafeAreaView, Text, FlatList, Image, View} from 'react-native';
import axios from 'axios';


const HomePage = () => {

    const [breeds, setBreeds] = useState({});
    axios
    .get('https://dog.ceo/api/breeds/list/all')
    .then(({data}) => {
        const breedsObject = data.message;
        const breedKeys = Object.keys(breedsObject);
        const assembledBreedsObject = {};
        breedKeys.map(key => {
            if(breedsObject[key].length > 0){
                // the breed has sub breeds
                    breedsObject[key].forEach(subBreed => {
                        assembledBreedsObject[key + '_' + subBreed] = key + '/' + subBreed;
                    });
            } else {
                // this breed has NO sub breeds
                assembledBreedsObject[key] = key;
            }
        });

        setBreeds(assembledBreedsObject);
    });

    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{flex: 1}}>
            <Image source={ require('../../images/vavau.png')}/>
            </View>
            <View style={{flex: 4}}>
                <Text>{JSON.stringify(breeds)}</Text>
            </View>
        </SafeAreaView>
    );
};

HomePage.navigationOptions = {
    headerShown: false,
};

export default HomePage;
