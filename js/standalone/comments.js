$(document).ready((function(){if(getUrlParam("reply")){$("#oid_info1").css("display","none");$("#oid_info2").css("display","unset");$("#your_oid").html(getUrlParam("reply"));$("#normal_textarea").css("display","none");$("body").append("<style>.vempty .empty_error{display:block}.vempty .empty{display:none}.v[data-class=v] .vcount{display:none!important}</style>")}}));function comment_id(e,t){Swal.fire({icon:"success",title:"提交成功",html:'<p class="success_info">您已成功提交留言！如您想要连续对话，请牢记您的专属编号：<code>'+e+'</code>。</p><p class="success_info">如您忘记此编号，您仍能在该页面看到回复，但无法连续对话（对回复进行回复）。</p>',showCancelButton:true,confirmButtonText:"复制编号",cancelButtonText:"好的"}).then((t=>{if(t.value||t.isConfirmed){let t=$.copy(e);if(t){Swal.fire({icon:"success",title:"复制成功",showConfirmButton:false,timer:2e3})}else{Swal.fire({icon:"error",title:"复制失败",html:"请手动复制您的专属代码：<code>"+e+"</code>"})}}}))}