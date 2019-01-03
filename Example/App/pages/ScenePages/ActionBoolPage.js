import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
// import { TuyaUserApi } from 'tuyasmart-home-sdk';
import NavigationBar from '../../common/NavigationBar'
import { resetAction, resetActionWithParams } from '../../navigations/AppNavigator'
import DeviceStorage from '../../utils/DeviceStorage'
import ViewUtils from '../../utils/ViewUtils'

const { width } = Dimensions.get('window')

export default class ActionBoolPage extends Component {
  constructor(props) {
    super(props)

    const params = this.props.navigation.state.params
    console.log('params', params)
    this.state = {
      item: params.item,
      devId: params.devId,
      devName: params.devName,
      isFromScene: params.isFromScene,
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#F8F8F8' }}>
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop()
          })}
          title={this.state.item.name}
        />
        <TouchableOpacity
          onPress={() => {
            DeviceStorage.get('Action')
              .then((data) => {
                console.log('---开', data)
                const arr = []
                if (data !== undefined && data !== null) {
                  for (let i = 0, j = data.length; i < j; i++) {
                    arr.push(data[i])
                  }
                  arr.push({
                    dpId: this.state.item.dpId,
                    value: true,
                    devId: this.state.devId,
                    devName: this.state.devName,
                    dpName: this.state.item.name,
                  })
                  DeviceStorage.save('Action', arr)
                  if (this.state.isFromScene) {
                    this.props.navigation.dispatch(resetActionWithParams('AddScenePage', { item: {}, isEdit: false }))
                  } else {
                    this.props.navigation.dispatch(resetAction('AddAutoPage'))
                  }
                } else {
                  arr.push({
                    dpId: this.state.item.dpId,
                    value: true,
                    devId: this.state.devId,
                    devName: this.state.devName,
                    dpName: this.state.item.name,
                  })
                  DeviceStorage.save('Action', arr)
                  if (this.state.isFromScene) {
                    // this.props.navigation.dispatch(resetAction("AddScenePage"));
                    this.props.navigation.dispatch(resetActionWithParams('AddScenePage', { item: {}, isEdit: false }))
                  } else {
                    this.props.navigation.dispatch(resetAction('AddAutoPage'))
                  }
                }
              })
              .catch((err) => {
                console.log('--->Err', err)
              })
          }}
        >
          <View
            style={{
              width,
              height: 50,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 16, color: 'black', marginLeft: 20 }}>开</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            DeviceStorage.get('Action')
              .then((data) => {
                const arr = []
                if (data !== undefined && data !== null) {
                  for (let i = 0, j = data.length; i < j; i++) {
                    arr.push(data[i])
                  }
                  arr.push({
                    dpId: this.state.item.dpId,
                    value: false,
                    devId: this.state.devId,
                    devName: this.state.devName,
                    dpName: this.state.item.name,
                  })
                  DeviceStorage.save('Action', arr)
                  if (this.state.isFromScene) {
                    // this.props.navigation.dispatch(resetAction("AddScenePage"));
                    this.props.navigation.dispatch(resetActionWithParams('AddScenePage', { item: {}, isEdit: false }))
                  } else {
                    this.props.navigation.dispatch(resetAction('AddAutoPage'))
                  }
                } else {
                  arr.push({
                    dpId: this.state.item.dpId,
                    value: false,
                    devId: this.state.devId,
                    devName: this.state.devName,
                    dpName: this.state.item.name,
                  })
                  DeviceStorage.save('Action', arr)
                  if (this.state.isFromScene) {
                    // this.props.navigation.dispatch(resetAction("AddScenePage"));
                    this.props.navigation.dispatch(resetActionWithParams('AddScenePage', { item: {}, isEdit: false }))
                  } else {
                    this.props.navigation.dispatch(resetAction('AddAutoPage'))
                  }
                }
              })
              .catch((err) => {
                console.log('--->Err', err)
              })
          }}
        >
          <View
            style={{
              width,
              height: 50,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 16, color: 'black', marginLeft: 20 }}>关</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
