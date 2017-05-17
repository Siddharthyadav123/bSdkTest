(function(window) {

    var sdkOptions = window.options;

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
            "deviceId": 990000862471854,
            "pushToken": "1",
            "deviceBrand": "Apple",
            "deviceModel": "iPhone 7",
            "applicationId": 928374927349,
            "sdkType": "W",
            "sdkVersion": sdkOptions.version,
            "osVersion": "10.2",
            "os": "iOS"
        }
        callService(url, data);
    };

    window.chat = function(chatText) {
        var pathParams = [];
        pathParams.push(sdkOptions.botId);
        pathParams.push("message");

        var url = prepareUrl(pathParams, null);
        // "771302319043149"
        var data = {
            "userId": window["userId"] || "",
            "botId": sdkOptions.botId,
            "messageContent": chatText,
            "messageId": 969478759462780,
            "messageType": "text",
            "mediaProvider": "nuance",
            "customerId": sdkOptions.customerId,
            "deviceId": 990000862471854,
            "pushToken": "1",
            "deviceBrand": "Apple",
            "deviceModel": "iPhone 7",
            "applicationId": 928374927349,
            "sdkType": "W",
            "sdkVersion": sdkOptions.version,
            "osVersion": "10.2",
            "os": "iOS"
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
            "customerId": sdkOptions.customerId,
            "deviceId": 990000862471854,
            "pushToken": "1",
            "deviceBrand": "Apple",
            "deviceModel": "iPhone 7",
            "applicationId": 928374927349,
            "sdkType": "W",
            "sdkVersion": sdkOptions.version,
            "osVersion": "10.2",
            "os": "iOS"
        }
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

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data),
            success: function(resp) {
                hideLoader();
                processResponse(resp);
            },
            error: function(err) {
                hideLoader();
                console.log(err);
            }
        });

    }

    window.callApi = function(elem) {

        var value = $(elem).data("value");
        var type = $(elem).data("type");

        if (type == "web_url") {
            window.parent.open(value.url);
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
        for (var i = 0; i < respCount; i++) {

            window["userId"] = resp[i].to;
            updateChatStatus();
            var messageType = resp[i].message.type;


            switch (messageType) {
                case "custom":
                    var payload = {};
                    payload.data = resp[i].message.card.content;
                    payload.randId = Math.floor(Math.random() * 90000) + 10000;
                    insertCards(payload);
                    break;

                case "text":
                    var chatText = resp[i].message.text;
                    insertBotBubble(chatText);
                    break;

                case "list":

                    var data = {
                        "type": "custom",
                        "card": {
                            "templateType": "ListCardTemplate",
                            "element_style": "large",
                            "content": [
                                {
                                    "element": {
                                        "title": {
                                            "type": "label",
                                            "text": "Current Account",
                                            "action": "",
                                            "payload": "",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "subtitle": {
                                            "type": "label",
                                            "text": "debit",
                                            "action": "",
                                            "payload": "",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "image": {
                                            "type": "image",
                                            "imagetype": "png",
                                            "imagename": "debitcard01",
                                            "imageulr": "http://google.com"
                                        },
                                        "buttons": [{
                                                "type": "button",
                                                "text": "Shop Now",
                                                "action": "BuyMessage",
                                                "payload": "Last TRansaction - XXXX-9876",
                                                "style": {
                                                    "textcolor": "FFFFFF"
                                                }
							}
						]
                                    }
				}, {
                                    "element": {
                                        "title": {
                                            "type": "label",
                                            "text": "Bull Market Continues to Rally",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "subtitle": {
                                            "type": "label",
                                            "text": "The markets react positively to ",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "description": {
                                            "type": "label",
                                            "text": "peterssendreceiveapp.ngrok.io",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "image": {
                                            "type": "image",
                                            "imagetype": "png",
                                            "imagename": "debitcard01",
                                            "imageulr": "http://google.com"
                                        }
                                    }
				}, {
                                    "element": {
                                        "title": {
                                            "type": "label",
                                            "text": "Saving Account",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "subtitle": {
                                            "type": "label",
                                            "text": "credited",
                                            "style": {
                                                "textcolor": "FFFFFF",
                                                "textsize": ""
                                            }
                                        },
                                        "image": {
                                            "type": "image",
                                            "imagetype": "png",
                                            "imagename": "debitcard01",
                                            "imageulr": "http://google.com"
                                        },
                                        "buttons": [{
                                                "type": "button",
                                                "text": "Buy",
                                                "action": "BuyMessage",
                                                "payload": "Last TRansaction - XXXX-9876",
                                                "style": {
                                                    "textcolor": "FFFFFF"
                                                }
							}
						]
                                    }
				}, {
                                    "element": {
                                        "rowButton": "true",
                                        "buttons": [{
                                                "type": "button",
                                                "text": "View more",
                                                "action": "moreMessage",
                                                "payload": "Last TRansaction - XXXX-9876",
                                                "style": {
                                                    "textcolor": "FFFFFF"
                                                }
							}
						]
                                    }
				}
			]
                        }
                    }


                    var payload = data.payload;
                    insertList(payload);

                    break;
            }



        }
    }


})(window);
