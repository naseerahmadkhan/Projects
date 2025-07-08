import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper';
import { getCurrentDate } from '../../utils/utils';
import  styles  from '../../styles/styles';

const ReportMenu = ({showModal}) => {
    const today = getCurrentDate();
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2,  }}>
        <Text variant="headlineLarge">Weather Report</Text>
        <Text style={{ textAlign: 'center' }} variant="headlineSmall">
          Pakpattan
        </Text>
        <Text style={{ textAlign: 'center' }} variant="labelSmall">
          {today}
        </Text>
      </View>
      <View style={{ flex: 0.5, flexDirection:'column',gap:15}}>
        <Button
          style={{ width: 250, backgroundColor: 'green', }}
          icon="weather-sunny-alert"
          mode="contained"
          onPress={() => showModal('prevailing')}
        >
          Prevailing Weather
        </Button>

        <Button
          style={{ width: 250 }}
          icon="weather-lightning-rainy"
          mode="contained"
          onPress={() => showModal('last24hours')}
        >
          Last 24 hours Weather
        </Button>

        <Button
          style={{ width: 250, backgroundColor:'orange' }}
          icon="white-balance-sunny"
          mode="contained"
          onPress={() => showModal('combined')}
        >
          Combined Weather Msg
        </Button>
      </View>
    </View>
  )
}

export default ReportMenu