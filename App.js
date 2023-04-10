import * as React from 'react';
import { useRef } from 'react';
import 'expo-dev-client';

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9478268987509661~2276955268';



import Constants from 'expo-constants';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';



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
    <SafeAreaView>
      <View  style={styles.buttonRefreshArea} >
          <FontAwesome style={styles.buttonRefresh} name={'refresh'} onPress={onRefresh} /> 
      </View>
    </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <BannerAd 
         
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
    </SafeAreaView>

</View>
  );
}

const styles = StyleSheet.create({
  container: {
   // position : 'relative',
   marginTop:0,
   borderColor:'#000039',
   borderTopWidth:2,
   padding:5,
   //borderBottomWidth:1,
  justifyContent: 'center',
 // height:80
  
  
 
  },
  ScrollStyle: {
   backgroundColor : 'white',
   position: 'relative',
  },
  buttonRefreshArea:{
    justifyContent:'center',
   // opacity:0.5,
     backgroundColor:'#191970',
    // marginTop:30,
    padding:5
  },
  buttonRefresh:{
   
    justifyContent:'center',
    fontSize:20,
    color:'#ffffff',
    textAlign:'center',
    
    
  },
 
});