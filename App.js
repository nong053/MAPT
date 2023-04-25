import * as React from 'react';
import { useRef } from 'react';
import 'expo-dev-client';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-9478268987509661/9602170968';
import Constants from 'expo-constants';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';





import {
  ScrollView,View,Text,
  RefreshControl,
  StyleSheet,Button,Alert,SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
function generateUUID(digits) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}
/*
let uuidData = generateUUID(32);
let fetchUUID = await SecureStore.getItemAsync('secure_deviceid');
  //if user has already signed up prior
  if (fetchUUID) {
    uuidData = fetchUUID
  }
await SecureStore.setItemAsync('secure_deviceid', JSON.stringify(uuidData));
console.log(uuidData)
*/
export default function App() {






   //const UUID =  Math.floor(Math.random() * 10000000000000000);
   const UUID = generateUUID(32);
   //save('key', 'test');
   //console.log(getValueFor('UUID'));

  const [refreshing, setRefreshing] = React.useState(false);
  const webViewRef = useRef()
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    webViewRef.current.reload();
    wait(2000).then(() => setRefreshing(false));

  }, [refreshing]);

  

  return (

  
    <View style={{flex: 1,backgroundColor:'#191970'}}>
  
      <SafeAreaView>
          <View  style={styles.buttonRefreshArea} >
              <FontAwesome style={styles.buttonRefresh} name={'refresh'} onPress={onRefresh} /> 
              {/* <Text>{uuidv4()}</Text> */}
          </View>
          <View>
         
          </View>
          
      </SafeAreaView>
         
        <WebView

          ref = {webViewRef}
          automaticallyAdjustContentInsets={false}
          source={{ uri: 'http://dashboardweb.com/swot/index.php?uuid='+UUID+''}} 
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
           
          
        />
    
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
   //borderColor:'#000039',
  // borderTopWidth:2,
   padding:5,
   //borderBottomWidth:1,
  justifyContent: 'center',
  backgroundColor:'white'

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
     //marginTop:30,
    paddingTop:5
  },
  buttonRefresh:{
   
    justifyContent:'center',
    fontSize:20,
    color:'#ffffff',
    textAlign:'center',
    
    
  }
 
});
//dev: eas build --profile development --platform android =apk then run: expo startt -dev-client
//production: eas build --platform android=abb then deploy to google play console for productionr