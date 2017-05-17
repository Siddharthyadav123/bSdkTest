package com.morfeus.testapplication.screen.hybridSdk;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

import com.morfeus.testapplication.R;

/**
 * This class responsible to load hybrid sdk in webView
 */

public class HybridWebSDKActivity extends AppCompatActivity implements View.OnClickListener {
    private WebView mHybridSDKWebView;
    private ImageView mBackImgView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hybrid_sdk);
        intiViews();
        setListner();
        loadHybridSdk(getString(R.string.loacla_asset_url_for_hybrid_sdk));
    }

    private void loadHybridSdk(String hybridSDKLoacalUrl) {
        mHybridSDKWebView.setWebChromeClient(new WebChromeClient());
        mHybridSDKWebView.setWebViewClient(new WebViewClient());
        mHybridSDKWebView.getSettings().setJavaScriptEnabled(true);
        mHybridSDKWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        mHybridSDKWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        mHybridSDKWebView.loadUrl(hybridSDKLoacalUrl);
        WebView.setWebContentsDebuggingEnabled(true);
    }

    private void setListner() {
        mBackImgView.setOnClickListener(this);
    }

    private void intiViews() {
        mHybridSDKWebView = (WebView) findViewById(R.id.hybrid_sdk_web_view);
        mBackImgView = (ImageView) findViewById(R.id.back_btn_img);
    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        switch (id) {
            case R.id.back_btn_img:
                onBackPressed();
                break;
        }
    }


}
