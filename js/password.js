$(function () {
    var pass=$.getUrlParam('password');
    if(pass){
        $("#hbePass").val(pass);
        $("#hexo-blog-encrypt label").html("<b>回车(Enter)</b>以继续...");
        $("#hbePass").focus();
    }
})