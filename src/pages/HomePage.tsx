import React from 'react';
import {SafeAreaView, Text, Image} from 'react-native';

const HomePage = () => {
    return (
        <SafeAreaView>
            <Image source={ require('../../images/vavau.png')}/>
        </SafeAreaView>
    );
};

HomePage.navigationOptions = {
    headerShown: false,
};

export default HomePage;
