package com.morfeus.testapplication;

import android.content.Context;
import android.util.Log;

import com.morfeus.android.mfsdk.MFSDKProperties;
import com.morfeus.android.mfsdk.MfSdk;
import com.morfeus.android.mfsdk.MfSdkInitializationException;
import com.morfeus.android.mfsdk.MfSdkKit;

import java.util.HashMap;

/**
 * Helper class to provide instance of MfSdk
 */
public class MyMfSdk {

    private static final String TAG = MyMfSdk.class.getSimpleName();

    private static MyMfSdk sInstance;

    private MfSdk mMfSdk;

    // TEST
    private MyMfSdk(Context ctx) {
        try {
            HashMap<String, String> mapBotId = new HashMap<String, String>();
            // botId = 5w47394784104
            mapBotId.put("botId", "162a11060497176");
            MFSDKProperties properties = new MFSDKProperties(
                    mapBotId, "", 1, "", "", "", true, true);

            String appSessionToken = "2312312";
            String customerId = "50263281";

            mMfSdk = new MfSdkKit.Builder(ctx, appSessionToken)
                    .setSdkProperties(properties)
                    .setCustomerId(customerId)
                    .build();
            mMfSdk.initWithAppSessionToken();
        } catch (MfSdkInitializationException e) {
            Log.e(TAG, "onCreate: ", e);
        }
    }

    public static MyMfSdk createInstance(Context ctx) {
        if (sInstance == null)
            sInstance = new MyMfSdk(ctx);
        return sInstance;
    }

    public static MyMfSdk getInstance() {
        return sInstance;
    }

    public MfSdk getMfSdk() {
        return mMfSdk;
    }
}
