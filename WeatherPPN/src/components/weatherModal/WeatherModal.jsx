import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, PaperProvider, Button } from 'react-native-paper';
import Loader from '../loader/Loader';
import { prevailingWeatherMsg,last24HourWeatherMsg } from '../../utils/utils';
import { useState,useEffect } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

const WeatherModal = ({ show, name, hideModal }) => {
  const [isLoading, setIsLoading] = useState(true)
   const [msg, setMsg] = useState('');

  const containerStyle = { backgroundColor: 'white', padding: 20, flex: 1 };

        useEffect(() => {
    const setMessage = async () => {
      if (name === 'prevailing') {
        try {
          const message = await prevailingWeatherMsg();
          setMsg(message);
        } catch (error) {
          console.error('Error getting prevailing weather message:', error);
          setMsg('Unable to load message.');
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const message = await last24HourWeatherMsg();
          setMsg(message);
        } catch (error) {
          console.error('Error getting prevailing weather message:', error);
          setMsg('Unable to load message.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    setMessage();
  }, [name,msg]); // re-run if name or data changes


   const copyToClipboard = () => {
    Clipboard.setString(msg);
  };

  return (
    <>
    {isLoading && <View style={{flex:1,justifyContent:'center'}}><Loader /></View> }
    {!isLoading &&
      <PaperProvider>
      <Portal>
        <Modal
          visible={show}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={{flex:1}}>
            <View style={{flex:0.9}}>
              <Text>{msg}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center', gap:10}}>
              <Button
                icon="clipboard"
                mode="contained"
                onPress={()=>copyToClipboard()}
              >
                Copy
              </Button>
              <Button
              style={{backgroundColor:'tomato'}}
                icon="close"
                mode="contained"
                onPress={() => hideModal()}
              >
                Close
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </PaperProvider>
    }
    
    </>
  );
};

export default WeatherModal;
