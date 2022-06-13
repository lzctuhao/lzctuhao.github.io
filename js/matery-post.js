$(function () {
    var pass=getUrlParam('password');
    if(pass){
        $("#hbePass").val(pass);
        $("#hexo-blog-encrypt label").html("<b>回车(Enter)</b>以继续...");
        $("#hbePass").focus();
    }
    /*fancybox*/
    $('#articleContent img').each(function() {
        var $image = $(this);
        var alt = ($image.attr('alt'))?($image.attr('alt')):("");
        var src = $image.attr('src');
        $imageWrapLink = $image.wrap('<a data-fancybox=images data-caption="'+ alt +'" href="' + src + '"></a>');
    });

    Fancybox.bind('#articleContent img[data-fancybox="images"]', {
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
        thumbs : {
            autoStart : true //缩略图
        }
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        //$('#articleContent a').attr('target', '_blank');
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
        
        /*$('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });
        lightGallery(document.getElementById('articleContent'), {
            
        });*/
        $(".img-item .caption .center-caption:contains('img')").css("display", "none");

        /*
        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }*/


    };
    articleInit();
})
