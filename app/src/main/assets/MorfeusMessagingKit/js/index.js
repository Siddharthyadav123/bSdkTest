/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//var app = {
//    // Application Constructor
//    initialize: function() {
//        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//    },
//
//    // deviceready Event Handler
//    //
//    // Bind any cordova events here. Common events are:
//    // 'pause', 'resume', etc.
//    onDeviceReady: function() {
//        this.receivedEvent('deviceready');
//    },
//
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        // websdk.initialize({
////             "botId": "5w47394784104",
////             "botName": "hdfc",
////             "version": "1.0",
////             "apiKey": "1234567",
////             "domain": "http://localhost",
////             "initAndShow": "1",
////             "showInWebview": "1",
////             "customerId": "28934789",
//// 
////             "desktop": {
////                 "chatWindowHeight": "80vh",
////                 "chatWindowWidth": "400px",
////                 "chatWindowRight": "20px",
////                 "chatWindowBottom": "100px"
////             },
//// 
////             "mobile": {
////                 "chatWindowHeight": "100%",
////                 "chatWindowWidth": "100%"
////             },
//// 
////             "adminMode": false,
////             "endpointUrl": "https://morfeus-dev.active.ai/morfeus/v1/channels/",
////             "emoji": {
////                 "icons": {
////                     ':downvote:': '-1.png',
////                     ':upvote:': '+1.png'
////                 }
////             }
//// 
////         });
// //document.querySelector(".loading").style.display = "initial";
//
////     console.log(5 + 6);
////     var customerId =  "";
////     var appSessionToken =  "";
////     var initAndShow =  "1";
////     var showInWebview = "1";
////     var endpointUrl = "https://morfeus-dev.active.ai/morfeus/v1/channels";
////     console.log(5 + 6);
////     
////     var initParam = {
////         "initAndShow": initAndShow,
////         "showInWebview": showInWebview,
////         "endpointUrl": endpointUrl,
////         "botId":"11w95923688519"
////     }
//// 
//// websdk.initialize(initParam);
//    }
//};
//
//app.initialize();
//
//

$(function() {
    console.log(5 + 6);
    var customerId = "";
    var appSessionToken = "";
    var initAndShow = "1";
    var showInWebview = "1";
     var endpointUrl = "https://morfeus-dev.active.ai/morfeus/v1/channels";
//    var endpointUrl = "https://bada4bc7.ngrok.io/morfeus/v1/channels";

    var initParam = {
        "initAndShow": initAndShow,
        "showInWebview": showInWebview,
        "endpointUrl": endpointUrl,
        "botId": "11w95923688519",
        "domain": "http://localhost"
    }

    websdk.initialize(initParam);
});
