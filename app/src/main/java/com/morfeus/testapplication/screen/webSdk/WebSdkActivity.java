package com.morfeus.testapplication.screen.webSdk;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;

import com.morfeus.testapplication.R;

/**
 * This class is responsible to load web sdk in webview
 */

public class WebSdkActivity extends AppCompatActivity implements View.OnClickListener {


    private WebView mWebSDKWebView;
    private ImageView mBackImgView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_sdk);
        intiViews();
        setListner();
        loadUrlToWebView(getString(R.string.web_sdk_load_url));
    }


    private void loadUrlToWebView(String urlToLoadWebView) {
        try {
            mWebSDKWebView.loadUrl(urlToLoadWebView);
            mWebSDKWebView.clearCache(true);
            mWebSDKWebView.clearHistory();
            mWebSDKWebView.setWebViewClient(new WebViewClient());
            mWebSDKWebView.getSettings().setJavaScriptEnabled(true);
            mWebSDKWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void setListner() {
        mBackImgView.setOnClickListener(this);
    }

    private void intiViews() {
        mWebSDKWebView = (WebView) findViewById(R.id.web_sdk_web_view);
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
