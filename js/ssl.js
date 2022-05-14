$(function () {
    var href = window.location.href;
    if (href.indexOf("localhost") < 0){
        var targetProtocol = "https:";
            if (window.location.protocol != targetProtocol)
                href = targetProtocol + href.substring(window.location.protocol.length);
    }
});