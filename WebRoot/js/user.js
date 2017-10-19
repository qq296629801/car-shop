
	  	function init(){
	  	     //关闭登陆
	  		 $(".login-box").hide();
			  //显示登录信息
			  $("#hmctb_holderplace_user").show();
			  //关闭登录界面
			  $(".jqmOverlay").hide();
	          $("#logframe").hide();
	  	}
	  	
	  	var flag=60; 
		function settime() { 
				if (flag == 0) { 
					$("#sendcc").html("发送确认码");
					flag = 60; 
				} else { 
					flag--; 
					$("#sendcc").html(flag+"秒后重发");
					setTimeout(function(){ settime(); }, 1000);
				} 
		} 
		
		function setCookie(name,value) 
		{ 
		    var Days = 1; 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() + Days*1*60*60*1000); 
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
		} 
		//读取cookies 
		function getCookie(name) 
		{ 
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		 
		    if(arr=document.cookie.match(reg))
		 
		        return unescape(arr[2]); 
		    else 
		        return null; 
		} 

		//删除cookies 
		function delCookie(name) 
		{ 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() - 1); 
		    var cval=getCookie(name); 
		    if(cval!=null) 
		        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
		} 
    $(function () {	
    	if(getCookie("falgcode")==3){
			 $("#valicode").show();
		 }
    	
    	$("#changeCode").click(function(){
    		var now = new Date();
    		 $("#img_code_1").attr("src","/user/img?v="+now.getTime()+"");
    	});
    	$("#changeCode2").click(function(){
    		var now = new Date();
    		 $("#img_code_1").attr("src","/user/img?v="+now.getTime()+"");
    	});
    	$("#phone2").blur(function(){
    		var phone=$("#phone2").val();
    		var val=$("#sendcc");
    		if(!IsInteger(phone)){
      			alert("手机号只能是数字！");
      		 }else if(!isMobile(phone)){
      			alert("不符合手机号的要求！");
      		 }
    	});
    	
    	$("#sendcc").click(function(){
    		var phone=$("#phone2").val();
    		var val=$("#sendcc");
    		if(!IsInteger(phone)){
      			alert("手机号只能是数字！");
      		 }else if(!isMobile(phone)){
      			alert("不符合手机号的要求！");
      		 }else{
      			if(phone!=""&&flag==60){
        			$.post("/user/send",{phone:phone},function(data){
        				console.log(data);
        				if(data.success){
        					settime();
        				}else{
        					alert("发送未成功！");
        				}
        			});
        		}
      		 }
    	});
    	$("#hmctb_btnLogout").click(function(){
   		 $.post("/user/logout",{},function(result){
   			 if(result){
   				 alert("注销成功！");
   				window.location.reload();
   			 }
   		 });
   		});
    	
    	$("#yeslogo").click(function(){
    		$(".jqmOverlay").show();
        	$("#logframe").show();
        	$("#regframe").hide();
    	});
    	
    	
    	
    	$("#noreg").click(function(){
    		$(".jqmOverlay").show();
        	$("#logframe").hide();
        	$("#regframe").show();
    	});
    	
    	$(".regClose").click(function(){
    		$(".jqmOverlay").hide();
        	$("#regframe").hide();
        	
    	});
    	$("#hmctb_btnReg").click(function(){
    		$(".jqmOverlay").show();
        	$("#regframe").show();
    	});
    	var falgcode=0;
    	$("#submitButton").click(function(){
    		 var user_name =$("#user_name").val();
    		 var pwd=$("#pwd").val();
    		 var code=$("#vcode").val();
    		 if(pwd==""){
    			 alert("密码不能为空！");
    			 return
    		 }
    		 if(user_name==""){
    			 alert("账号不能为空！");
    			 return
    		 }
    		 
    		 if(falgcode>=3){
    			 setCookie("falgcode",3); 
    			$("#valicode").show();
    		 }
    		 
    		 var a=$("#valicode").css("display")=='none';
    		 if(!a){
    			 if(code==""){
    				 alert("验证码不能为空！");
        			 return
    			 }
    		 }
    			 $.post("/user/login",{
    				 user_name:user_name,
    				 pwd:pwd,
    				 inputRandomCode:code
    				 },function(result){
         			  if(result!=false){
         				  //关闭登陆
         				  init(); 
         				  window.location.reload();
         			  }else{
         				  falgcode++;
         				  alert("登陆失败");
         			  }
      			 });
    		
    		 
    	});
    	$("#user_name2").blur(function(){
    		var name=$("#user_name2").val();
    		if(name!=""){
    			$.post("/user/findUserName",{userName:name},function(data){
        			if(data){
        				$("#msgText").html("账号已经注册！");
        			}
        		});
       		}
    	});
    	$("#user_name2").focus(function(){
    		$("#msgText").html("");
    	});
    	$("#submitButtonReg").click(function(){
    	var user_name =$("#user_name2").val();
   		var phone =$("#phone2").val();
   		 var pwd=$("#pwd2").val();
   		 var code=$("#code").val();
   		var nick_name=$("#nick_name2").val();
   		if(user_name==""){
   			alert("账号不能为空！");
  			return
   		}
   		if(phone==""){
   			alert("手机不能为空！");
  			return
   		}
   		if(pwd==""){
   			alert("密码不能为空！");
  			return
   		}
   		if(code==""){
   			alert("验证码不能为空！");
  			return
   		}
   		if(nick_name==""){
   			alert("姓名不能为空！");
  			return
   		}
   		if(!IsInteger(phone)){
  			alert("手机号只能是数字！");
  			return
  		 }
   		if(!isMobile(phone)){
  			alert("不符合手机号的要求！");
  			return
  		 }
   		$.post("/user/findUserName",{userName:user_name},function(data){
			if(data){
				alert("账号已经注册！");
			}else{
				$.post("/user/reg",{user_name:user_name,phone:phone,pwd:pwd,nick_name:nick_name,code:code},function(result){
	     			  if(result){
	     				  //关闭登陆
	     				  init(); 
	     				 alert("注册成功！~");
	     				window.location.reload();
	     			  }else{
	     				  alert("注册失败！~");
	     			  }
	     		 });
			}
		});
   		
  			
  		 
   	});
    	
    	$("#hmctb_btnLogin").click(function(){
    		if(getCookie("falgcode")==3){
      			 $("#valicode").show();
      		    }
    		var now = new Date();
    		$("#vcode").val("");
   		 $("#img_code_1").attr("src","/user/img?v="+now.getTime()+"");
    		$(".jqmOverlay").show();
        	$("#logframe").show();
    	});
    	$(".jqmClose").click(function(){
    		$(".jqmOverlay").hide();
        	$("#logframe").hide();
    	});
    	
		$("#mobile-contact-1").mouseover(function(){
		
		});
		$("#mobile-contact-2").mouseover(function(){
			$("#mobile-contact-div-2").css("display","block");
		});
		$("#mobile-contact-3").mouseover(function(){
			$("#mobile-contact-div-3").css("display","block");
		});
		$("#mobile-contact-4").mouseover(function(){
			$("#mobile-contact-div-4").css("display","block");
		});
		$("#mobile-contact-5").mouseover(function(){
		$("#mobile-contact-div-5").css("display","block");
	});
        
        $(document).click(function (e) {
            if ($(e.target).attr("id") !== "keyword") {
                $("#searchbox").hide();
            }
        });
        $("#keyword").focus(function () {
            if ($(this).val() == $(this).data("tip")) {
                $(this).val("").css({ color: "#333" });
            }
            $(this).parent().parent().addClass("search-box-focus");
        }).blur(function () {
            if ($(this).val() == "") {
                $(this).val($(this).data("tip")).css({ color: "#999" });
            }
            $(this).parent().parent().removeClass("search-box-focus");
        }).val($("#keyword").data("tip"));
        
    });
   
