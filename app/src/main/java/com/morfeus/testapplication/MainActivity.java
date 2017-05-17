package com.morfeus.testapplication;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.morfeus.testapplication.screen.sdkList.SdkListActivity;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();
    boolean isNeedHelpChildOpen = false;
    private TextView mLoginBtn;
    private TextView mLoginThailandBtn;
    private RelativeLayout mRlNeedHelp;
    private LinearLayout mRLNeedHelpChild;
    private ImageView mIvNeedHelpArrow;
    private ImageView mIvActionBarLogin;

    private String mLanguage = "en-US";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mLoginBtn = (TextView) findViewById(R.id.tv_login_btn);
        mRlNeedHelp = (RelativeLayout) findViewById(R.id.rl_need_help);
        mRLNeedHelpChild = (LinearLayout) findViewById(R.id.ll_contact_number_and_city_name);
        mIvNeedHelpArrow = (ImageView) findViewById(R.id.iv_arrow);
        mIvActionBarLogin = (ImageView) findViewById(R.id.iv_login);
        mLoginThailandBtn = (TextView) findViewById(R.id.tv_login_thailand_btn);

        mIvActionBarLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                openLoginDialog();
            }
        });

        mLoginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mLanguage = "en-US";
                openSdkListScreen();
            }
        });

        mLoginThailandBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mLanguage = "th-TH";
                openSdkListScreen();
            }
        });

        mRlNeedHelp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (isNeedHelpChildOpen) {
                    isNeedHelpChildOpen = false;
                    mRLNeedHelpChild.setVisibility(View.GONE);
                    mIvNeedHelpArrow.setRotation(0f);
                } else {
                    isNeedHelpChildOpen = true;
                    mRLNeedHelpChild.setVisibility(View.VISIBLE);
                    mIvNeedHelpArrow.setRotation(180f);
                }
            }
        });

    }

    private void openLoginDialog() {
        LoginDialog loginDialog = new LoginDialog(this);
        loginDialog.show();
    }

    private void openSdkListScreen() {
        Intent intent = new Intent(MainActivity.this, SdkListActivity.class);
        intent.putExtra("lang", mLanguage);
        startActivity(intent);
    }

//    private void initMfSdk() throws MfSdkInitializationException {
//        HashMap<String, String> mapBotId = new HashMap<String, String>();
//        // botId = 5w47394784104
//        mapBotId.put("botId", "11a80171753554");
//        MFSDKProperties properties = new MFSDKProperties(
//                mapBotId, "", 1, "", "", "", true);
//
//        String appSessionToken = "2312312";
//        String customerId = "50263281";
//
//        MfSdk mfSdk = new MfSdkKit.Builder(this, appSessionToken)
//                .setSdkProperties(properties)
//                .setCustomerId(customerId)
//                .build();
//
//        mfSdk.initWithAppSessionToken();
//        mfSdk.showConversation();
//    }

//    @SuppressWarnings("unchecked")
//    private void requestJSP() {
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss a");
//        String date = dateFormat.format(new Date());
//
//        HashMap<String, String> mapHeader = new HashMap<>();
//        mapHeader.put("Content-Type", "application/json; charset=utf8");
//        mapHeader.put("apiKey", "AIzaSyC63xPvwrpt03OHP3THYmR9IxF_cyE-YqA");
//        Log.i(TAG, "Time stamp - > " + String.valueOf(new Date().getTime()));
//        GenericRequest request = new GenericRequest(Request.Method.POST,
//                "https://hdfc-sit.active.ai/morfeusapi/initSession",
//                "{\"customerId\": \"50263281\", \"appSessionToken\": \"2312312\" ,\"timeStamp\": \"" + date + "\" }",
//                new Response.Listener() {
//                    @Override
//                    public void onResponse(Object response) {
//                        Log.d(TAG, "onResponse: response.toString()");
//                        try {
//                            initMfSdk();
//                        } catch (MfSdkInitializationException e) {
//                            e.printStackTrace();
//                        }
//                    }
//                },
//                new Response.ErrorListener() {
//                    @Override
//                    public void onErrorResponse(VolleyError error) {
//                        Log.d(TAG, "onErrorResponse: " + error.toString());
//                    }
//                },
//                mapHeader
//        );
//        RequestQueue requestQueue = Volley.newRequestQueue(this);
//        requestQueue.add(request);
//    }

}
