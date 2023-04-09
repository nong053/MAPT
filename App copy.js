import * as React from 'react';
import { useRef } from 'react';


import Constants from 'expo-constants';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';


// import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

// const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

// const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

// // Preload an app open ad
// appOpenAd.load();

// // Show the app open ad when user brings the app to the foreground.
// appOpenAd.show();

import {
  ScrollView,View,Text,
  RefreshControl,
  StyleSheet,Button,Alert,SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';


function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function App() {

  const [refreshing, setRefreshing] = React.useState(false);
  const webViewRef = useRef()
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    webViewRef.current.reload();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={{flex: 1}}>
   <SafeAreaView>
    <View  style={styles.buttonRefreshArea} >
      {/* <FontAwesome.Button style={styles.buttonRefresh} name="refresh" backgroundColor="#3b5998" onPress={onRefresh}>
      refresh
      </FontAwesome.Button> */}
        {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-car-bolt" /> */}
        <FontAwesome style={styles.buttonRefresh} name={'refresh'} onPress={onRefresh} /> 
       
    </View>

    </SafeAreaView>
   
         
        <WebView
          ref = {webViewRef}
          automaticallyAdjustContentInsets={false}
          source={{ uri: 'http://dashboardweb.com/swot' }} 
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          // style={styles.container}
          
        />


     {/* <SafeAreaView style={styles.container}>
      <AdMobBanner
      bannerSize="smartBannerPortrait"
      adUnitID="ca-app-pub-9478268987509661/1703090252" // Replace with your-admob-unit-id (camping site)
      servePersonalizedAds // true or false
      onDidFailToReceiveAdWithError={this.bannerError} /> 
    </SafeAreaView> */}

</View>
  );
}

const styles = StyleSheet.create({
  container: {
   // position : 'relative',
   marginTop:20,
   borderColor:'#AC9B78',
  borderTopWidth:2,
  borderBottomWidth:1,
  justifyContent: 'center',
  height:80,
 
  },
  ScrollStyle: {
   backgroundColor : 'white',
   position: 'relative',
  },
  buttonRefreshArea:{
    justifyContent:'center',
   // opacity:0.5,
     backgroundColor:'#000039',
    marginTop:30,
    padding:5
  },
  buttonRefresh:{
   
    justifyContent:'center',
    fontSize:20,
    color:'#ffffff',
    textAlign:'center',
    
    
  }
});