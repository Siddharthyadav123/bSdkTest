(function(window, document) {

    window.websdk = window.websdk || (window.websdk = []);
    window.addEventListener("message", receiveMessage, false);


    window.isMobile = function() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }
    }

    var desktop = {
        "chatWindowHeight": "100%",
        "chatWindowWidth": "100%",
        "chatWindowRight": "0",
        "chatWindowBottom": "0"

    };

    websdk.initialize = function(options) {



        options.desktop = desktop;
        // options.botId = "5w47394784104";
        // options.botName = "default";
        options.version = "1.0";
        options.apiKey = "1234567";
        // options.domain = "http://localhost/";

        // window.chatButtonFrame = createChatButton(options);
        // document.body.appendChild(chatButtonFrame);

        window.chatBoxFrame = createChatBox(options);
        document.body.appendChild(chatBoxFrame);

        window.options = options;
        options.baseSdkPath = getSdkBasePath();

        // window.chatButtonWindow = chatButtonFrame.contentWindow;
        // chatButtonWindow.name = "chatButtonWindow";
        // chatButtonWindow.options = options;


        window.chatBoxWindow = chatBoxFrame.contentWindow;
        chatBoxWindow.name = "chatBoxWindow";
        chatBoxWindow.options = options;

        document.querySelector(".loading").style.display = "none";

        if (window.options.initAndShow == "1") {
            setTimeout(function() {
                // chatButtonFrame.style.display = "none";
                chatBoxFrame.style.display = "block";
            }, 100);
        }



    };

    function receiveMessage(event) {

        var data = event.data || { "type": "" }
        var type = data.type;
        var domain = (window.options && window.options.domain) ? window.options.domain : "";

        if (event.origin == domain) {

            switch (type) {
                case "showChatBox":
                    chatBoxFrame.style.display = "block";
                    break;

                case "hideChatBox":
                    chatBoxFrame.style.display = "none";
                    break;

                case "chatButtonClosedState":
                    // console.log(chatButtonWindow)
                    break;

                default:
                    console.log("invalid message received from iframe");
                    break;
            }

        }

    }


    function getSdkBasePath() {
        var sdkBasePath = document.getElementById("webSdk").src.replace("sdk.js", "");
        return sdkBasePath;
    }

    function createChatButton() {
        var chatButtonFrame = document.createElement('iframe');
        chatButtonFrame.src = getSdkBasePath() + 'chatButton.html';
        chatButtonFrame.id = "chatButtonFrame";
        chatButtonFrame.name = "chatButtonFrame";
        chatButtonFrame.allowTransparency = "true";
        chatButtonFrame.style.position = "absolute";
        chatButtonFrame.style.height = "60px";
        chatButtonFrame.style.width = "60px";
        chatButtonFrame.style.bottom = "20px";
        chatButtonFrame.style.right = "20px";
        chatButtonFrame.style.border = 0;
        chatButtonFrame.scrolling = "no";
        return chatButtonFrame;
    }

    function createChatBox(options) {
        var chatBoxFrame = document.createElement('iframe');
        chatBoxFrame.src = getSdkBasePath() + "chatBox.html";
        chatBoxFrame.id = "chatBoxFrame";
        chatBoxFrame.name = "chatBoxFrame";
        chatBoxFrame.allowTransparency = "true";

        chatBoxFrame.style.border = "0";
        chatBoxFrame.style.boxShadow = "0 4px 8px 0 #BABABA, 0 6px 20px 0 #888";
        chatBoxFrame.style.position = "absolute";
        chatBoxFrame.style.display = "none";

        if (isMobile()) {
            chatBoxFrame.style.height = "100%";
            chatBoxFrame.style.width = "100%";
            chatBoxFrame.style.padding = "0";
            chatBoxFrame.style.margin = "0";
            chatBoxFrame.style.top = "0";
            chatBoxFrame.style.left = "0";

        } else {
            chatBoxFrame.style.height = options.desktop.chatWindowHeight;
            chatBoxFrame.style.width = options.desktop.chatWindowWidth;
            chatBoxFrame.style.bottom = options.desktop.chatWindowBottom || "50px";
            chatBoxFrame.style.right = options.desktop.chatWindowRight || "20px";
            chatBoxFrame.style.minHeight = "480px"
            chatBoxFrame.style.minWidth = "320px";
            chatBoxFrame.style.borderRadius = "0";
        }

        chatBoxFrame.scrolling = "no";

        return chatBoxFrame;
    }


})(window, document);
