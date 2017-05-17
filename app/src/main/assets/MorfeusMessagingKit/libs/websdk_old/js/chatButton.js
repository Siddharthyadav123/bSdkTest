;
(function(window, document) {


    window.onload = function() {
        loadTemplate("chatButtonTmpl", "chatButtonContainer");
    }

    window.showChatBox = function() {
        parent.postMessage({ type: "showChatBox" }, window.options.domain);
    };

    window.hideChatBox = function() {
        parent.postMessage({ type: "hideChatBox" }, window.options.domain);
    };


})(window, document);
