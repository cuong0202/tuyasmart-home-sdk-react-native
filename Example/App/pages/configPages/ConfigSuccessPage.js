import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
// import NavigationBar from "../../common/NavigationBar";
// import ButtonX from "../../standard/components/buttonX";

export default class ConfigSuccessPage extends Component {
  constructor(props) {
    super(props)
    console.warn('--->')
  }

  render() {
    return <View style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  tips: {
    fontSize: 29,
  },
})
