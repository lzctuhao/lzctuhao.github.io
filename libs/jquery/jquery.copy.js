/*!
 * jQuery Copy Plugin v1.1.1
 * https://github.com/by-syk/jquery-copy
 *
 * Copyright 2017 By_syk
 * 调用方法：

var res = $.copy("Hello, world!");
var res = $.copy(999);
var res = $.copy(true);
var res = $.copy([1, 2, 3]);
var res = $.copy({"status": 0, "data": []});
var res = $.copy($("#divContent"));

 */
(function(e){e.extend({copy:function(e){return copyText(e)}})})(jQuery);function copyText(e){if(!e){return false}var t;if(typeof e=="object"){if(e.nodeType){e=$(e)}if(e instanceof $){if(!e.length){return false}t=e.text();if(!t){t=e.val()}}else{t=JSON.stringify(e)}}else{t=e}var n=$("<textarea>");$("body").append(n);n.val(t).select();var o=document.execCommand("copy");n.remove();return o}