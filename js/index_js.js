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
	$("#boxTop img").on("click",function(){
		location = "Description.html";
	});
	$("#nextBo img").on("click",function(){
		location = "decation1.html";
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
	$("#hideBox li").hover(function(){
		$(this).css({"background":"#ebebeb"}).siblings().css({"background":"#fff"});
	},function(){
		$("#hideBox li").css({"background":"#fff"});
	});
	
	//接下来写那个无缝轮播的消息条
	var textLis = $("#messageLun li"),
		textLisLen = textLis.length,
		textLisWidth = textLis.width(),
		textLisIndex = 0,
		textLisTimer = null,
		textiSpeed = -2;
	var maxLens = Math.floor($("#messageLun").width()/textLisWidth);
	
	textLis.clone(true).appendTo($("#ulLun"));
	textLis.clone(true).prependTo($("#ulLun"));
	$("#ulLun").width(textLisWidth*($("#ulLun li").length));
	textLisIndex = 9;
	$("#ulLun").css({"left":-textLisWidth*textLisLen});
	usMove();
	function usMove(){
		textLisTimer = setInterval(function(){
			var _left = $("#ulLun").position().left;
			if(_left <= -textLisWidth*textLisLen*2){
				$("#ulLun").css({"left":0});
			}else{
			$("#ulLun").css({"left":_left+textiSpeed});
			}
		},50);
	}
	//如果鼠标移动上去那么就停止延时器  否则继续
	$("#messageLun").hover(function(){
		clearInterval(textLisTimer);
	},function(){
		usMove();
	});
//	接下来改这些下面那个动画了.鼠标移动上去的话他就自己变大 其他的变小
	$("#fashion li").hover(function(){
			$(this).stop(true).animate({"width":780,"height":465},1000).siblings().stop(true).animate({"width":140,"height":465},1000);
			$(this).children(".textBox").stop(true).animate({"width":378,"height":180,"right":0,"bottom":20},1000).parent().siblings().children(".textBox").stop(true).animate({"width":140,"height":257,"bottom":0},1000);
			$(this).children("img").stop(true).animate({"left":-140}).end().siblings().children("img").stop(true).animate({"left":0},1000);
		
	});
	//ok上面这个动画暂时是写完了
	//	下面改写下面那个大的轮播图了,这次只需要让他滚动就行了.三秒一次,
	
	var ulallWidth  = $("#nextBo ul").width();
	var ulallLength = $("#nextBo ul").length,
		ulTiomer    = null,
		firstUl     = $("#nextBo ul").eq(0).clone(true);
	$("#nextBo").append(firstUl);
	$("#nextBo").width($("#nextBo ul").length * ulallWidth);
	var lititles = $("#hotNav li");
	lititles.each(function(index,element){
		lititles.eq(index).hover(function(){
			lititles.eq(index).addClass("shinebi").siblings().removeClass();
			$("#nextBo").stop(true).animate({"left":-ulallWidth * index},1000);
			shineindex = index;
		});
	});
	
	$(".hotSall").hover(function(){
		clearInterval(ulTiomer);
	},function(){
		startAutoMoveNext();
	});
	
	var shineindex = 0;
	function startAutoMoveNext(){
	ulTiomer = setInterval(function(){			
			if($("#nextBo").position().left <= -(ulallLength) * ulallWidth){
				$("#nextBo").css({"left":0});
//				$("#nextBo").stop(true).animate({"left":$("#nextBo").position().left -ulallWidth},1000);
			}
			shineindex++;
			if(shineindex>=ulallLength){
				shineindex=0;
			}
				$("#nextBo").stop(true).animate({"left":$("#nextBo").position().left -ulallWidth},1000);
			lititles.eq(shineindex).addClass("shinebi").siblings().removeClass();

		},3000);
	}
	startAutoMoveNext();
//	下面开始写移动上去变大的效果
		var activity1 = $(".activetyTitle ul li");
		moveBig(activity1);
		function moveBig(obj){
			obj.each(function(index,element){
				
				var objW,objH,objWidth,objHeight;
				obj.eq(index).hover(function(){
					$(this).children(".introduce").addClass("bgreda");
						objW = $(this).width(),
						objH = $(this).height(),
						objWidth = objW *1.2,
						objHeight = objH *1.2;
					
					obj.eq(index).children("img").stop(true).animate({"width":objWidth,"height":objHeight},1000);
				},function(){
					$(this).children(".introduce").removeClass("bgreda");
					obj.eq(index).children("img").stop(true).animate({"width":objW,"height":objH},1000);
				});
			});
		}
		moveBig($(".cloth"));
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
	
	
	if($.cookie("username")){
		$(".dengluba").hide();
		$(".zhuxiao").show();
		$(".zhuxiao").find("span").text($.cookie("username"));
	}
	$(".zhu").on("click",function(){
		$.removeCookie("username",{path:"/"});
		location.reload();
	});
	
	
	
	
	
	console.log($.cookie("username"))
//	下面开始写楼梯的效果
	$(window).on("scroll",function(){
		
		var scrollTop = $(this).scrollTop();
		if(scrollTop>$("#carouselBox").offset().top){
			$("#floorTopall").stop(true).fadeIn();
			
		}
		else{
			$("#floorTopall").stop(true).fadeOut();
			return;
		}
		
	});

		
});