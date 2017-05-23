$(function(){
	var lis = $("#boxTop li"),
		len = lis.length,
		nowIndex = 0,//当前的索引值
		nextIndex = 1,//下一次将要运动的索引值
		timer = null,
		liBtns = $("#boxBottom li");
	
	timer = setInterval(move,3000);
		
	//下面开始写鼠标移动到小的盒子上就会显示大盒子	
	$("#carouselBox").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(move,3000);
	});
	liBtns.each(function(index,element){
		liBtns.eq(index).hover(function(){
			nextIndex = index;
			liBtns.eq(index).addClass("showTime").siblings().removeClass();
			move();
		});
		
		
		
	});
	function move(){	
		if(nextIndex>=len){
			nextIndex=0;
		}	

			liBtns.eq(nextIndex).addClass("showTime").siblings().removeClass();
			
			lis.eq(nowIndex).stop(true).animate({opacity:0},1000);
			lis.eq(nextIndex).stop(true).animate({opacity:1},1000);
			nowIndex = nextIndex;
			nextIndex++;
	}
	
	//下面的js是把导航的那一大块弄出来
	
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
	
	//这里是top的效果
	$("#topGo").on("click",function(){
		$(window).scrollTop(0);
	});
	//这里写右边那一个侧栏的效果，鼠标滑过则变色，可以点击
	$("#lineNav li").hover(function(){
		$(this).css({"background":"red"}).siblings().css({"background":"#1f2120"}).parent().siblings().children("li").css({"background":"#1f2120"});
	},function(){
		$(this).css({"background":"#1f2120"});
	});
	
	$.get(
		"data/cloth.json",
		function(data){
			var html = "";
			$.each(data,function(index,element){
				html += "<li><a href='javascript:;'><img src='img/"+ element.url +"' alt='' /></a><p><a href='Description.html'>"+ element.text +"</a></p>	<p class='Lee'>"+ element.money +"</p>	<img class='beautiful' src='img/1113.png' alt='' /></li>"
			});
			$(html).appendTo(".addListw");
		},
		"json"
	)
	
	
});
