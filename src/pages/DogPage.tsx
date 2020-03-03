import React, { useState, useEffect } from 'react';
import {Text, View, FlatList, Image, Dimensions} from 'react-native';
import axios from 'axios';

import PlainText from '../components/PlainText';


const DogPage = ({navigation}) => {
    const {width, height} = Dimensions.get('window');
    const [images, setImages] = useState([]);
    const [desc, setDesc] = useState();
    useEffect(() => {
        const breed = navigation.getParam('breed');
        axios.
        get(`https://dog.ceo/api/breed/${breed}/images`).
        then(({data}) =>{
            console.log(data);
            setImages(data.message);
        });
        axios.get(`https://en.wikipedia.org/w/api.php?format=json&explaintext&prop=extracts&explaintext&exintro&action=query&list=search&srsearch=${breed}%20dog`)
        .then(({data})=>{
            console.log(data);
            setDesc(data.query.search[0].snippet);
        });

    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <FlatList
                    keyExtractor={(item, index) => {
                        return 'image-' + index;
                    }}
                snapToInterval={width}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={images}
                    renderItem={({item}) => {
                        return (
                            <View style={{margin: 10}}>
                                <Image 
                                source = {{uri: item}} 
                                style={{width: width - 20, height: height * 0.3}}
                                />
                            </View>
                        );
                    }}
                />
            </View>
            <View style={{flex: 1, padding: 10}}>
                <PlainText text={desc}/>
            </View>
        </View>
    );
};

DogPage.navigationOptions= ({navigation}) => ({
    title: navigation.getParam('breed'),
});

export default DogPage;