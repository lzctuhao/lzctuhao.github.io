var myDate = new Date();
var month=myDate.getMonth()+1;//获取当前月，0代表1月
var date=myDate.getDate(); //获取当前日
var year=myDate.getFullYear(); //获取当前年

$(function () {

    //document.documentElement.requestFullscreen();
   // document.body.webkitRequestFullScreen();/**强制全屏 */
    
    if ((month=='4'&&year=='2020')&&(date=='4'||date=='3')){
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML=":root{--bgcolor: black;}.logo-img,.bg-cover,.card-image,#reward,#backTop,#article-share{filter:grayscale(100)}.bg-cover:after{animation:none;background-color:rgb(0,0,0,0.7)}"
        style.id="addStyle"
        document.getElementsByTagName("HEAD").item(0).appendChild(style);
    }

    $("#loading-cover").fadeOut();
    $("body").addClass('NowCanShow');

    
    /**
     * 添加文章卡片hover效果.
     
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();*/

    /*菜单切换*/
    $('.sidenav').sidenav();

    /* 修复文章卡片 div 的宽度. */
    let fixPostCardWidth = function (srcId, targetId) {
        let srcDiv = $('#' + srcId);
        if (srcDiv.length === 0) {
            return;
        }

        let w = srcDiv.width();
        if (w >= 450) {
            w = w + 21;
        } else if (w >= 350 && w < 450) {
            w = w + 18;
        } else if (w >= 300 && w < 350) {
            w = w + 16;
        } else {
            w = w + 14;
        }
        $('#' + targetId).width(w);
    };

    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function () {
        $('.content').css('min-height', window.innerHeight - 165);
    };

    /**
     * 修复样式.
     */
    let fixStyles = function () {
        fixPostCardWidth('navContainer', 'articles');
        fixPostCardWidth('artDetail', 'prenext-posts');
        fixFooterPosition();
    };
    fixStyles();

    /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
    $(window).resize(function () {
        fixStyles();
    });

    /*初始化瀑布流布局*/
    $('#articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*sup移动端点击 */
    if (IsMobile()){
        $("#articleContent sup a").attr('href','javascript:void(0)');
    }


    do_wxbrowser();
    
    /*
    $('#toggleSearch').click(function () {
        $('#searchModal').openModal();
        $('#searchInput').focus();
    });*/

    $('.modal').modal();
    $('.tabs').tabs();

    /*回到顶部*/
    if(document.body.clientWidth<=600){$('#backTop').remove();}
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    // 当页面处于文章中部的时候刷新页面，因为此时无滚动，所以需要判断位置,给导航加上绿色。
    showOrHideNavBg($(window).scrollTop());
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        showOrHideNavBg(scroll);
    });
    function showOrHideNavBg(position) {
        let showPosition = 100;
        if (position < showPosition) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    }

    
    /*给div创建双击事件*/
    $(function () {
        var url=window.location.href;
        if((url.indexOf("lzcblog.gq") >= 0 )||(url.indexOf("coding.me") >= 0 )||(url.indexOf("cn") >= 0 )) {
            $("#Container1").append("&nbsp;<span onclick='china();' class='waves-effect waves-light'>🇨🇳</span>");
            $(".logo-name").append("&nbsp;<span onclick='china();' class='waves-effect waves-light'>🇨🇳</span>");
        }
        
        if(url.indexOf("localhost") >= 0 ) {
            $("#Container1 .logo-span").append(" (本地)");
            $(".logo-name").append(" (本地)");
        }
        
    });
    
    //let width=window.screen.width;
    let width=$("body").innerWidth();
    //console.log(document.body.clientWidth,document.body.offsetWidth,document.body.scrollWidth,window.screen.width,window.screen.availWidth);
    if(width>=993){
        $(".container").css("width",0.85*width+"px");
        console.log("width:"+width);
        $(".post-container").css("width",0.9*width+"px");
    }


    $(".nav-menu>li").hover(function(){
		$(this).children('ul').stop(true,true).show();
		 $(this).addClass('nav-show').siblings('li').removeClass('nav-show');
		
	},function(){
		$(this).children('ul').stop(true,true).hide();
		$('.nav-item.nav-show').removeClass('nav-show');
	})
	
    $('.m-nav-item>a').on('click',function(){
            if ($(this).next('ul').css('display') == "none") {
                $('.m-nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(100);
                $(this).parent('li').addClass('m-nav-show').siblings('li').removeClass('m-nav-show');
            }else{
                $(this).next('ul').slideUp(100);
                $('.m-nav-item.m-nav-show').removeClass('m-nav-show');
            }
    });

    $('.tooltipped').tooltip();
});



function IsMobile() {
    var isMobile = {
        Android: function (){return navigator.userAgent.match(/Android/i) ?true:false;},
        BlackBerry: function () {return navigator.userAgent.match(/BlackBerry/i) ?true:false;},
        iOS: function () {return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true:false;},
        Windows: function () {return navigator.userAgent.match(/IEMobile/i) ? true:false;},
        any: function () {
             return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
     };
     return isMobile.any(); //是移动设备
}

function china(){
    Swal.fire({
        type: 'info',
        html: '位于中国的服务器，访问<strong>速度更快！</strong>',
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: true,
        footer:"<a href='https://lzc2002.tk'>前往原站点（资源站）</a>"
    })
}

function ad2345(){
    Swal.fire({
        type: 'info',
        title: "关于广告",
        html: '这个广告无毒安全，但不要轻信广告的任何内容。<br/>你每看到1次广告，对方会获得1分钱，即<code>￥0.01</code>。',
        showCancelButton: false,
        showConfirmButton: true,
        showCloseButton: true
    })
}

function do_wxbrowser(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器
        $(".aplayer, meting-js").remove();
        $("#headNav").css("position","absolute");
    }
}

function outloadinfo(str){
    console.info(str);
    $("#load-info").text(str);
}

/*$.getUrlParam = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(unescape(r[2])); return null;
}*/

function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return decodeURI(decodeURI(r[2])); return null;
}

/*关注微信公众号 */
function wechat_account(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
        window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzk0ODE4MzExNg==&scene=124#wechat_redirect"
    } else {
        Swal.fire({
            title: '<span style="background:#c2185b;border-radius:16px;padding:2px 10px;color:white;">ID</span>&nbsp;lzc的碎碎念',
            html: '下载图片，然后在微信中扫一扫<br><a href="/../medias/wxqr.jpg" download="微信扫一扫.jpg">下载图片</a><br><img src="/../medias/wxqr.jpg" style="width: 260px;" alt="lzc的碎碎念" />',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick:false
        })
    }
}



function primary_series(current){ /*小学练习系列页面-弹窗 */
    Swal.fire({
        title: '小学练习系列页面',
        showConfirmButton: false,
        showCloseButton: true,
        html: ' <div id="primary_series" class="collection">\
        <a href="/tools/primary/" class="collection-item">最大公约数练习</a>\
        <a href="/tools/primary2/" class="collection-item">两位数除以一位数</a>\
        <a href="/2022/0814/folder-ganhuo/xiao-liu-ying-yu/" class="collection-item">六上单词</a>\
      </div>',
    })
    if(current>0){ /*标记当前页*/
        $("#primary_series").find('a').eq(current-1).append('<span class="badge">当前</span>');
    }
}