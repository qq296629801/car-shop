/*
* 2015/4/14 周二天气 阴
* 在线咨询事件js模块（没有封装调用）
* */
(function(){
    var flag= 0,hoverTimer=null;
    //$("#online-consult").on("mouseover",".c-icon",function(){
    //    var parentEl=$(this).closest("#online-consult"),$this=$(this);
    //    if(flag==0){
    //        hoverTimer=setTimeout(function(){
    //            $this.animate({width:"90px",height:"90px"},350,function(){
    //                parentEl.find(".c-content").animate({left:"0"},800);
    //            });
    //        },500);
    //    }
    //});
    $(".c-icon","#online-consult").hover(function(){
        var parentEl=$(this).closest("#online-consult"),$this=$(this);
        if(flag==0){
            hoverTimer=setTimeout(function(){
                $this.animate({width:"90px",height:"90px"},350,function(){
                    parentEl.find(".c-content").animate({left:"0"},800);
                });
            },500);
        }
    },function(){
        clearTimeout(hoverTimer);
    });

    $("#online-consult").on("click",".no-need",function(){
        var contentBlock=$(this).closest(".c-content"),subIconObj=contentBlock.closest("#online-consult").find(".c-icon");
        flag=1;
        contentBlock.animate({left:"240px"},250,function(){
            subIconObj.animate({width:"60px",height:"60px"},300);
            flag=0;
         });
    });
    $(window).on("load scroll",function(){
        var bottomPos=$(document).height()-$(window).height()-$(document).scrollTop();
        if($(".tool-bar").length>0){
            setTimeout(function(){
                if($(".tool-bar").css("position")==="absolute"){
                    if(!$("#online-consult").hasClass("fixedPos")){
                        $("#online-consult").addClass("fixedPos");
                    }
                }else{
                    if($("#online-consult").hasClass("fixedPos")){
                        $("#online-consult").removeClass("fixedPos");
                    }
                }
            },20);

        }

    });
    setTimeout(function(){
        $(".c-icon","#online-consult").trigger("mouseover");
    },10000);
})();