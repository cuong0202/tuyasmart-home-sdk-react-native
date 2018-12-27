using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Tuya.Rn.Sdk.RNTuyaRnSdk
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNTuyaRnSdkModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNTuyaRnSdkModule"/>.
        /// </summary>
        internal RNTuyaRnSdkModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNTuyaRnSdk";
            }
        }
    }
}
