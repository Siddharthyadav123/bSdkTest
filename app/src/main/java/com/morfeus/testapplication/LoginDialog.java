package com.morfeus.testapplication;


import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;

import com.morfeus.android.mfsdk.MfSdk;
import com.morfeus.testapplication.screen.hybridSdk.HybridWebSDKActivity;
import com.morfeus.testapplication.screen.webSdk.WebSdkActivity;

public class LoginDialog extends Dialog implements View.OnClickListener {
    private static final String TAG = Dialog.class.getSimpleName();
    private Button mWebSdkbtn;
    private Button mHybridBtn;
    private Button mNativeBtn;

    private String mLanguage = "en-US";

    public LoginDialog(Context context) {
        super(context);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.login_dialog);
        initView();
        registerEvents();
    }

    private void initView() {
        mWebSdkbtn = (Button) findViewById(R.id.btn_web_sdk);
        mHybridBtn = (Button) findViewById(R.id.btn_hybrid);
        mNativeBtn = (Button) findViewById(R.id.btn_native);
    }

    private void registerEvents() {
        mHybridBtn.setOnClickListener(this);
        mNativeBtn.setOnClickListener(this);
        mWebSdkbtn.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        switch (id) {
            case R.id.btn_hybrid:
                callHybridSDkForInit();
                break;
            case R.id.btn_native:
                callNativeSdkForInit();
                break;
            case R.id.btn_web_sdk:
                callWebSDKForInit();
                break;
        }
        dismiss();
    }

    private void callHybridSDkForInit() {
        Intent intent = new Intent(getContext(), HybridWebSDKActivity.class);
        getContext().startActivity(intent);
    }

    private void callWebSDKForInit() {
        Intent intent = new Intent(getContext(), WebSdkActivity.class);
        getContext().startActivity(intent);
    }

    /**
     * method to initialize native sdk
     */
    private void callNativeSdkForInit() {
        MyMfSdk myMfSdk = MyMfSdk.getInstance();
        MfSdk mfSdk = myMfSdk.getMfSdk();
        mfSdk.showConversation(getContext(), mLanguage);
    }
}
