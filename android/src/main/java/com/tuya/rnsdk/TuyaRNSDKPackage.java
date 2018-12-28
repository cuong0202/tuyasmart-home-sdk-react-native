
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
        List module =  new ArrayList<NativeModule>();
        module.add(new TuyaActivatorModule(reactContext));
        module.add(new TuyaCoreModule(reactContext));
        module.add(new TuyaDeviceModule(reactContext));
        module.add(new TuyaGatewayModule(reactContext));
        module.add(new TuyaOTAModule(reactContext));
        module.add(new TuyaSingleTransferModule(reactContext));
        module.add(new TuyaFeedBackModule(reactContext));
        module.add(new TuyaGroupModule(reactContext));
        module.add(new TuyaHomeDataManagerModule(reactContext));
        module.add(new TuyaHomeManagerModule(reactContext));
        module.add(new TuyaHomeModule(reactContext));
        module.add(new TuyaRoomModule(reactContext));
        module.add(new TuyaMessageModule(reactContext));
        module.add(new TuyaPushModule(reactContext));
        module.add(new TuyaShareModule(reactContext));
        module.add(new TuyaTimerModule(reactContext));
        module.add(new TuyaUserModule(reactContext));
        module.add(new TuyaSceneModule(reactContext));
        return module;
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