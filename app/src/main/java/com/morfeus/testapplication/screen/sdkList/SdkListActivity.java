package com.morfeus.testapplication.screen.sdkList;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.morfeus.android.mfsdk.MfSdk;
import com.morfeus.testapplication.MyMfSdk;
import com.morfeus.testapplication.R;
import com.morfeus.testapplication.screen.hybridSdk.HybridWebSDKActivity;
import com.morfeus.testapplication.screen.webSdk.WebSdkActivity;

/**
 * This class responsible for view available sdk types
 */

public class SdkListActivity extends AppCompatActivity implements View.OnClickListener {

    private Button mWebSdkbtn;
    private Button mHybridBtn;
    private Button mNativeBtn;
    private ImageView mBackImageView;
    private String mLanguage = "en-US";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mLanguage = getIntent().getStringExtra("lang");
        setContentView(R.layout.activity_sdk_list);
        initViews();
        setLisnter();
    }

    private void setLisnter() {
        mHybridBtn.setOnClickListener(this);
        mNativeBtn.setOnClickListener(this);
        mWebSdkbtn.setOnClickListener(this);
        mBackImageView.setOnClickListener(this);
    }

    private void initViews() {
        mHybridBtn = (Button) findViewById(R.id.btn_hybrid);
        mNativeBtn = (Button) findViewById(R.id.btn_native);
        mWebSdkbtn = (Button) findViewById(R.id.btn_web_sdk);
        mBackImageView = (ImageView) findViewById(R.id.back_btn_img);
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
            case R.id.back_btn_img:
                onBackPressed();
                break;
        }
    }

    private void callHybridSDkForInit() {
        Intent intent = new Intent(SdkListActivity.this, HybridWebSDKActivity.class);
        startActivity(intent);
    }

    private void callWebSDKForInit() {
        Intent intent = new Intent(SdkListActivity.this, WebSdkActivity.class);
        startActivity(intent);
    }

    /**
     * method to initialize native sdk
     */
    private void callNativeSdkForInit() {
        MyMfSdk myMfSdk = MyMfSdk.getInstance();
        MfSdk mfSdk = myMfSdk.getMfSdk();
        mfSdk.showConversation(this, mLanguage);
    }
}
