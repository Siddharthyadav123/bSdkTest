(function(window) {

    var sdkOptions = window.options;
    sdkOptions["device"] = new MobileDetect(window.navigator.userAgent);


    var deviceBrand = (sdkOptions.device.os() == "iOS") ? "Apple" : sdkOptions.device.os
    var deviceModel = sdkOptions.device.mobile();
    var osVersion = (sdkOptions.device.os() == "iOS") ? sdkOptions.device.version('iOS') : sdkOptions.device.version('Android')
    var os = (sdkOptions.device.os() == "AndroidOS") ? "Android" : sdkOptions.device.os();


    window.init = function() {
        var pathParams = [];
        pathParams.push(sdkOptions.botId);
        pathParams.push("init");

        var url = prepareUrl(pathParams, null);
        var data = {
            "userId": window["userId"] || "",
            "botId": sdkOptions.botId,
            "messageContent": "Hi",
            "messageId": 969478759462780,
            "messageType": "text",
            "mediaProvider": "nuance",
            "customerId": sdkOptions.customerId,
            "appSessionToken": sdkOptions.appSessionToken,
            "deviceId": 990000862471854,
            "pushToken": "1",
            "deviceBrand": deviceBrand,
            "deviceModel": deviceModel,
            "sdkType": "W",
            "sdkVersion": sdkOptions.version,
            "osVersion": osVersion,
            "os": os
        }
        callService(url, data);
    };

    window.chat = function(chatText) {
        var pathParams = [];
        pathParams.push(sdkOptions.botId);
        pathParams.push("message");

        var url = prepareUrl(pathParams, null);

        var data = {
            "userId": window["userId"] || "",
            "botId": sdkOptions.botId,
            "messageContent": chatText,
            "messageId": 969478759462780,
            "messageType": "text",
            "mediaProvider": "nuance",
            "deviceId": 990000862471854,
            "pushToken": "1",
            "deviceBrand": deviceBrand,
            "deviceModel": deviceModel,
            "sdkType": "W",
            "sdkVersion": sdkOptions.version,
            "osVersion": osVersion,
            "os": os
        }
        callService(url, data);
    }

    window.postback = function(value) {
        var pathParams = [];
        pathParams.push(sdkOptions.botId);
        pathParams.push("message");


        console.log(typeof value)

        var url = prepareUrl(pathParams, null);
        var data = {
            "userId": window["userId"] || "",
            "botId": sdkOptions.botId,
            "messageContent": JSON.parse(value),
            "messageId": 969478759462780,
            "messageType": "postback",
            "mediaProvider": "nuance",
            "deviceId": 990000862471854,
            "pushToken": "1",
            "deviceBrand": deviceBrand,
            "deviceModel": deviceModel,
            "sdkType": "W",
            "sdkVersion": sdkOptions.version,
            "osVersion": osVersion,
            "os": os
        }
        callService(url, data);
    }

    window.login = function(options) {
        var url = sdkOptions.endpointUrl.replace("channels", "login");
        var data = options;
        callService(url, data);

    }


    function prepareUrl(pathParams, queryParams) {

        var baseUrl = sdkOptions.endpointUrl;
        var url = [];
        pathParam = pathParams.join("/");
        url.push(baseUrl, pathParam);
        preparedUrl = url.join("/");

        if (queryParams) {
            var v = "";
            preparedUrl += "?";
            for (var k in queryParams) {
                v = queryParams[k];
                preparedUrl = preparedUrl + k + "=" + v;
            }
        }

        return preparedUrl;
    }

    function callService(url, data) {

        if (navigator.onLine) {
            console.log('online');
            var headers = {
                'Content-Type': 'application/json',
            };
            if (url != "initLogin") {
                xsrfToken = sdkOptions['X-CSRF-TOKEN'];
                headers['X-XSRF-TOKEN'] = xsrfToken;
            }
            $.ajax({
                url: url,
                type: 'POST',
                timeout: 25000,
                headers: headers,
                data: JSON.stringify(data),
                success: function(resp, textStatus, request) {

                    if (url.indexOf('initLogin') != -1) {
                        sdkOptions['X-CSRF-TOKEN'] = request.getResponseHeader('X-CSRF-Token');
                    } else if (url.indexOf('login') != -1) {
                        $('#myModal').modal('hide');
                    }

                    hideLoader();
                    processResponse(resp);

                },
                error: function(err) {
                    hideLoader();
                    console.log(err);
                    $("#typingAnimation").remove();
                    insertBotBubble("I'm experiencing some difficulty in processing. Could you please try again?");
                }
            });
        } else {
            console.log('offline');
            $("#typingAnimation").remove();
            insertBotBubble("I'm experiencing some difficulty in processing. Could you please try again?");
        }
    }

    window.callApi = function(elem) {

        var value = $(elem).data("value");
        var type = $(elem).data("type");
        type = type.trim();


        if (type == "authenticateWithLogin") {

            $('#myModal').modal({ "show": true });
            var token = value;

            $("#login").click(function() {

                var username = $("#username").val();
                var password = $("#password").val();

                $(".loading-effect").show();
                $(".loginmodal-container").css("background-color", "#bbb");
                $("body").css("background-color", "#bbb");


                if (username && password) {
                    var options = {
                        username: username,
                        password: password,
                        token: token
                    }
                    login(options);
                } else {
                    if (!username) {
                        // showErrorMessage("Please enter the username");
                        alert("Please enter the username")
                    } else if (!password) {
                        // showErrorMessage("Please enter the password");
                        alert("Please enter the password");
                    }
                }

            });

        } else if (type == "web_url" || type == "showInfo") {
            window.parent.open(value);
        } else if (type == "postback") {

            var isShowLoader = $(elem).data("loader") || "y";
            if (isShowLoader != "n") {
                $(elem).attr("disabled", "true").addClass("btn-disabled");
                showLoader(elem);
            }

            value = JSON.stringify(JSON.parse(value));

            postback(value);
        }

    }


    function processResponse(respMessage) {
        console.log("resp : ");
        console.log(respMessage)

        var resp = respMessage.messages;
        var respCount = (resp) ? resp.length : 0;
        $("#typingAnimation").remove();

        for (var i = 0; i < respCount; i++) {

            window["userId"] = resp[i].to;
            updateChatStatus();
            var messageType = resp[i].message.type;


            switch (messageType) {
                case "custom":

                    var templateType = resp[i].message.card.templateType;

                    switch (templateType) {

                        case "InfoCardTemplate":

                            /*var title = resp[i].message.card.content[0].element.title.text;
                            var subtitle = resp[i].message.card.content[0].element.subtitle.text;

                            var message = {
                                "text": title,
                                "subText": subtitle,
                                "quickText": "Block my Debit Card(s)"
                            }

                            insertWelcomeMessage(message);*/
                            var payload = {};
                            payload.data = resp[i].message.card.content;
                            payload.randId = Math.floor(Math.random() * 90000) + 10000;
                            insertCards(payload);
                            break;

                        case "ListCardTemplate":
                            var listData = [];

                            elementStyle = resp[i].message.card.elementStyle;
                            data = resp[i].message.card.content;


                            for (var j = 0; j < data.length; j++) {

                                if (elementStyle == "caption" && j == 0) {

                                    var title = (data[j].element.title) ? data[j].element.title.text : "";
                                    var subtitle = (data[j].element.subtitle) ? data[j].element.subtitle.text : "";

                                    var rowcaption = {
                                        "type": "rowcaption",
                                        "title": title,
                                        "subtitle": subtitle
                                    }

                                    listData.push(rowcaption);

                                } else {

                                    var isRowbutton = (data[j].element.rowButton == true) ? true : false;

                                    if (isRowbutton) {

                                        if (data[j].element.buttons) {
                                            var rowbutton = {
                                                "type": "rowbutton",
                                                "buttons": data[j].element.buttons,
                                            };

                                            listData.push(rowbutton);
                                        }


                                    } else {

                                        var isImage = (data[j].element.image && data[j].element.image.imageUrl) ? true : false;
                                        var isButtons = (data[j].element.buttons && data[j].element.buttons.length > 0) ? true : false;
                                        var title = (data[j].element.title) ? data[j].element.title.text : "";
                                        var subtitle = (data[j].element.subtitle) ? data[j].element.subtitle.text : "";

                                        var row = {
                                            "type": "row",
                                            "title": title,
                                            "subtitle": subtitle
                                        };

                                        if (isImage) {
                                            row["imageurl"] = data[j].element.image.imageUrl;
                                        }

                                        if (isButtons) {
                                            row["buttons"] = data[j].element.buttons;
                                        }

                                        listData.push(row);

                                    }


                                }
                            }

                            insertList(listData);
                            break;

                        default:
                            var payload = {};
                            payload.data = resp[i].message.card.content;
                            payload.randId = Math.floor(Math.random() * 90000) + 10000;
                            insertCards(payload);
                            break;

                    }


                    break;

                case "text":
                    var chatText = resp[i].message.text;
                    insertBotBubble(chatText);
                    break;


            }


        }
    }


})(window);
