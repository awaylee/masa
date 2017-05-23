$(function(){
	var goodLis = $("#goodsNav>.ulLeft li"),
		goodLens = goodLis.length,
		goodBox = $("#hideBox");
	$("#goodsNav").hover(function(){
		$("#goodsNav").css({"background":"#333331"});
		goodBox.css({"display":"block"});
		goodLis.css({"background":"#333331"});	
		$("#goodsNav>.ulRight li a").css({"color":"#fff"});
		$("#goodsNav>.ulLeft li a").css({"color":"#fff"});
		$("#goodsNav>.ulLeft li i").css({"background":"url( img/boultTop.jpg)"});
		goodBox.stop(true).animate({"height":254},1000);
	},function(){		
		$("#goodsNav").css({"background":"#fff"});
		goodLis.css({"background":"#fff"});	
		$("#goodsNav>.ulRight li a").css({"color":"#666877"});
		$("#goodsNav>.ulLeft li a").css({"color":"#666877"});
		$("#goodsNav>.ulLeft li i").css({"background":"url( img/boultBottom.jpg)"});	
		goodBox.stop(true).animate({"height":0},1000,function(){
			goodBox.css({"display":"none"});
		});
	});
	
	//接下来写移动到这个下面的盒子上会背景变色
	$("#hideBox li").hover(function(){
		$(this).css({"background":"#ebebeb"}).siblings().css({"background":"#fff"});
	},function(){
		$("#hideBox li").css({"background":"#fff"});
	});
	
	$(".applyStyle .lpoi").on("click",function(){
		$(this).addClass("yue").siblings().removeClass("yue");
	});
	$(".email").on("click",function(){
		$(".fom1").show();
		$(".fom2").hide();
	});
	$(".phone").on("click",function(){
		$(".fom1").hide();
		$(".fom2").show();
	});
	
	$(".check_box").on("click",function(){
		if($(this).is(":checked")){
//			$(this).parents(".ljyp3").siblings(".sub_mit").show();
			$(".sub_mit").show();
			$(".sub_mit1").hide();
		}else{
			$(".sub_mit").hide();
			$(".sub_mit1").show();
		}
	});
	
//	下面写一个失去焦点事件
	$(".pass_word1").blur(function(){
		var aPass = $(this).val();
//		alert(aPass.length);
		if(6<=aPass.length&&aPass.length<=9){
			$(".div1").addClass("jia").siblings().removeClass("jia");
		}else if(9<aPass.length&&aPass.length<=13){
			$(".div2").addClass("jia").siblings().removeClass("jia");
		}else if(13<aPass.length&&aPass.length<=16){
			$(".div3").addClass("jia").siblings().removeClass("jia");
		}else{
			$(".div3").removeClass("jia").siblings().removeClass("jia");
		}
	});
	
	
	$(".sub_mit").on("click",function(){
		var sbTn = true;
		var eMailZc = $(this).parent().find(".e_mail").val(),
			pass1word = $(this).parent().find(".pass_word1").val(),
			pass2word = $(this).parent().find(".pass_word2").val();
		var reg1 =/^[1-9]\d{10}$/g,
			reg2 =/^[1-9]\d{5}$/g,
			reg3 =/^[a-z0-9A-Z]{6,16}$/g,
			reg4 =/^\w+@\w+\.com$/g;
			console.log(eMailZc);
			console.log(pass1word);
			console.log(pass2word);
			//匹配电话号码先和邮箱
			if(eMailZc.match(reg1)===null&&eMailZc.match(reg4)===null){
				$(".zhanghu1").show();
				sbTn = false;
			}else{
				$(".zhanghu1").hide();
			}
			if(pass1word.match(reg3)===null){
				$(".mima11").show();
				sbTn = false;
			}
			else{
				$(".mima11").hide();
			}
		
		if(pass1word!=pass2word){
			$(".mima12").show();
			sbTn = false;
		}else{
			$(".mima12").hide();
		}
		//判断是否该账号已经存在
		
		$.get(
		"data/message.json",
		function(data){
			var array = eval(data);
			
			$.each(array, function(index,element) {
				if(eMailZc===element.data.phone){
					sbTn = false;
					alert("这个账号是存在的");
				}
			});
			console.log(sbTn);
			if(sbTn){
				var customer_information={
					id: eMailZc,
					pas : pass1word
				}
				$.cookie.json = true;
				var customer_informations =  $.cookie("customer_information");
				if(!customer_informations||customer_informations===null){
						customer_informations = [];
				}
				var index = findindex(customer_information.id,customer_informations);
					
					if(index === -1){
						customer_informations.push(customer_information);
						setTimeout(function(){
					window.location="register.html";
					
				},3000);
				alert("注册成功，页面将在三秒后跳转到登录面");
					}else{
						alert("该账号已存在");
					}
					//将数组保存回cookie中
					$.cookie("customer_information",customer_informations,{expires:7,path:"/"});
				
				
				function findindex(id,as){
						for(var atrr in as){
							if(as[atrr].id === id){
								return atrr;
							}
						}
						return -1;
					}
				
				
//				$.cookie("products",products,{expires:7,path:"/"});
			}else{
//				alert("该账号存在了"); 
			}
		},
		"text"
		)
		
		
		
	});

	
});