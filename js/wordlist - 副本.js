var exitReadWhole;
var ReadWhole_row;
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer:3000,
  })
$(function () {
    document.documentElement.requestFullscreen();//全屏

    /*显示/隐藏所有释义*/
    var no="rgba(255, 255, 255, 0)";/*不显示*/
    var yes="";/*显示*/
    t=1;

    function toggleAll(row){
        o=$("table#words tr td:nth-child("+row+")");
        if (t==1){
            $(o).css("color",no);
            $(o).addClass("noselect");
            t=0;
        } else {
            $(o).css("color",yes);
            $(o).removeClass("noselect");
            t=1;
        }
    }
    
    $(".wordtoggles").click(function (){
        toggleAll("2");
    });
    $(".meanings").click(function (){
        toggleAll(chineserow);
    });
    
    /*显隐单个释义例句 */
    $("table#words tr td:nth-child(2)").on("click",function(e){
        o=e.target;
        if($("#mode").val()==1){
            if ($(o).css("color")==no){
                $(o).css("color",yes);
                $(o).removeClass("noselect");
            } else {
                $(o).css("color",no);
                $(o).addClass("noselect");
            }
        } else if($("#mode").val()==3){
            weishi($(o).text());
        } else if($("#mode").val()==4){
            window.rowindex;
            rowindex = $(this).parent()[0].rowIndex;//第几行
            ExampleSentence();
        }
    });
    /*显隐单个释义 */
    $("table#words tr td:nth-child("+chineserow+")").on("click",function(e){
        if($("#mode").val()==2){
            o=e.target;
            if ($(o).css("color")==no){
                $(o).css("color",yes);
                $(o).removeClass("noselect");
            } else {
                $(o).css("color",no);
                $(o).addClass("noselect");
            }
        }
    });

    $("table#words tr td:nth-child("+chineserow+") i").on("click",function(e){
        e.stopPropagation();// 阻止事件冒泡
    });

    //重新关闭开关，显示全部释义 
    $("#mode").change(function() {
        var val=$("#mode").val();
        changeURLPar("mode",val);
        t=0;toggleAll("2");t=0;toggleAll(chineserow);
        $(".wordtoggles,.meanings,#prevbtn2,#nextbtn2,#bigwordbtn").css("display","none");
        if (val==1){$(".wordtoggles").css("display","block");}
        if (val==2){$(".meanings").css("display","block");}
    });
    /*所有释义按钮悬浮 
    var ie6 = document.all;
    var dv = $('#meaning'), st;
    dv.attr('otop', dv.offset().top); //存储原来的距离顶部的距离
    $(window).scroll(function () {
        st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if (st > parseInt(dv.attr('otop'))) {
            if (ie6) {//IE6不支持fixed属性，所以只能靠设置position为absolute和top实现此效果
                dv.css({ position: 'absolute', top: st });
            } else if (dv.css('position') != 'fixed') 
            dv.css({ 'position': 'fixed', top: 0 });
        } else if (dv.css('position') != 'static') dv.css({ 'position': 'static' });
    });*/

    /*开关开启后，点击单词发音*/
    $("table#words tr td:nth-child(2)").on("click",function(e){
        if ($("#sound").is(':checked')){
            var text=$(e.target).text();
            var code = $("#soundorg").val();
            $("#hint2").remove();
            $("<audio src='" + showSound(text,code) + "' autoplay id='hint2'/>").appendTo("body");
        }
    });

    var len = parseInt($.getUrlParam('length'));
    if(!len){len=10;}

    /*表格datatables*/
    var table=$('#words').DataTable({
        paging: true,
        pageLength: len,
        searching: true,
        search: {regex: true},
        lengthMenu: [ [10,25,50,100,-1], [10, 25, 50,100, "全部"] ],
        pagingType: 'input',
        columnDefs:[{
            　　　　'targets' : [(chineserow-1)],    //除第六，第七两列外，都默认不排序
            　　　　'orderable' : false
            　　}],
        language: {
           "sProcessing": "处理中...",
           "sLengthMenu": "每页显示 _MENU_ 项结果",
           "sZeroRecords": "没有匹配结果",
           "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
           "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
           "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
           "sInfoPostFix": "",
           "searchPlaceholder": "你可以这样搜索...",
           "sSearch": "",
           "sUrl": "",
           "sEmptyTable": "表中数据为空",
           "sLoadingRecords": "载入中...",
           "sInfoThousands": ",",
           "oPaginate": {
               "sFirst": "首页",
               "sPrevious": "<i class='fas fa-arrow-circle-left'></i>",
               "sNext": "<i class='fas fa-arrow-circle-right'></i>",
               "sLast": "末页"
           },
           "oAria": {
               "sSortAscending": ": 以升序排列此列",
               "sSortDescending": ": 以降序排列此列"
           }
       },
    });
    $('.dataTables_filter input').attr({'list':'dataTables_filter_input'});

    /*URL参数快速提取 */
    var search = $.getUrlParam('search');
    if (search){
        $("title").html("["+search+"]"+title1+"|lzc的小站");
        var table = $('#words').DataTable();
        table.search(search).draw();
    }
    
    /*查询时，地址栏跟着改变 */
    $('input[aria-controls="words"]').blur(function(){
        var str=$('input[aria-controls="words"]').val();
        $("title").html((str?("["+str+"]"):(""))+title1+"|lzc的小站");
        str=escape(str);
        str=str.replace(/%/g,'%25');
        changeURLPar("search",str);
    });
    $("select[name='words_length']").change(function(){
        changeURLPar("length",table.page.len());
    });


    document.getElementById("mode").value=(parseInt($.getUrlParam('mode')))?(parseInt($.getUrlParam('mode'))):("0");

    //stopwholeFreeMove();

    var ua = navigator.userAgent.toLowerCase();
    if((ua.indexOf("android")>=0)||(ua.indexOf("iphone")>=0)||(ua.indexOf("symbianos")>=0)||(ua.indexOf("windows phone")>=0)||(ua.indexOf("ipad")>=0)||(ua.indexOf("ipod")>=0)){
        $('.btndiv a').tooltip('remove');
    }
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信浏览器去除checked
        $("#screenon").removeAttr('checked');
        document.getElementById("screenon").setAttribute("disabled", "disabled");
        $("#screenntc").attr("data-tooltip", "垃圾微信不支持！请在浏览器中打开本网页");
    }

    //读取，填写api（cookies名含'Wordlist_'，但是url参数名、不含Wordlist_）。
    let APIName=['mb1key','mb2key','bdid','bdkey'];
    for(var i=0;i<4;i++){
        if($.getUrlParam(APIName[i])){
            $.cookie('Wordlist_'+APIName[i], $.getUrlParam(APIName[i]),{ expires: 365, path: '/' });
        }
        if($.cookie('Wordlist_'+APIName[i])){$("#"+APIName[i]).val($.cookie('Wordlist_'+APIName[i]));}
    }
});

$('body').on('click','.transbtn',function(){
    var dom=$(this);
    dom.css("pointer-events","none");
    var text=dom.prev().text();
    url=calculateURL(text);/*wordlist_calculateURL.js */
    $.ajax({
        type:"GET",
        url: url,
        dataType:"jsonp",
        success:function(data){
            if(data.error_code){
                (data.error_code=="54003")?(Toast.fire("请求过于频繁，请5秒后重试",'','error')):(Toast.fire("未知错误",'','error'));
            }else{
                dom.after(" <div class='trans-text'>"+data.trans_result[0].dst+"</div>");
                dom.remove();
            }
        },
        error:function(jqXHR){
            Toast.fire("Error: "+jqXHR.status,'','error');
            dom.css("pointer-events","auto");
        }
    });
})



var files = new Array;
var k=0;
var music_player = document.querySelector("#hint");
var jsonData;
function digui(i){/*朗读整个单词表 */
    /*new*/
    if(exitReadWhole){/*如果手动退出 */
        diguistop();
    } else if((i>=document.getElementById('words').rows.length)&&($('#words').DataTable().page.info().page+1 < $('#words').DataTable().page.info().pages)&&($('#autoTurnPage').is(':checked'))){/*如果读完本页但后面还有,要自动翻页 */
        $("table#words tr:eq("+(ReadWhole_row-1)+") td").removeClass("soundhere");
        document.getElementById("words_next").click();
        ReadWhole_row=1;
        digui(ReadWhole_row);
    } else if(i>=document.getElementById('words').rows.length){/*读完最后一页，或者不自动翻页 */
        //$("#hint")[0].pause();
        $("<audio src='/../medias/over.mp3' autoplay id='stop'/>").appendTo("body");
        $("table#words tr:eq("+(ReadWhole_row-1)+") td").removeClass("soundhere");
        diguistop();
    } else {/*本页还没有读完 */
        $("#bigword_example,#bigwordSLB").empty();
        files.length=0;
        target=$("table#words tr:eq("+i+") td:eq(1)");
        for (j=1;j<=times;j++){
           files.push(showSound(target.text(),j%3));
        }
        if($("#readcn").is(":checked")){
            files.push(showSoundCN($("table#words tr:eq("+i+") td:eq("+(chineserow-1)+")").text() , 5 , i));
        }

        if ($("#readSampleSentences").is(":checked")){

            $.ajax({
                async: false,
                type: "GET",
                url: "https://dictionaryapi.com/api/v3/references/collegiate/json/"+target.text()+"?key="+$.cookie('Wordlist_mb1key'),
                //timeout:2000,async=false时无效
                datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".
                crossDomain: true,
                success: function (response) {//成功返回之后调用的函数
                    SLBinReadWhole(response);
                    try{parseJson(response,1);}catch(err){console.error(target.text()+"错误："+err);}
                },
                complete: function (XMLHttpRequest, textStatus) {//调用执行后调用的函数
                    if(textStatus == 'timeout'){
                        ajaxTimeOut.abort(); //取消请求
                        Toast.fire('网络不佳，跳转下一个词','','error');
                    }
                },
                error: function () {//调用出错执行的函数
                    Toast.fire('未知错误，跳转下一个词','','error');
                }
            });
        }
    
        Each_digui_do(i);
        music_player.src = files[0];
    }
}
function parseJson(jsonObj,code) {// 循环所有键,code=1是朗读，code=2是单击时显示
    //加例句
    for(var key in jsonObj) {
        //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
        var element = jsonObj[key];
        if(element.length > 0 && typeof(element) == "object" || typeof(element) == "object") {
            if(element[0]&&element[0]=="t"){
                for(var k=1;k<element.length;k++){
                    handleLiJu(element[k],code);
                }
            } else {
                parseJson(element,code);
            }
        } else { //不是对象或数组、直接输出
            if(key=="t"){
                //console.log("----eles -->  " + key + ":" + element + " ");
                handleLiJu(element,code);
            }
        }
    }
}
music_player.addEventListener('ended', function () {//一个单词所有内容读完
    k++;
    if(k>=files.length){
        nextWord();
    } else { music_player.src = files[k]; }
});

function handleLiJu(str,code){
    //console.log(str);
    str=handle(str);
    $('#bigword_example').append('<li><span>'+str+'</span> <span class="transbtn"> <i class="fa fa-language" aria-hidden="true"></i></span></li> ');
    str =str.replace(/<[^>]+>/g,"");//去除字符串中的 html 标签
    str=str.replace(/\{.*?\}/g,'');//移除字符串中的所有{}括号（包括其内容）
    str=str.replace(/\[|]/g,'');//移除字符串中的所有[]括号（不包括其内容）
    if(code=="1"){files.push(showSound(str,files.length%3));}
}

function nextWord(){
    ReadWhole_row++;
    k=0;
    setTimeout("digui("+ReadWhole_row+");",timeslot);
}

function prevWord(){
    $("table#words tr:eq("+ReadWhole_row+") td").removeClass("soundhere");
    if (ReadWhole_row>=2){
        ReadWhole_row--;
        k=0;
        digui(ReadWhole_row);
    } else if($('#words').DataTable().page.info().page+1>=2){/*不是第一页，翻到前一页 */
        document.getElementById("words_previous").click();
        ReadWhole_row=document.getElementById('words').rows.length-1;
        k=0;
        digui(ReadWhole_row);
    } else {
        ReadWhole_row=1;
        k=0;
        digui(ReadWhole_row);
    }
}

function ExampleSentence(){//单击查看例句（功能4）
    var word=$("table#words tr:nth-child("+rowindex+") td:nth-child(2)").html();
    var CN=$("table#words tr:nth-child("+rowindex+") td:nth-child("+chineserow+")").html();
    $("#bigword_example").empty();
    $("#bigword-content").css("text-align","left");
    
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://dictionaryapi.com/api/v3/references/collegiate/json/"+word+"?key="+$.cookie('Wordlist_mb1key'),
        "method": "GET",
    }
    $.ajax(settings).done(function (response) {
        SLBinReadWhole(response);//加音标
        parseJson(response,2);//加例句
    })
    $("#bigword2").html(CN);
    $("#bigword1").html(word);
    $("#bigword0").html(originhtml);
    bigwordUP();
    $("#bigwordbtn,#prevbtn2,#nextbtn2").fadeIn();
}

$("#nextbtn2").click(function(){/*监听下一个单词*/
    if((rowindex<document.getElementById('words').rows.length-1)&&($('#words').DataTable().page.info().page+1 < $('#words').DataTable().page.info().pages)){
        rowindex++;
        ExampleSentence();
    } else if($('#words').DataTable().page.info().page+1 < $('#words').DataTable().page.info().pages){
        document.getElementById("words_next").click();
        rowindex=1;
        ExampleSentence(1);
    }
});
$("#prevbtn2").click(function(){/*监听下一个单词*/
    if((rowindex==1)&&($('#words').DataTable().page.info().page+1>1)){
        document.getElementById("words_previous").click();
        rowindex=document.getElementById('words').rows.length-1;
        ExampleSentence();
    } 
    if(rowindex>=2){
        rowindex--;
        ExampleSentence();
    }
});

function Each_digui_do(i){
    $("table#words tr:eq("+(i-1)+") td").removeClass("soundhere");
    $("table#words tr:eq("+i+") td").addClass("soundhere");
    $("table#words tr:eq("+(i)+") td")[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    document.getElementById("bigword0").innerHTML=$("table#words tr:eq("+i+") td:eq(0)").html();
    document.getElementById("bigword1").innerHTML=$("table#words tr:eq("+i+") td:eq(1)").html();
    document.getElementById("bigword2").innerHTML=$("table#words tr:eq("+i+") td:eq("+(chineserow-1)+")").html();

    //document.getElementById("prev").innerHTML=$("table#words tr:eq("+(i-1)+") td:eq(1)").html();
    //document.getElementById("next").innerHTML=$("table#words tr:eq("+(i+1)+") td:eq(1)").html();
}


/*开始朗读 */
var times,timeslot;
var noSleep;
$("#beginreadWholeBTN").click(diguibegin);

$(".ctrlwholediv").click(function(){/*按下停止按钮，终止朗读全文 */
    ($(this).hasClass('play'))?(diguistop()):(diguibegin());
});

function diguibegin(){
    //document.getElementById("mode").value="0";
    $("<audio autoplay id='hint'/>").appendTo("body");
    if($("#screenon").is(':checked')){
        noSleep= new NoSleep();
        noSleep.enable();//不能用
    }
    if($("#readSampleSentences").is(':checked')){
        $("#bigword-content").css("text-align","left");
    } else{
        $("#bigword-content").css("text-align","center");
    }
    $("table#words,#shiyanqu,#words_length,#words_filter,#words_paginate").addClass("no-pointer-events");
    ReadWhole_row = parseInt($('#where').val());//大分页
    $(".paginate_input").val(getPageNowtr(ReadWhole_row).page);
    $("#words").dataTable().fnPageChange( getPageNowtr(ReadWhole_row).page - 1 );
    ReadWhole_row = getPageNowtr(ReadWhole_row).Nowtr;
    times=parseInt($('#times').val());
    timeslot=parseInt($('#timeslot').val())*1000;
    exitReadWhole=0;k=0;
    $('#nextbtn2,#prevbtn2').fadeOut();
    $("#ctrlwholediv, #ctrlwholesvg").addClass("play");
    $('#ctrlwholediv,#bigwordbtn, #nextbtn,#prevbtn').fadeIn();
    digui(ReadWhole_row);
}

function diguistop(){/*终止朗读全文 */
    if($("#screenon").is(':checked')){noSleep.disable();}
    //$("#hint")[0].pause();
    $("#hint")[0].src="";
    exitReadWhole=1;
    $("table#words tr:eq("+(ReadWhole_row-1)+") td").removeClass("soundhere");
    $("table#words tr:eq("+(ReadWhole_row)+") td").removeClass("soundhere");
    $("table#words,#shiyanqu,#words_length,#words_filter,#words_paginate").removeClass("no-pointer-events");
    
    
    //$('#bigwordbtn').css('display','none');
    
    //$('#stopwhole').css('display','none');
    //$('#beginwhole').css('display','block');
    $("#ctrlwholediv, #ctrlwholesvg").removeClass("play");

    $('#nextbtn,#prevbtn').fadeOut();
    //$("#bigword").css("top","100%");
    //$("#bigword-arrow").removeClass("fa-arrow-down");
    //$("#bigword-arrow").addClass("fa-arrow-up");
    //$("body").addClass("NowCanShow");
    //bigword_status=false;
    $("#where").val(getTrueTR(ReadWhole_row));
}

var originhtml,trSeq,settings;/*鼠标行第一格显示行号 */
$("table#words td").mouseover(function(){
    trSeq = $(this).parent().parent().find("tr").index($(this).parent()[0])+1;
    originhtml=$("table#words tr:eq("+trSeq+") td"+":eq(0)").html();
    $("table#words tr:eq("+trSeq+") td"+":eq(0)").html(getTrueTR(trSeq));
}).mouseout(function(){
    $("table#words tr:eq("+trSeq+") td"+":eq(0)").html(originhtml);
});

$("#nextbtn").click(function (){/*手动下一单词 */
    nextWord();
});

$("#prevbtn").click(function (){/*手动上一单词 */
    prevWord();
});

function showSound(text,code) {
    text=text.replace(/\//g,' or ');
    text=text.replace(/sb\./g,'somebody');
    text=text.replace(/sth\./g,'something');
    //text=text.replace(/'/g,'%27');
    text=text.replace(/…/g,' ');
    //text=text.replace(/\./g,' ');
    text=text.replace(/\s+/g, ' ');
    text=text.replace(/—/g, ' - ');
    text=text.replace(/^\s+|\s+$|\(|\)/g,'');
    if (code==2||code==1){
        var soundurl="https://dict.youdao.com/dictvoice?audio="+text+"&type="+code;
    } else if(code==4){
        var soundurl="https://media.shanbay.com/audio/uk/"+text.replace(/\s/g,'_')+".mp3";
    }else if(code==5){
        var soundurl="https://media.shanbay.com/audio/us/"+text.replace(/\s/g,'_')+".mp3";
    }else if(code==0){
        var soundurl="https://tts.baidu.com/text2audio?cuid=baiduid&lan=en&ctp=1&pdt=311&tex="+text;
    }
    /*因为音效元素是追加的，所以每次生成之前，将原来的删除掉 
    $("#hint").remove();*/
    /*创建audio标签的Jquery对象，然后追加到body进行播放即可 
    $("<audio src='" + soundurl + "' autoplay id='hint'/>").appendTo("body");*/
    soundurl=encodeURI(soundurl);
    return soundurl;
}

function showSoundCN(text,speed,i){
    text=text.replace(/[；|;]/g,",")
    text=text.match(/[\u4e00-\u9fa5|\uff0c|,]/g).join("");//去除非中文
    soundurl="https://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex="+text;
    //soundurl="https://tts.baidu.com/text2audio?lan=zh&per=1&ie=UTF-8&spd="+speed+"&text="+text;
    return soundurl;
}

var bigword_status=false;//点击显隐bigword
document.getElementById("bigwordbtn").addEventListener("click", function(){
    (!bigword_status)?(bigwordUP()):(bigwordDOWN());
})
function bigwordUP(){
    $("#bigword").css("top","0px");
    $("#bigwordbtn").addClass("down");
    $("body").removeClass("NowCanShow");
    bigword_status=true;
}
function bigwordDOWN(){
    $("#bigword").css("top","100%");
    $("#bigwordbtn").removeClass("down");
    $("body").addClass("NowCanShow");
    bigword_status=false;
}


function changeURLPar(par, par_value) {
    var destiny = location.href;
    var pattern = par+'=([^&]*)'; 
    var replaceText = par+'='+par_value; 
    if (destiny.match(pattern)) { 
        var tmp = '/'+par+'=[^&]*/';
        
        tmp = destiny.replace(eval(tmp), replaceText); 
        
        changeURL(tmp);
    } else { 
        if (destiny.match('[\?]')) { 
            changeURL(destiny+'&'+ replaceText);
        }else{ 
            changeURL(destiny+'?'+replaceText);
        } 
    } 
}

function changeURL(string){
    history.pushState({url: string, title: document.title}, document.title, string);
}

function weishi(string){
    Swal.fire({
        title: '相关词汇短语',
        html:'<img src="/../medias/loading.svg" id="wswait" style="max-width:350px;"/ ><div id="weishimain"></div>',
        showCancelButton: false,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            container: 'wscontainer-class',
            popup: 'wspopup-class',
            closeButton: 'wsclose',
        },
    })
    /**点击返回键关闭弹窗 */
    window.addEventListener("popstate", function(){
        $(".wsclose").trigger("click");
    }, false);
    window.history.pushState(null, null, "#");
    
    url1 = "https://dictionaryapi.com/api/v3/references/learners/json/"+string+"?key="+$.cookie('Wordlist_mb2key');
    $.getJSON(url1,function(results){
        var i=0;
        if(results[0].meta){
            
            results.forEach(function (result) {
            var err=false;
            try{
                $("#weishimain").append("<h1>"+result.meta.id+((result.hwi.prs&&result.hwi.prs[0].ipa)?("<span class='phs'>/"+result.hwi.prs[0].ipa+"/</span>"):(""))+((result.fl)?("<code>"+result.fl+"</code>"):(""))+"</h1>");
                $("#weishimain").append("<p id='wsp"+i+"'></p>");
                j=0;
                result.meta.stems.forEach(function (stem) {
                    $("#wsp"+i).append("<i>"+stem+"</i>");
                    if(j<result.meta.stems.length-1){$("#wsp"+i).append(", ");}
                    j++;
                });

                $("#weishimain").append("<ul id='wsul"+i+"'class='outerul'>");
                if (result.def&&result.def[0].sseq){
                    var k=0;
                    result.def[0].sseq.forEach(function (sseq_single) {
                        var shuzudt=null;
                        if(sseq_single[0][1].dt&&sseq_single[0][1].dt[0][1]){
                            shuzudt=sseq_single[0][1].dt;
                        } else if (sseq_single[1][1].dt&&sseq_single[1][1].dt[0][1]){
                            shuzudt=sseq_single[1][1].dt;
                        }
                        if (shuzudt){
                            if(shuzudt[0].indexOf("text")<0&&shuzudt[0][1]&&shuzudt[0][1][0]){//藏得很深，比如arrest的under:1
                                shuzudt=shuzudt[0][1][0];
                            }
                            $("#wsul"+i).append("<li>"+handle(shuzudt[0][1])+"<ul id='li"+i+"li"+k+"juul' class='lijuul'></ul></li>");
                            var arrayliju=null;
                            if(shuzudt[1]&&shuzudt[1].indexOf("vis")>=0){arrayliju=shuzudt[1][1]} 
                                else if(shuzudt[2]&&shuzudt[2].indexOf("vis")>=0){arrayliju=shuzudt[2][1]}
                            if(arrayliju){
                                arrayliju.forEach(function (liju) {
                                    $("#li"+i+"li"+k+"juul").append("<li>"+handle(liju.t)+"</li>");
                                })
                            }
                        }
                        
                    k++;
                    });
                } else if (result.dros[0].drp){}
                $("#weishimain").append("</ul>");
                i++;
            
            }catch (e) {
                console.error(e);
                console.error(result.meta.id+"的第"+i+"个释义\n");
                if (!err){Toast.fire(result.meta.id+"的部分信息无法显示！",'','error');}
                err=true;
            }
            });
        }else{
            $("#weishimain").append("<p style='text-align: center;'>韦氏词典没有该词组！</p>");
            Toast.fire('韦氏词典没有该词组！','','error');
        }
        $("#wswait").css("display","none");
    })
    .fail(function() {
        Toast.fire('连接不上韦氏词典服务器！','','error');
    });
}
function handle(str){
    //str=str.replace(/{wi}/g,'<b>');
    //str=str.replace(/{\/wi}/g,'</b>');
    str=str.replace(/{wi}/g,'');
    str=str.replace(/{\/wi}/g,'');
    str=str.replace(/{qword}/g,'<b>');
    str=str.replace(/{\/qword}/g,'</b>');
    str=str.replace(/{bc}/g,'');
    str=str.replace(/{gloss}/g,'<span class="hint">(');
    str=str.replace(/{\/gloss}/g,')</span>');
    str=str.replace(/{ldquo}/g,'“');
    str=str.replace(/{rdquo}/g,'”');
    str=str.replace(/{phrase}/g,'<span class="phrase">');
    str=str.replace(/{\/phrase}/g,'</span>');
    str=str.replace(/{it}/g,'<i>');
    str=str.replace(/{\/it}/g,'</i>');
    str=str.replace(/\{sx\|(.+?)\|\|\}/g,'see <span style="text-decoration:underline;">$1</span>');
    str=str.replace(/{dx}(.+?){\/dx}/g,'($1)');
    str=str.replace(/\{dxt\|(.+?)\|\|\}/g,'<span style="text-decoration:underline;">$1</span>');
    str=str.replace(/\{et_link\|(.+?)\|(.+?)\}/g,'<span style="text-decoration:underline;">$1</span>');
    return str;
}

function stopwholeFreeMove(){/*让#stopwhole在手机上自由移动 */
    var flag = 0; //标记是拖曳还是点击
    var oDiv = document.getElementById('stopwhole');
    var disX,moveX,L,T,starX,starY,starXEnd,starYEnd;
    oDiv.addEventListener('touchstart',function(e){
        flag = 0;
        e.preventDefault();//阻止触摸时页面的滚动，缩放
        disX = e.touches[0].clientX - this.offsetLeft;
        disY = e.touches[0].clientY - this.offsetTop;
//手指按下时的坐标
        starX = e.touches[0].clientX;
        starY = e.touches[0].clientY;
//console.log(disX);
    });
    oDiv.addEventListener('touchmove',function(e){
        flag = 1;
        L = e.touches[0].clientX - disX ;
        T = e.touches[0].clientY - disY ;
//移动时 当前位置与起始位置之间的差值
        starXEnd = e.touches[0].clientX - starX;
        starYEnd = e.touches[0].clientY - starY;
//console.log(L);
        if(L<0){//限制拖拽的X范围，不能拖出屏幕
            L = 0;
        }else if(L > document.documentElement.clientWidth - this.offsetWidth){
            L=document.documentElement.clientWidth - this.offsetWidth;
        }
        if(T<0){//限制拖拽的Y范围，不能拖出屏幕
            T=0;
        }else if(T>document.documentElement.clientHeight - this.offsetHeight){
            T = document.documentElement.clientHeight - this.offsetHeight;
        }
        moveX = L + 'px';
        moveY = T + 'px';
//console.log(moveX);
        this.style.left = moveX;
        this.style.top = moveY;
    });
    oDiv.addEventListener('touchend',function(){
        if(flag === 0) {diguistop();}//点击
    });
}

function getTrueTR(nowtr){
    return($('#words').DataTable().page.info().start + nowtr);
}

function getPageNowtr(TrueTR){
    var settings=$('#words').DataTable().page.info();
    var Length=(settings.length==-1)?(settings.recordsDisplay):(settings.length);
    var page=Math.ceil(TrueTR/Length);
    var Nowtr=TrueTR%Length;
    (Nowtr==0)?(Nowtr=Nowtr+Length):(Nowtr);
    return{page:page,Nowtr:Nowtr};
}

function SLBinReadWhole(response){
    try{$('#bigwordSLB').html("\\"+response[0].hwi.prs[0].mw+"\\");}catch(err){
        try{$('#bigwordSLB').html("\\"+response[0].ins[1].prs[0].mw+"\\");}catch(err){$('#bigwordSLB').empty();}
    }
}

function handleYINBIAO(str){
    /*
    str=str.replace(/ər/g,'ɚ');
str=str.replace(/är/g,'ɒɚ');
str=str.replace(/au̇/g,'aʊ');
str=str.replace(/ch/g,'tʃ');
str=str.replace(/er/g,'ɛɚ');
str=str.replace(/hw/g,'ʍ');
str=str.replace(/ir/g,'ɪɚ');
str=str.replace(/ȯi/g,'ɔɪ');
str=str.replace(/ȯr/g,'ɔɚ');
str=str.replace(/sh/g,'ʃ');
str=str.replace(/th/g,'θ');
str=str.replace(/t͟h/g,'ð');
str=str.replace(/u̇r/g,'ʊɚ');
str=str.replace(/zh/g,'ʒ');
str=str.replace(/ə/g,'ə');
str=str.replace(/ə/g,'ʌ');
str=str.replace(/a/g,'æ');
str=str.replace(/ā/g,'eɪ');
str=str.replace(/ä/g,'ɔ');
str=str.replace(/e/g,'ɛ');
str=str.replace(/ē/g,'i');
str=str.replace(/ē/g,'ɪ:');
str=str.replace(/i/g,'ɪ');
str=str.replace(/ī/g,'ɑɪ');
str=str.replace(/j/g,'dʒ');
str=str.replace(/ḵ/g,'x');
str=str.replace(/ō/g,'oʊ');
str=str.replace(/ȯ/g,'ɔ:');
str=str.replace(/p/g,'p');
str=str.replace(/s/g,'s');
str=str.replace(/t/g,'t');
str=str.replace(/ü/g,'u');
str=str.replace(/u̇/g,'ʊ');
str=str.replace(/y/g,'j');
str=str.replace(/z/g,'z');*/
str=str.replace(/-/g,'');
return str;
}



document.getElementById("saveapisettings").addEventListener("click", function(){
    var success=[];var fail=[];
    if($("#mb1key").val()){
        $.cookie('Wordlist_mb1key',$("#mb1key").val() , { expires: 365, path: '/' });
        success.push("“朗读单词Key (Dictionary)”");
    } else {
        fail.push("“朗读单词Key (Dictionary)”");
    }
    
    if( $("#mb2key").val() ){
        $.cookie('Wordlist_mb2key',$("#mb2key").val() , { expires: 365, path: '/' });
        success.push("“英英词典Key (Learner's)”");
    } else {
        fail.push("“英英词典Key (Learner's)”");
    }

    if(($("#bdid").val())&&($("#bdkey").val())){
        $.cookie('Wordlist_bdid',$("#bdid").val() , { expires: 365, path: '/' });
        $.cookie('Wordlist_bdkey',$("#bdkey").val() , { expires: 365, path: '/' });
        success.push("“例句翻译”");
    } else {
        fail.push("“例句翻译”");
    }

    var successSTR="";
    for(j = 0,len=success.length; j < len; j++) {
        successSTR += (success[j]+"，");
    }
    if (success.length > 0) {
        successSTR = successSTR.substr(0, successSTR.length - 1);
    };

    var failSTR="";
    for(j = 0,len=fail.length; j < len; j++) {
        failSTR += fail[j]+"，";
    }
    if (fail.length > 0) {
        failSTR = failSTR.substr(0, failSTR.length - 1);
    };
      
    Toast.fire({
        icon: (success.length==3)?('success'):('warning'),
        html: (successSTR.length>0)?('成功保存'+successSTR):(""),
        title: (failSTR.length>0)?(failSTR+"为空！"):(""),
    });
    
});

function clearapi(){
    $.cookie('Wordlist_mb1key', null,{ expires: -1, path: '/' });$.cookie('Wordlist_mb2key', null,{ expires: -1, path: '/' });
    $.cookie('Wordlist_bdid', null,{ expires: -1, path: '/' });$.cookie('Wordlist_bdkey', null,{ expires: -1, path: '/' });
    $("#mb1key,#mb2key,#bdid,#bdkey").val("");
}
function explainapi(){
    Swal.fire({
        icon: "info",
        title: "关于 KEY 的说明",
        html: "该页面的许多功能都依赖于第三方提供的免费服务，但是这些服务都有次数限制（每月只能访问1000次）。因此，你需要申请自己使用的KEY。<br/><br/><table><thead><tr><th>功能名称</th><th>使用的服务</th><th>每个KEY的免费限额</th></tr></thead><tbody><tr><td>朗读单词例句</td><td>韦氏词典</td><td>1000次/月</td></tr><tr><td>英英词典</td><td>韦氏词典</td><td>1000次/月</td></tr><tr><td>例句翻译</td><td>百度翻译</td><td>无限/月，每秒请求量=1</td></tr></tbody></table>",
        showCancelButton:1,
        reverseButtons:1,
        cancelButtonText: '取消',
        confirmButtonText: '去申请KEY',
        footer:"<a href='/testapis.html'>获取测试用的KEY</a>"
    }).then((result) => {
        if (result.value) {
            window.open("http://www.w3schools.com","_blank");
        }
    })
}
//https://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q=account&dicts={"count":99,"dicts":[["pic_dict","auth_sents_part","phrs"]]}
//&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1
//https://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q=account&dicts=%7B%22count%22:99,%22dicts%22:%5B%5B%22pic_dict%22,%22auth_sents_part%22,%22phrs%22%5D%5D%7D
