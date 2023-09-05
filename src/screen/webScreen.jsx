import React from 'react';

import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text
} from 'react-native';

import { WebView } from 'react-native-webview';

import Config from "react-native-config";
const INJECTED_JAVASCRIPT = `(function() {
    const authLocalStorage = window.localStorage.getItem('authToken');
   
    const obj = {
        authLocalStorage,
    }

    const getItemLocalStorage = JSON.stringify(obj);
    window.ReactNativeWebView.postMessage(getItemLocalStorage);
})();`;


const WebScreen = (props) => {
    const { diviceToken } = props;
    
    const onMessage = (payload) => {
        // console.log('payload asses', payload);
    };

    // console.log('Config', Config)    
    const WebviewRender = () => {
            return (<WebView
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={onMessage}
                source={{ uri: Config?.PROJECT_URL }} style={{ marginTop: 20 }} />
    )
}

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={{fontSize: 50, color:"red"}}>Test</Text> */}
            {/* <Text style={{fontSize: 50, color:"red"}}>{Config?.APPNAME}</Text> */}
            <WebviewRender />
        </SafeAreaView>
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