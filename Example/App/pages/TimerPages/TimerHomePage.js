/* eslint-disable */
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
  RefreshControl,
  SwipeableFlatList,
} from 'react-native'
import Toast from 'react-native-easy-toast'
import { TuyaTimerApi } from 'tuyasmart-home-sdk'
import Strings from '../../i18n'
import ButtonX from '../../standard/components/buttonX'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'

const { width } = Dimensions.get('window')
/* eslint-disable global-require */
const Res = {
  // close: require('../res/whitewindowclose.png'),
  // open: require('../res/whitewindowopen.png'),
  addSchedule: require('../../res/images/addSchedule.png'),
}

export default class TimerHomePage extends Component {
  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params
    console.log('---params', params)
    this.state = {
      // data: [],
      isRefreshing: false,
      devId: params.devId,
      // allTimer: [],
      timerList: [],
      // category: '',
      // status: 1,
      devInfo: params.devInfo,
    }
    // this.getDatas();
  }

  componentDidMount() {
    TuyaTimerApi.getAllTimerWithDeviceId({ devId: this.state.devId })
      .then((data) => {
        console.log('--->sdk timer', data)
        const newArrTimerList = []
        if (data) {
          if (data.length > 0) {
            for (let i = 0, j = data.length; i < j; i++) {
              for (let a = 0, b = data[i].timerList.length; a < b; a++) {
                newArrTimerList.push(data[i].timerList[a])
              }
            }
          }
        }
        console.log('----->newArrTimerList', newArrTimerList)
        this.setState({
          timerList: newArrTimerList,
        })
      })
      .catch((err) => {
        console.log('--->err', err)
      })
  }

  getDatas() {
    // const s = this.props.navigation.state.params;
    this.setState({
      isRefreshing: true,
    })
  }

  getParseTime(itme) {
    const d = itme.split(':')
    const h = d[0]
    if (h === '00') {
      return `${'12' + ':'}${d[1]} PM`
    }
    if (parseInt(h) > 12) {
      return `${parseInt(h) - 12}:${d[1]} PM`
    }
    return `${parseInt(h)}:${d[1]} AM`
  }

  getParseTimeArray(itme) {
    const d = itme.split(':')
    let h = d[0]
    if (h == '00') {
      return ['12', d[1], 'PM']
    }
    if (parseInt(h) > 12) {
      h = parseInt(h) - 12
      if (h < 10) {
        h = `0${h}`
      }
      h += ''
      return [h, d[1], 'PM']
    }
    h = parseInt(h)
    if (h < 10) {
      h = `0${h}`
    }
    h += ''
    return [h, d[1], 'AM']
  }

  updateTimerStatus(item, index) {
    // 控制某个定时器的开关
    TuyaTimerApi.updateTimerStatusWithTask({
      taskName: 'timers',
      devId: `${this.state.devId}`,
      timeId: item.timerId,
      isOpen: !item.open,
    }).then((data) => {
      this.state.timerList[index].open = !item.open
      this.setState({
        timerList: this.state.timerList,
      })
    })
  }

  parseTime(time) {
    const d = time.split(':')
    let t = 'AM'
    const m = d[1]
    let h = d[0]
    if (parseInt(d[0]) > 12) {
      t = 'PM'
      h = parseInt(d[0]) - 12
      if (h < 10) {
        h = `0${h}`
      }
    }
    return {
      time: t,
      h,
      m,
    }
  }

  renderWeekDays(item) {
    const weeks = ['S', 'M', 'T', 'W', 'TH', 'F', 'S']
    return (
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {weeks.map((d, index) => <Text style={item.loops[index] == '1' ? styles.select : styles.noraml}>{d}</Text>)}
      </View>
    )
  }

  getOpenStatus(status) {
    if (status === 1) {
      return true
    }
    return false
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: '#F4F4F5', width }}
          leftButton={ViewUtils.getLeftButton(() => {
            this.props.navigation.pop()
          })}
          title="定时"
        />
        <SwipeableFlatList
          data={this.state.timerList}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                // 先屏蔽进入的入口
                console.log('--->onPressitem', item)
                const time = this.getParseTimeArray(item.time)
                this.toAddSchedules(
                  {
                    h: time[0],
                    time: time[2],
                    m: time[1],
                    repeat: item.loops.split(''),
                    timerId: item.timerId,
                  },
                  false,
                  item.category,
                )
              }}
            >
              <View style={styles.item}>
                <Text style={{ color: 'black', fontSize: 16 }}>{item.time}</Text>
                <Switch
                  style={{ marginRight: 20 }}
                  onValueChange={(value) => {
                    console.log('--->value', value)
                    this.updateTimerStatus(item, index)
                  }}
                  value={item.open}
                  thumbColor="white"
                  trackColor="#7DB428"
                  // trackColor="#A09E9B"
                />
              </View>
            </TouchableOpacity>
          )}
          style={{ marginTop: 21 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.getDatas()}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }
          renderQuickActions={({ item }) => this.getQuickActions(item)} // 创建侧滑菜单
          maxSwipeDistance={80} // 可展开（滑动）的距离
          bounceFirstRowOnMount // 进去的时候不展示侧滑效果
        />

        <ButtonX image={Res.addSchedule} style={styles.addSchedule} onPress={() => this.toAddSchedules({}, true, '')} />
        <Toast
          ref="toast"
          style={{ backgroundColor: 'black' }}
          position="bottom"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'white' }}
        />
      </View>
    )
  }

  // 侧滑菜单渲染
  getQuickActions = (item) => {
    const s = this.props.navigation.state.params
    return (
      <View style={styles.quickAContent}>
        <TouchableOpacity
          onPress={() => {
            TuyaTimerApi.removeTimerWithTask({
              taskName: 'timers',
              devId: this.state.devId,
              timeId: item.timerId,
            })
              .then(() => {
                this.refs.toast.show('删除成功了')
                const timeList = this.state.timerList
                const id = item.timerId
                const newArr = []
                for (let i = 0, j = timeList.length; i < j; i++) {
                  if (timeList[i].timerId !== id) {
                    newArr.push(timeList[i])
                  }
                }
                this.setState({
                  timerList: newArr,
                })
              })
              .catch(() => {})
          }}
        >
          <View style={styles.quick}>
            <Text style={styles.delete}>{Strings.delete}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  toAddSchedules(data, isFirst, category) {
    const s = this.props.navigation.state.params
    this.props.navigation.navigate('SchedulePage', {
      devId: `${s.id}`,
      success: () => this.getDatas(),
      data,
      devInfo: this.state.devInfo,
      isFirst,
      category,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  item: {
    height: 80,
    width: width * 0.95,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    marginLeft: 12,
    marginRight: 18,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    color: '#868582',
    fontSize: 18,
  },
  noraml: {
    color: '#C9C8C6',
    fontSize: 10,
    marginRight: 8,
  },
  select: {
    color: '#868582',
    fontSize: 10,
    marginRight: 8,
  },
  addSchedule: {
    position: 'absolute',
    bottom: 39,
  },
  delete: {
    color: '#d8fffa',
  },
  quickAContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  quick: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
