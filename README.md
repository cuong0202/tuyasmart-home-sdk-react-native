# react-native-tuya-rn-sdk
## Getting started
`$ npm install react-native-tuya-rn-sdk --save`

Mostly automatic installation
`$ react-native link react-native-tuya-rn-sdk`

## Manual installation
### iOS
no need link

### Android
1. Open up `android/app/src/main/java/[...]/MainActivity.java`

  Add `import com.reactlibrary.RNTuyaRnSdkPackage`; to the imports at the top of the file

 Add new RNTuyaRnSdkPackage() to the list returned by the getPackages() method
 
2. Append the following lines to android/settings.gradle:

```
include ':react-native-tuya-rn-sdk'
project(':react-native-tuya-rn-sdk').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-tuya-rn-sdk/android')
```

3. Insert the following lines inside the dependencies block in android/app/

```
build.gradle:
  compile project(':react-native-tuya-rn-sdk')
  
