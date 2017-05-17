window.init();

$("#messages").css({ "min-height": "900px" });

function startDictation() {

    window.speechToText(function(dictation) {

        var eventName = dictation.eventName;
        var recognition = dictation.handle;

        switch (eventName) {
            case "load":
                if ($("#micBtn").hasClass("mic-off")) {
                    recognition.start();
                } else {
                    $("#micBtn").removeClass("mic-on").addClass("mic-off");
                    recognition.stop();
                }
                break;

            case "start":
                $(".mic-off").removeClass("mic-off").addClass("mic-on");
                break;

            case "result":
                turnOffMic();
                var chatText = dictation.text;
                recognition.stop();
                insertUserBubble(chatText);
                chat(chatText);
                clearChatText();
                break;

            case "error":
                turnOffMic();
                recognition.stop();
                break;

            case "end":
                turnOffMic();
                recognition.stop();
                break;

            default:
                turnOffMic();
                recognition.stop();
                break;

        }

    });
}

function turnOffMic() {
    $(".mic-on").removeClass("mic-on").addClass("mic-off");
}



function querykeypress(e) {

    if (e.keyCode === 13) {
        e.preventDefault();

        var chatText = getChatText();
        chatText = chatText.trim();

        if (chatText.length > 0) {
            clearChatText();
            insertUserBubble(chatText);
            chat(chatText);
        }

    }

}

function hideChatBox(e) {
    e.preventDefault();
    parent.postMessage({ type: "chatButtonClosedState" }, window.options.domain);
    parent.postMessage({ type: "hideChatBox" }, window.options.domain);
};


function clearChatText() {
    $("#query").val("");
}


function getChatText() {
    var chatText = $("#query").val();
    chatText = chatText.trim();
    return chatText;
}


window.send = function(e) {

    var chatText = getChatText();

    if (chatText.length > 0) {
        insertUserBubble(chatText);
        clearChatText();
        chat(chatText);
    } else {
        clearChatText();
    }

}

window.disableAllButtons = function(elem) {
    var rbs = $(elem).closest("#rowbuttons");
    $('[data-type="rowbutton"]', rbs).each(function(i, elem) {
        $('button', elem).attr('disabled', 'disabled').addClass("btn-disabled");
    });
}

window.updateChatStatus = function() {
    $(".user-message:last #tick-image", "#messages").addClass("hidden");
    $(".user-message:last #doubletick-image", "#messages").removeClass("hidden");
}

function scrollToEnd() {
    $(document).click();
    var scrollHeight = document.getElementById("messages").scrollHeight;
    $("#messages").animate({ scrollTop: scrollHeight }, 'slow');
}

function insertWelcomeMessage(message) {
    var renderedWelcomeMessage = welcomeMessage({ "message": message });
    $("#messages").append($(renderedWelcomeMessage));
    scrollToEnd();
}

function insertUserBubble(chatText) {
    var renderedUserBubble = userBubble({ "chatText": chatText });
    $("#messages").append($(renderedUserBubble));
    scrollToEnd();
    insertTypingAnimation();
}

function insertBotBubble(chatText) {
    var renderedBotBubble = botBubble({ "chatText": chatText });
    $("#messages").append($(renderedBotBubble));
    scrollToEnd();
}

function insertTypingAnimation() {
    var renderedTypingAnimation = typingAnimation();
    $("#messages").append($(renderedTypingAnimation));
    scrollToEnd();
}

function showLoader(elem) {
    var height = $(elem).closest(".panel-default").outerHeight();
    var loaderHtml = '<div class="overlay-div" style="height:' + height + 'px;"></div>';
    $(elem).closest(".panel").prepend(loaderHtml);
}

function hideLoader() {
    $(".overlay-div").remove();
}

function loadQuickText(quickText) {
    insertUserBubble(quickText);
    clearChatText();
    chat(quickText);
}

function insertList(data) {
    var renderedListTemplate = list({ data: data });
    $("#messages").append($(renderedListTemplate));

    setTimeout(function() {
        scrollToEnd();
    }, 1000);

}

function insertCards(payload) {
    var renderedCardsTemplate = cards({ payload: payload });
    $("#messages").append($(renderedCardsTemplate));

    $("#cardsImage-" + payload.randId).slick({
        centerMode: true,
        centerPadding: '30px',
        infinite: false,
        slidesToShow: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 1
            }
        }]
    });

    setTimeout(function() {
        scrollToEnd();
    }, 1000);

}
