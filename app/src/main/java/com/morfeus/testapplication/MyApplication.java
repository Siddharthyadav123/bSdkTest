package com.morfeus.testapplication;

import android.app.Application;
import android.app.Service;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.support.multidex.MultiDex;
import android.util.Log;

import com.facebook.stetho.Stetho;
import com.morfeus.android.mfsdk.push.NotificationServiceHelper;
import com.morfeus.android.mfsdk.push.model.PushModel;

public class MyApplication extends Application {

    private static final String TAG = MyApplication.class.getSimpleName();

    private NotificationServiceConnection mNotificationServiceConnection
            = new NotificationServiceConnection();

    private boolean mIsBound;

    private NotificationServiceHelper mNotificationService;

    private final NotificationServiceHelper.NotificationListener mNotificationListener
            = new NotificationServiceHelper.NotificationListener() {
        @Override
        public void onMessageReceived(PushModel pushModel) {
            Log.d(TAG, "onMessageReceived: " + pushModel.toString());
        }
    };

    @Override
    public void onCreate() {
        super.onCreate();
        Stetho.initializeWithDefaults(this);

        MyMfSdk.createInstance(getApplicationContext());

        startService(new Intent(getApplicationContext(), NotificationServiceHelper.class));
        mIsBound = bindService(new Intent(getApplicationContext(), NotificationServiceHelper.class),
                mNotificationServiceConnection,
                Service.BIND_AUTO_CREATE);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public void onTerminate() {
        unbindService(mNotificationServiceConnection);
        mIsBound = false;
        super.onTerminate();
    }

    private class NotificationServiceConnection implements ServiceConnection {

        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            mNotificationService = ((NotificationServiceHelper.ServiceBinder) iBinder).getService();
            mNotificationService.register(mNotificationListener);
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            mNotificationService.unregister(mNotificationListener);
        }
    }
}
