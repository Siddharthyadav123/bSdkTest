package com.morfeus.testapplication;

import android.os.Build;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import com.morfeus.android.mfsdk.MfSdk;

public class AxisLoginActivity extends AppCompatActivity {
    private static final String TAG = AxisLoginActivity.class.getSimpleName();
    private String mLanguage = "en-US";

    private TextView mLoginBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_axis_login);
        setStatusBarColor();

        mLoginBtn = (TextView) findViewById(R.id.tv_login);
        mLoginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openChatActivity();
            }
        });
    }

    private void setStatusBarColor() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.axisThemeColor));
        }
    }

    private void openChatActivity() {
        MyMfSdk myMfSdk = MyMfSdk.getInstance();
        MfSdk mfSdk = myMfSdk.getMfSdk();
        mfSdk.showConversation(this, mLanguage);
    }
}
