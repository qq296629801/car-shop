
var vehicleService = function () {
    this.init();
    this.buttonEvent();
};

vehicleService.prototype = {
    init: function() {
    }, 
    buttonEvent: function() {
		var selectCity = function() {
		    this.init()
		};
		selectCity.prototype = {init: function() {
		        this.bindEvent()
		    },selectEle: function() {
		    },bindEvent: function() {
		    	function closeCity(t){
		    		var city=["rb","yg","zhlh","yc","zhlhban","rbban"];
		    		for(var i in city){
		    			if(city[i]!=t){		    				
		    				$("#"+city[i]+"City").hide();
		    			}
		    		}
		    	}
		        function t(t) {
		            t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0
		        }
		        var i;
		        $(".search").on("click", function(n) {
		            t(n);
		            
		            var e = $(this), o = e.offset().left - 2, c = e.offset().top;
		            var cityName=e.attr("tp");
		            closeCity(cityName);
		            if(cityName == "zhlh" || cityName == "rb"|| cityName == "yg"  ||cityName == "yc"){
		            	o -= 197, c += 15, $("#"+cityName+"City").css({left: o,top: c}).show()
		            }else{
		            	i = $(this).parents(".fir").index(), 2 == i && (o -= 230), $("#"+cityName+"City").css({left: o,top: c}).show()
		            }
		            
		        }), $(document).on("click", function() {
		            $(".city").hide()
		        }), $(".city").each(function() {
		            $(this).find(".c-tou div").on("click", function(t) {
		                t || t.stopPropagation ? t.stopPropagation() : window.event.cancelBubble = !0, $(this).addClass("on").siblings().removeClass("on");
		                var i = $(this).index();
		                var cityName ="#"+$(this).parent().parent().attr("id");
		                
		                $(cityName+" .detal").hide().eq(i).show()
		            })
		        }), $(".detal").delegate("li", "click", function() {
		        	var cityStr = $(this).parents(".detal").parent().attr("id");
		        	
		        	var t = $(this).find("a").text();
		        	if(cityStr == 'rbCity'){// 保险rb入口
			            // 行使城市输入框
		        		$(".car-ban-right .sers").val(t), $(".city").hide();
			            // 行驶城市隐藏域
			            $("#rbcity").val($(this).find("a").attr("value"));
			            // 接口方式的行驶城市统一隐藏域
			            $("input[name=vehicleCity]").val($(this).find("a").attr("value"));
			            $("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=121&vehicleCity="+$("input[name=vehicleCity]").val());
		        	}else if(cityStr == 'zhlhCity'){
		        		 // 行使城市输入框
		        		$(".car-ban-right .sers").val(t), $(".city").hide();
			            // 行驶城市隐藏域
			            $("#zhlhcity").val($(this).find("a").attr("value"));
			            // 接口方式的行驶城市统一隐藏域
			            $("input[name=vehicleCity]").val($(this).find("a").attr("value"));
			            $("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=10001&type=0&vehicleCity=");
		        	}else  if(cityStr == 'ygCity'){
		        		 // 行使城市输入框
		        		$(".car-ban-right .sers").val(t), $(".city").hide();
			            // 行驶城市隐藏域
			            $("#ygcity").val($(this).find("a").attr("value"));
			            // 接口方式的行驶城市统一隐藏域
			            $("input[name=vehicleCity]").val($(this).find("a").attr("value"));
						$("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=120&type=2&vehicleCity=");
		        	}else  if(cityStr == 'ycCity'){
		        		 // 行使城市输入框
		        		$(".car-ban-right .sers").val(t), $(".city").hide();
			            // 行驶城市隐藏域
			            $("#yccity").val($(this).find("a").attr("value"));
			            // 接口方式的行驶城市统一隐藏域
			            $("input[name=vehicleCity]").val($(this).find("a").attr("value"));
			            $("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=202&type=0&vehicleCity=");
		        	}					
					else{
			            // 行使城市输入框
			            $(".fir").eq(i).find(".ser").val(t), $(".city").hide();
			            // 行驶城市隐藏域
			            var c="#"+$(".fir").eq(i).find(".search").attr("tp")+"city";
			            $(c).val($(this).find("a").attr("value"));
			            // 接口方式的行驶城市统一隐藏域
			            $("input[name=vehicleCity]").val($(this).find("a").attr("value"));
		        	}
		        	$("#errorspan").hide();
		        })
		    }}, new selectCity, function() {
		$("#baojiaurl").on("click",function(){
			if($("input[name=vehicleCity]").val()==""||$("input[name=vehicleCity]").val()=="undefined"){
				 $("#errorspan").show();
				 $("a#baojiaurl").attr("href","javascript:" ).removeAttr("target");
			 }else{
				if($(".c-pe-list ul li").eq(0).hasClass("c-pe-cur")){
					$("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=121&vehicleCity="+$("input[name=vehicleCity]").val()).attr("target", "_blank");;
				}else if($(".c-pe-list ul li").eq(1).hasClass("c-pe-cur")){
					$("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=120&type=2&vehicleCity="
							+$("input[name=vehicleCity]").val()).attr("target", "_blank");
					
				}else if($(".c-pe-list ul li").eq(2).hasClass("c-pe-cur")){
					$("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=10001&type=0&vehicleCity="
							+$("input[name=vehicleCity]").val());
				}
				else{
					$("a#baojiaurl").attr("href","//chexian.jd.com/vehicle/trade?companyCode=202&type=0&vehicleCity="
							+$("input[name=vehicleCity]").val());
				}
			 }
				
			})
		}();
		$('.closes').live("click", function() {
			$('.pantan').hide();
		});
		$('.hao-l').live('click',function(){
			var rulestarget = $(this).attr('rulestarget');
			$('#'+rulestarget).show();
			popUp.showLayer($('#activityDetailBg'));
		});
	
		
    }
};
function cityCheck(name){ 
	var type = $(name).val();
	if(type){
		return true;
	}
	return  false;
}
$(function () {
    new vehicleService();
});