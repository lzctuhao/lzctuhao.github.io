$(document).ready((function(){$("#inputarea").on("input propertychange",(function(){$.cookie("data",$(this).val())}));$("#inputarea").val($.cookie("data"));$("select").formSelect({});$(".collapsible").collapsible()}));let expression="Raw";function update_note(){expression=$("#preprocess").val();if(expression=="Raw"||expression=="raw"){$("#preprocess_note").text("关闭")}else{$("#preprocess_note").html("Ans = "+expression.replace(/Raw/gi,"<span class='orange_var'>Raw</span>"))}}var array=[];var errormsg="";sum=0;len=0;function changePH(){let e=$("#pH").val();$("#concentration").text(Math.pow(10,-e))}function preprocess_validation(operation=$("#preprocess").val()){if(operation.match(/raw/gi)==null){console.error('Can not find "Raw" in expression.');return false}else{try{let t=operation.replace(/raw/gi," 1 ");eval(t)}catch(e){console.error(e);return false}expression=$("#preprocess").val();return true}}function process_raw(e){function t(){M.toast({html:"您输入的转换式有问题！已按原数据处理。"});return e}let r=expression;if(!preprocess_validation()){t()}else{r=r.replace(/Raw/g," ("+e+") ");let a=e;try{a=handleNum(r)}catch{t()}return a}}function save_prepocess(){if(preprocess_validation()){$(".collapsible").collapsible("close");update_note();$("#calc").removeAttr("disabled");return true}else{$("#preprocess").focus();M.toast({html:"您输入的转换式有问题！请检查输入！"});document.getElementById("preprocess").scrollIntoView({behavior:"smooth",block:"center"});$("#calc").attr("disabled","disabled");return false}}function handleInput(){if(!save_prepocess()){return false}M.AutoInit();$("#arraytable tbody").html("");$("#result tbody").html("");array=[];errormsg="";let e=0;process=0;len=0;sum=0;let t=$("#inputarea").val();let r=/[，、,\s\n]/g;let a=t.split(r);a.forEach((function(t){if(t!=""){try{e=handleNum(t)}catch(e){M.toast({html:"无法读取<code>"+t+"</code>，请检查您的输入！其余数据已录入。"})}process=process_raw(e);len=len+1;array.push(process);sum=sum+process;$("#arraytable tbody").append("<tr><td>"+len+"</td><td><code>"+e+"</code></td><td><code>"+process+"</code></td></tr>")}}));avar=sum/len;work()}function handleNum(str){let map={"×":"*","÷":"/","%":"/100","^":"**","（":"(","）":")","【":"[","】":"]","——":"-","—":"-",e:" Math.E ",ln:"Math.log",lg:"Math.log10"};str=str.replace(/(\|)(.+)(\|)/g,"Math.abs($2)");let reStr="("+Object.keys(map).map((e=>"\\"+e)).join("|")+")";let re=new RegExp(reStr,"g");str=str.replace(re,(e=>map[e]));str=str.replace(/[\u4e00-\u9fa5]/g,"");return parseFloat(eval(str))}function cleararea(){document.getElementById("inputarea").value=""}function work(){if(len>1){if($("#suspicion").prop("checked")){if(len>2){suspicion()}else{M.toast({html:"数据量<3，未检验可疑值！"})}}if($("#ava").prop("checked")){ava()}if($("#std").prop("checked")){std()}if($("#rsd").prop("checked")){rsd()}if($("#ad").prop("checked")){ad()}if($("#confidence95").prop("checked")||$("#confidence99").prop("checked")){confidence()}document.getElementById("arraytable").scrollIntoView({behavior:"smooth"})}else{$("#inputarea").focus();M.toast({html:"数组量不足！"});document.getElementById("inputarea").scrollIntoView({behavior:"smooth",block:"center"})}}function display(e,t){function r(e){return e.split("e")[0]+"×10<sup>"+e.split("e")[1]+"</sup>"}try{if($("#form").prop("checked")){$("#result tbody").append("<tr><td>"+e+"</td><td><code>"+r(t.toExponential(5))+"</code></td></tr>")}else{$("#result tbody").append("<tr><td>"+e+"</td><td><code>"+t+"</code></td></tr>")}}catch{$("#result tbody").append("<tr><td>"+e+"</td><td><code>"+t+"</code></td></tr>")}}function ava(e=true){let t=0;for(i=0;i<len;i++){t+=array[i]}let r=t/len;if(e){display("平均值<span class='italic overline'>x</span>",r)}return r}function std(e=true){let t=ava(false);let r=0;for(i=0;i<len;i++){r+=(array[i]-t)**2}let a=Math.sqrt(r/(len-1));if(e){display("标准偏差<span class='italic'>s</span>",a)}return a}function rsd(e=true){let t=ava(false);s=std(false);let r=s/t;if(e){display("相对标准偏差RSD",(r*100).toPrecision(5)+"%")}return r}function ad(e=true){let t=ava(false);let r=0;for(i=0;i<len;i++){r+=Math.abs(array[i]-t)}let a=r/len;if(e){display("平均偏差<span class='italic overline'>d</span>",a)}return a}function suspicion(e=true){let t=0;let r="";array.sort((function(e,t){return e-t}));let a=array[0];array.shift();len=len-1;avar=ava(false);let s=ad(false)*4;if(avar-a>=s){r+="<span style='color:var(--bgcolor)'>最小值<code>"+a+"</code>为可疑值；</span>"}else{r+="最小值<code>"+a+"</code>正常；";array.push(a);len=len+1}r+="\n";if(len>2){array.sort((function(e,t){return e-t}));let e=array[len-1];array.pop();len=len-1;avar=ava(false);s=ad(false)*4;if(e-avar>=s){r+="<span style='color:var(--bgcolor)'>最大值<code>"+e+"</code>为可疑值；</span>"}else{r+="最大值<code>"+e+"</code>正常；";array.push(e);len=len+1}r+="\n（仅检验了一次最小最大值。）"}else{r+="未检验最大值。因为去除最小值后，数据量已不足。将保留最大值。"}if(e){$("#result tbody").append("<tr><td>可疑值\n(4<span class='overline italic'>d</span>法)</td><td>"+r+"</td></tr>")}$("#result tbody").append("<tr><td colspan='2' style='text-align:center'><b>去除可疑值后</b>，由剩余的"+len+"个数据得出以下计算值。</td></tr>");avar=ava(false)}function confidence(e=true){if(len<=20){let t=ava(false);let r=std(false);if($("#confidence95").prop("checked")){const a=[0,12.7065,4.3026,3.1824,2.7764,2.5706,2.4469,2.3646,2.306,2.2621,2.2282,2.201,2.1788,2.1604,2.1448,2.1314,2.1199,2.1098,2.1009,2.093,2.086,2.0796,2.0739,2.0686,2.0639,2.0596,2.0555,2.0518,2.0484,2.0452,2.0423,2.0395,2.0369,2.0345,2.0322,2.0301,2.0281,2.0262,2.0244,2.0227,2.0211,2.0196,2.0181,2.0167,2.0154,2.0141,2.0129,2.0117,2.0106,2.0096,2.0086,2.0076,2.0066,2.0057,2.0049,2.0041,2.0032,2.0025,2.0017,2.001,2.0003,1.9996,1.999,1.9983,1.9977,1.9971,1.9966,1.996,1.9955,1.995,1.9944,1.9939,1.9935,1.993,1.9925,1.9921,1.9917,1.9913,1.9909,1.9904,1.9901,1.9897,1.9893,1.9889,1.9886,1.9883,1.9879,1.9876,1.9873,1.987,1.9867,1.9864,1.9861,1.9858,1.9855,1.9852,1.985,1.9847,1.9845,1.9842,1.984,1.9837,1.9835,1.9833,1.983,1.9828,1.9826,1.9824,1.9822,1.982,1.9818,1.9816,1.9814,1.9812,1.981,1.9808,1.9806,1.9805,1.9803,1.9801,1.9799,1.9798,1.9796,1.9794,1.9793,1.9791,1.979,1.9788,1.9787,1.9785,1.9784,1.9782,1.9781,1.9779,1.9778,1.9777,1.9776,1.9774,1.9773,1.9772,1.9771,1.9769,1.9768,1.9767,1.9766,1.9765,1.9764,1.9762,1.9761,1.976,1.9759,1.9758,1.9757,1.9756,1.9755,1.9754,1.9753,1.9752,1.9751,1.975,1.9749,1.9748,1.9747,1.9746,1.9745,1.9744,1.9744,1.9743,1.9742,1.9741,1.974,1.9739,1.9739,1.9738,1.9737,1.9736,1.9735,1.9735,1.9734,1.9733,1.9732,1.9731,1.9731,1.973,1.9729,1.9729,1.9728,1.9727,1.9727,1.9726,1.9725,1.9725,1.9724,1.9723,1.9723,1.9722,1.9721,1.9721,1.972,1.972,1.9719];let s=a[len-1]*r/Math.sqrt(len);if(e){display("置信区间\n(置信度P=95%)",t.toPrecision(6)+" ± "+s.toPrecision(6))}}if($("#confidence99").prop("checked")){const a=[0,63.6551,9.9247,5.8408,4.6041,4.0322,3.7074,3.4995,3.3554,3.2498,3.1693,3.1058,3.0545,3.0123,2.9768,2.9467,2.9208,2.8983,2.8784,2.8609,2.8454,2.8314,2.8188,2.8073,2.797,2.7874,2.7787,2.7707,2.7633,2.7564,2.75,2.744,2.7385,2.7333,2.7284,2.7238,2.7195,2.7154,2.7115,2.7079,2.7045,2.7012,2.6981,2.6951,2.6923,2.6896,2.687,2.6846,2.6822,2.68,2.6778,2.6757,2.6737,2.6718,2.67,2.6682,2.6665,2.6649,2.6633,2.6618,2.6603,2.6589,2.6575,2.6561,2.6549,2.6536,2.6524,2.6512,2.6501,2.649,2.6479,2.6468,2.6459,2.6449,2.6439,2.643,2.6421,2.6412,2.6404,2.6395,2.6387,2.6379,2.6371,2.6364,2.6356,2.6349,2.6342,2.6335,2.6328,2.6322,2.6316,2.6309,2.6303,2.6297,2.6292,2.6286,2.628,2.6275,2.6269,2.6264,2.6259,2.6254,2.6249,2.6244,2.624,2.6235,2.623,2.6225,2.6221,2.6217,2.6212,2.6208,2.6204,2.62,2.6196,2.6192,2.6189,2.6185,2.6181,2.6178,2.6174,2.6171,2.6168,2.6164,2.6161,2.6158,2.6154,2.6151,2.6148,2.6145,2.6142,2.6139,2.6136,2.6133,2.613,2.6127,2.6125,2.6122,2.6119,2.6117,2.6114,2.6112,2.6109,2.6106,2.6104,2.6102,2.6099,2.6097,2.6094,2.6092,2.609,2.6088,2.6085,2.6083,2.6081,2.6079,2.6077,2.6075,2.6073,2.6071,2.6069,2.6067,2.6065,2.6063,2.6062,2.606,2.6058,2.6056,2.6054,2.6052,2.6051,2.6049,2.6047,2.6046,2.6044,2.6042,2.6041,2.6039,2.6037,2.6036,2.6034,2.6033,2.6031,2.603,2.6028,2.6027,2.6025,2.6024,2.6022,2.6021,2.6019,2.6018,2.6017,2.6015,2.6014,2.6013,2.6012,2.601,2.6009,2.6008,2.6007];let s=a[len-1]*r/Math.sqrt(len);if(e){display("置信区间\n(置信度P=99%)",t.toPrecision(6)+" ± "+s.toPrecision(6))}}}else{M.toast({html:"数据量过大，t表未录入！"})}}(function(e){"use strict";e.fn.extend({insertAtCaret:function(t,r=0){var a=e(this)[0];if(document.selection){this.focus();var s=document.selection.createRange();s.text=t;this.focus()}else if(a.selectionStart||a.selectionStart=="0"){var n=a.selectionStart;var o=a.selectionEnd;var l=a.scrollTop;a.value=a.value.substring(0,n)+t+a.value.substring(o,a.value.length);this.focus();a.selectionStart=n+t.length+r;a.selectionEnd=n+t.length+r;a.scrollTop=l}else{this.value+=t;this.focus()}}})})(jQuery);