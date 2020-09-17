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
    $('.button-collapse').sideNav();

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

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        /*$('#articleContent a').attr('target', '_blank');*/

        $('#articleContent img:not(.no-gallery)').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    //captionText = title;
                    captionText = "";
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('span');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });
        $(".img-item .caption .center-caption:contains('img')").css("display", "none");

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }

        do_browser();

        $("#jindu").hide();
    };
    //articleInit();

    $('#articleContent img').each(function() {
        var $image = $(this);
        var alt = $image.attr('alt');
        var src = $image.attr('src');
        $imageWrapLink = $image.wrap('<a data-fancybox=images data-caption="'+ alt +'" href="' + src + '"></a>');
    });

    $('#articleContent img[data-fancybox="images"]').fancybox({
        thumbs: true,
        hash: true,
        loop: true,
        fullScreen: true,
        slideShow: true,
        protect: true,
        buttons : [
            'slideShow',
            'fullScreen',
            'thumbs',
            'share',
            'download',
            'zoom',
            'close'
        ],
    });
    

    $('#toggleSearch').click(function () {
        $('#searchModal').openModal();
        $('#searchInput').focus();
    });

    /*回到顶部*/
    if(document.body.clientWidth<=600){$('#backTop').remove();}
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        if (scroll < 100) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    });

    
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

function do_browser(){
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

$.getUrlParam = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(unescape(r[2])); return null;
}

var toc=1;
function toggletoc(){
    if(toc==1){hidetoc();}
    else{showtoc();}
}

function hidetoc(){
    $("#pagetoc").css("position","fixed");
    $("#pagetoc").css("opacity","0");    
    $(".row .l9").addClass("addl9latter");
    $(".row .l9").removeClass("l9");
    //setTimeout('',0);
    $("main").attr("class", "container content");
    toc=0;
}

function showtoc(){
    $("main").attr("class", "post-container content");
    $(".addl9latter").addClass("l9");
    $("#pagetoc").css("position","");
    setTimeout('$("#pagetoc").css("opacity","1");',275);
    toc=1;
}