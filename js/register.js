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
	//接下来写登录的效果
	$(window).on("load",function(){
		$("#login_in").animate({"right":20},600);
	});
	
	
	$(".dl").on("click",function(){
		
		var idtext = $("#IDtext").val(),
			pstext = $("#passwordText").val();
		var reg1 = /^[1-9]\d{10}$/g,
			reg2 = /^[a-z0-9A-Z]{6,16}$/g,
			reg4 =/^\w+@\w+\.com$/g;
		$.cookie.json = true;
		var thisId = $.cookie("customer_information");
		
		if(!thisId||thisId.length===0){
			$.get(
		"data/message.json",
		function(data){
			var btnID=false;
			var nickaname;
			var array = eval(data);
			$.each(array, function(index,element) {

				if(idtext===element.data.phone&&pstext===element.data.password){
					btnID=true;
					nickaname = element.data.nickname;
				}
			});
			if(btnID){
				location="index.html";
				$.cookie("username",nickaname,{expires:7,path:"/"});
				
//				$(".notYOU").hide();
//				$(".IdLed").hide();
//				$(".PsLed").hide();
				$(".notYOU").hide();
			}else{
				$(".notYOU").show();
//				$(".IdLed").show();
				
			}
			
			if(idtext===""||(idtext.match(reg1)===null&&idtext.match(reg4)===null)){
			$(".IdLed").show();
			$(".notYOU").hide();
			}else{
				$(".IdLed").hide();
			}
			if(pstext===""||pstext.match(reg2)===null){
				$(".PsLed").show();	
				$(".notYOU").hide();
			}else{
				$(".PsLed").hide();	
			}
			
		},
		"text"
		)		
		}
		
	

		
		
		$.each(thisId,function(index,element){
			console.log(element);			
			if(idtext===element.id){
				if(pstext===element.pas){
					window.location="index.html";	
				}else{
				
			$.get(
		"data/message.json",
		function(data){
			var btnID=false;
			var nickaname;
			var array = eval(data);
			$.each(array, function(index,element) {

				if(idtext===element.data.phone&&pstext===element.data.password){
					btnID=true;
					nickaname = element.data.nickname;
				}
			});
			if(btnID){
				location="index.html";
				$.cookie("username",nickaname,{expires:7,path:"/"});
				
//				$(".notYOU").hide();
//				$(".IdLed").hide();
//				$(".PsLed").hide();
				$(".notYOU").hide();
			}else{
				$(".notYOU").show();
//				$(".IdLed").show();
				
			}
			
			if(idtext===""||(idtext.match(reg1)===null&&idtext.match(reg4)===null)){
			$(".IdLed").show();
			$(".notYOU").hide();
			}else{
				$(".IdLed").hide();
			}
			if(pstext===""||pstext.match(reg2)===null){
				$(".PsLed").show();	
				$(".notYOU").hide();
//				alert(1);
			}else{
				$(".PsLed").hide();	
//				alert(2);
			}
			
		},
		"text"
		)				
			}
			}
			else{
				
			$.get(
		"data/message.json",
		function(data){
			var btnID=false;
			var nickaname;
			var array = eval(data);
			$.each(array, function(index,element) {

				if(idtext===element.data.phone&&pstext===element.data.password){
					btnID=true;
					nickaname = element.data.nickname;
				}
			});
			if(btnID){
				location="index.html";
				$.cookie("username",nickaname,{expires:7,path:"/"});
				
//				$(".notYOU").hide();
//				$(".IdLed").hide();
//				$(".PsLed").hide();
				$(".notYOU").hide();
			}else{
				$(".notYOU").show();
//				$(".IdLed").show();
				
			}
			
			if(idtext===""||(idtext.match(reg1)===null&&idtext.match(reg4)===null)){
			$(".IdLed").show();
			$(".notYOU").hide();
			}else{
				$(".IdLed").hide();
			}
			if(pstext===""||pstext.match(reg2)===null){
				$(".PsLed").show();	
				$(".notYOU").hide();
//				alert(1);
			}else{
				$(".PsLed").hide();	
//				alert(2);
			}
			
		},
		"text"
		)				
			}
		});

	});
});