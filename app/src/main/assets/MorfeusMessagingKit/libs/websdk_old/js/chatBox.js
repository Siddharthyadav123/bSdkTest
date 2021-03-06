;
(function(window, document) {


    window.isMobile = function() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }
    }

    function init() {
        insertTemplateReferences("templateConfig", "insertTmplRef");
        loadTemplate("chatBoxTemplate", "chatBoxContainer");

        registerTemplates("userBubble", "userBubbleTemplate");
        registerTemplates("botBubble", "botBubbleTemplate");
        registerTemplates("cards", "cardsTemplate");
        registerTemplates("list", "listTemplate");

        window.userBubble = Handlebars.compile("{{>userBubble chatText}}");
        window.botBubble = Handlebars.compile("{{>botBubble chatText}}");
        window.cards = Handlebars.compile(importTemplate("cardsTemplate"));
        window.list = Handlebars.compile(importTemplate("listTemplate"));
    }


    window.onload = function() {
        init();
        if (window.options.showInWebview == "1" && isMobile()) {
            $("#chatbox-header").hide();
        }
    }


    window.speechToText = function(dictationCallback) {

        if (window.hasOwnProperty('webkitSpeechRecognition')) {

            var recognition = new webkitSpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.lang = "en-GB";

            var dictation = {
                eventName: "load",
                handle: recognition
            }

            dictationCallback(dictation);

            recognition.onstart = function(e) {

                var dictation = {
                    eventName: "start",
                    handle: recognition
                }

                dictationCallback(dictation);
            }

            recognition.onresult = function(e) {

                var dictation = {
                    eventName: "result",
                    handle: recognition,
                    text: e.results[0][0].transcript
                }

                dictationCallback(dictation);


            };

            recognition.onerror = function(e) {
                // turnOffMic();
                // recognition.stop();

                var dictation = {
                    eventName: "error",
                    handle: recognition

                }

                dictationCallback(dictation);

            }

            recognition.onend = function() {
                // turnOffMic();
                // recognition.stop();

                var dictation = {
                    eventName: "end",
                    handle: recognition

                }

                dictationCallback(dictation);
            };

        } else {
            console.log("no voice support");
            var dictation = {
                eventName: "unsupported",
                handle: recognition

            }

            dictationCallback(dictation);
        }

    }


    window.addEventListener("message", receiveMessage, false);


    function receiveMessage(event) {
        var data = event.data
        var type = data.type;

        if (event.origin == window.options.domain) {

            switch (type) {
                case "showChatBox":

                    break;

                case "hideChatBox":
                    break;

                default:
                    break;
            }

        }

    }

})(window, document);
