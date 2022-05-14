/**不应使用该版本。使用jm加密版本 */
$(function () {
    /*Holidays */
    var touchtime = new Date().getTime();
    
    $("#Container2").on("click", function(){
        if( new Date().getTime() - touchtime < 500 ){
            console.log("dblclick");
            $("#backTop").click();
        }else{
            touchtime = new Date().getTime();
            console.log("click")
        }
    });

    if (month=='12'&&date=='13'){
        $("html").css({
            "FILTER":"gray",
            "-webkit-filter":"grayscale(100%)",
        });
        //国行公祭,祀我国殇 暴行暴虐,共御外侮 昭昭前事,惕惕后人 永矢弗谖,祈愿和平
        $(".jinrishici-sentence").attr('class','jinrishici-sentence-gongjiri1213');
        $('.jinrishici-sentence-gongjiri1213').html('<span class="inlineSpan">国行公祭，祀我国殇；</span><span class="inlineSpan">暴行暴虐，共御外侮；</span><span class="inlineSpan">昭昭前事，惕惕后人；</span><span class="inlineSpan">永矢弗谖，祈愿和平。</span>');
    }

    if ((month=='4'&&year=='2020')&&(date=='4'||date=='3')){
        $(".jinrishici-sentence").attr('class','2019ncov');
        $('.2019ncov').html('为表达全国各族人民对抗击新冠肺炎疫情斗争牺牲烈士和逝世同胞的深切哀悼，国务院发布公告，决定2020年4月4日举行全国性哀悼活动。<a href="https://weibo.com/2656274875/IBzdcnOeU" style="color:#eee;text-decoration:underline">新闻链接</a>');
        $('.brand .title').html('<span style="font-size: 2.8rem;">今日全国哀悼</span>');
        /*$('<link>',{
            type:'text/css',
            href:'/css/grey.css',
            rel:'stylesheet'}
        ).appendTo('head');*/
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML=".bg-cover{background-image:url(/medias/banner/candles.jpg)!important}html{filter:grayscale(100)}"
        style.id="addStyle"
        document.getElementsByTagName("HEAD").item(0).appendChild(style);
    }

    if ((month==9&&date==30)||(month==10&&date<8)){
        $(".jinrishici-sentence").attr('class','jinrishici-sentence-GuoQing');
        $('.jinrishici-sentence-GuoQing').html('<span style="font-weight:bold;font-size:large">热烈庆祝中华人民共和国成立'+(year-1949)+'周年！</span>');
    }


    /*if(($.cookie('guoqing')!=2)&&(month==10)&&(date<15)){
        Swal.fire({
            title: '',
            text: '',
            imageUrl: "/medias/70th/"+date+".jpeg",
            animation: false,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            customClass: {
                image: 'swal2-image-image-full',
                popup: 'swal2-popup-image-full',
            },
            allowOutsideClick:false
        })
        var expiresDate= new Date();
        expiresDate.setTime(expiresDate.getTime() + (2*60*60*1000));
        $.cookie('guoqing', '2', { expires: expiresDate });
    }
    if(($.cookie('tinggeng')!=1)){
        Swal.fire({
            title: '停更公告',
            icon: 'info',
            html: '即日起至<mark>2021年6月8日</mark>，本站点暂停更新。'
        });
        var expiresDate= new Date();
        expiresDate.setTime(expiresDate.getTime() + (5*60*60*1000));
        $.cookie('tinggeng', '1', { expires: expiresDate });
    }*/
});