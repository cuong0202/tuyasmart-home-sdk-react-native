
package com.tuya.rnsdk;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
import com.tuya.smart.rnsdk.activator.TuyaActivatorModule;
import com.tuya.smart.rnsdk.core.TuyaCoreModule;
import com.tuya.smart.rnsdk.device.TuyaDeviceModule;
import com.tuya.smart.rnsdk.device.TuyaGatewayModule;
import com.tuya.smart.rnsdk.device.TuyaOTAModule;
import com.tuya.smart.rnsdk.device.TuyaSingleTransferModule;
import com.tuya.smart.rnsdk.feedback.TuyaFeedBackModule;
import com.tuya.smart.rnsdk.group.TuyaGroupModule;
import com.tuya.smart.rnsdk.home.TuyaHomeDataManagerModule;
import com.tuya.smart.rnsdk.home.TuyaHomeManagerModule;
import com.tuya.smart.rnsdk.home.TuyaHomeModule;
import com.tuya.smart.rnsdk.home.TuyaRoomModule;
import com.tuya.smart.rnsdk.message.TuyaMessageModule;
import com.tuya.smart.rnsdk.push.TuyaPushModule;
import com.tuya.smart.rnsdk.scene.TuyaSceneModule;
import com.tuya.smart.rnsdk.share.TuyaShareModule;
import com.tuya.smart.rnsdk.timer.TuyaTimerModule;
import com.tuya.smart.rnsdk.user.TuyaUserModule;

public class TuyaRNSDKPackage implements ReactPackage {
  @Override
  @SuppressWarnings("unchecked")
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List modules = new ArrayList<NativeModule>();
    modules.add(new TuyaActivatorModule(reactContext));
    modules.add(new TuyaCoreModule(reactContext));
    modules.add(new TuyaDeviceModule(reactContext));
    modules.add(new TuyaGatewayModule(reactContext));
    modules.add(new TuyaOTAModule(reactContext));
    modules.add(new TuyaSingleTransferModule(reactContext));
    modules.add(new TuyaFeedBackModule(reactContext));
    modules.add(new TuyaGroupModule(reactContext));
    modules.add(new TuyaHomeDataManagerModule(reactContext));
    modules.add(new TuyaHomeManagerModule(reactContext));
    modules.add(new TuyaHomeModule(reactContext));
    modules.add(new TuyaRoomModule(reactContext));
    modules.add(new TuyaMessageModule(reactContext));
    modules.add(new TuyaPushModule(reactContext));
    modules.add(new TuyaShareModule(reactContext));
    modules.add(new TuyaTimerModule(reactContext));
    modules.add(new TuyaUserModule(reactContext));
    modules.add(new TuyaSceneModule(reactContext));
    return modules;
  }

  // Deprecated from RN 0.47
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}