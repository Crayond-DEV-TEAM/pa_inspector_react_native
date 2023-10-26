import React from 'react';

import {
    StatusBar,
    StyleSheet,
    Dimensions,
    View,
    Platform,
} from 'react-native';

import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Config from "react-native-config";

const INJECTED_JAVASCRIPT = `(function() {
    const authLocalStorage = window.localStorage.getItem('authToken');
   
    const obj = {
        authLocalStorage,
    }

    const getItemLocalStorage = JSON.stringify(obj);
    window.ReactNativeWebView.postMessage(getItemLocalStorage);
})();`;

const isIOS = Platform.OS === 'ios';
const { height } = Dimensions.get('window');

const WebScreen = (props) => {
    const { diviceToken } = props;
    
    const onMessage = (payload) => {
        // console.log('payload asses', payload);
    };

    // console.log('Config', `${Config?.PROJECT_URL}/?deviceToken=${diviceToken}`)    
    const WebviewRender = () => {
            return (<WebView
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={onMessage}
                overScrollMode='never'
                pullToRefreshEnabled={true}
                // onLoadEnd={() => {
                //     setVisible(false)
                // }}
                incognito={true}
                cacheEnabled={false}
                cacheMode={'LOAD_NO_CACHE'}
                source={{ uri: `${Config?.PROJECT_URL}/?deviceToken=${diviceToken}` }} 
                style={{ marginTop: isIOS ? 0 : 10 }}
                />
    )
}

    return (
        <View style={{flex: 1,backgroundColor: Config?.APPNAME === "worker1" ? "#501C58" : "#B20606" }}>
            <SafeAreaProvider style={{flex: 1}}>
                <StatusBar translucent backgroundColor={"#B20606"} barStyle="light-content"/>
                <SafeAreaView style={{flex:1, paddingBottom: isIOS && height < 812 ? -1 : -40}}>
                    <WebviewRender />
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

export default WebScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -StatusBar.currentHeight + 10,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});