qid=0;num1=num2=0;right=wrong=0;record=[];

/*提示框sweetalert2 参数*/
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function primary_series(current){
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

function randint(n,m){/*范围包括n和m*/
    return parseInt(Math.random()*(m-n+1)+n)
}

function result_table(){
    var table_html="<table><tr><th>题号</th><th>第一个数</th><th>第二个数</th><th>正确答案</th><th>你的答案</th><th>判定</th></tr>"
    for(let j=0;j<quantity;j++){
        /*处理表格*/
        var item=record[j];
        var judge=item[2]==item[3] ? "✔️" :"❌";
        table_html+="<tr><td>#"+(j+1)+"</td><td>"+item[0]+"</td><td>"+item[1]+"</td><td>"+item[2]+"</td><td>"+item[3]+"</td><td>"+judge+"</td></tr>";

        /*处理轮播*/
        var div_class=(judge=='❌')?('n'):('y');
        var crs_html='<div class="carousel-item card '+
        div_class+'">\
            <p class="tihao">#'+(j+1)+'</p>\
            <p class="timu">'+get_t_str(item[0],item[1])+'<span class="ans">'+item[3]+judge+'</span></p>';
        if (judge=='❌') crs_html+='<p class="std">正确答案：<span class="std_num">'+item[2]+'</span></p>';
        crs_html+="</div>";
        $("#result_carousel").append(crs_html);
    }
    table_html+="</table>";
    $('.carousel').carousel();
    $("#result").append(table_html);

    $(".std").on("click",function(){
        let dom=$(this).children(".std_num");
        let opacity=dom.css('opacity');
        dom.css('opacity',opacity=="0"?1:0);
    });
}

function check(std){
    $(".progress").css("width","100%");
    var ans=document.getElementById("ans").value;
    if (std==ans) {
        right++;
        Toast.fire({
            icon: 'success',
            title: '答案正确！'
        })
    } else {
        wrong++;
        Toast.fire({
            icon: 'error',
            title: '答案错误！'
        })
    }
    record[qid-1][2]=std;
    record[qid-1][3]=ans;
}

function work(){
    $("#welcome-inside").remove();
    $("#t").show();
    document.getElementById("ans").focus();
    $(".progress").css("width","0%");
    qid!=0 && check(get_std());
    if (qid==quantity) {
        end();/*终止答题*/
    } else{
        produce_n1n2();
        
        $("#timu").html(get_t_str(num1,num2));
        record.push([num1,num2,,]);
        qid++;
        $("#tihao").html("#"+qid);
    }
}