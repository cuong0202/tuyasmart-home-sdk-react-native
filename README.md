# tuyasmart-home-sdk-react-native
## Getting started
`$ npm install tuyasmart-home-sdk-react-native --save`

Mostly automatic installation

`$ react-native link tuyasmart-home-sdk-react-native`

## Manual installation
### iOS
no need link

### Android
1. Open up `android/app/src/main/java/[...]/MainActivity.java`

  Add `import com.reactlibrary.RNTuyaRnSdkPackage`; to the imports at the top of the file

 Add new RNTuyaRnSdkPackage() to the list returned by the getPackages() method
 
2. Append the following lines to android/settings.gradle:

```
include ':tuyasmart-home-sdk-react-native'
project(':tuyasmart-home-sdk-react-native').projectDir = new File(rootProject.projectDir, 	'../node_modules/tuyasmart-home-sdk-react-native/android')
```

3. Insert the following lines inside the dependencies block in android/app/

```
build.gradle:
  compile project(':tuyasmart-home-sdk-react-native')
  
