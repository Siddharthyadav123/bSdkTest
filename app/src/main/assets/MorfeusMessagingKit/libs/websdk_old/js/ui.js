// chatbutton
//======================================================================================================//

$(function() {


    $("#chatButtonContainer").on("click", function() {

        var buttonState = $("#ai-container>div.ai-launcher").hasClass("ai-launcher-active");

        if (buttonState) {
            $("#ai-container>div.ai-launcher").removeClass("ai-launcher-active");
            hideChatBox();
        } else {
            $("#ai-container>div.ai-launcher").addClass("ai-launcher-active");
            showChatBox();
        }

    });

});

//======================================================================================================//
