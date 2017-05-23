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
//	这里开始写放大镜了啊
//放大镜里面需要遮罩层和中等盒子成比例     中等盒子要和 大盒子成比例
	var popWidth = $(".pop").width(),
		popHeight = $(".pop").height(),
		middleWidth = $(".middle").width(),
		middleHeight = $(".middle").height(),
		bigWidth = $(".big").width(),
		bigHeight = $(".big").height(),
		rateX = bigWidth/popWidth,
		rateY = bigHeight/popHeight;
	$(".middle").hover(function(){
				$(".pop,.big").show();
			},function(){
				$(".pop,.big").hide();
			}).on("mousemove",function(event){
				//设置 。pop遮罩在文档中的绝对定位位置，将鼠标指针放置在遮罩居中的位置上
				$(".pop").offset({
					left:event.pageX-popWidth/2,
					top:event.pageY-popHeight/2
				});
				//获取。pop相对有定位的父元素。middle的相对定位的位置
				var position = $(".pop").position(),
					_top = position.top,
					_left = position.left;
					if(_top<0){
						_top=0;
					}else if(_top>middleHeight-popHeight){
						_top=middleHeight-popHeight;
					}
					if(_left<0){
						_left=0;
					}else if(_left> middleWidth-popWidth){
						_left = middleWidth-popWidth;
					}
					//重新设置相对位置
					$(".pop").css({
						left:_left,
						top:_top
					});
				//设置放大镜  .big 框中的位置
				$(".big img").css({
					top: - rateY * _top,
					left: - rateX * _left
				});
			});
			$(".small").on("click",function(){
				$(this).addClass("curr").siblings().removeClass("curr");
				var _src = $(this).children('img').attr('src');
				$('.middle img').attr("src",_src.replace("72_","474_"));
				$('.big img').attr('src',_src.replace("72_","1200_"));
			});	
		
//	这里要先写加入购物车的功能,加入购物车 即向cookie中存入这些所有的数据
	$("#leftBtn").on("click",function(){
		var num = $(".numAdd").text();
		num--;
		if(num<0){
			num=0;
		}
		$(".numAdd").text(num);
		
	});
	$("#rightBtn").on("click",function(){
		var num = $(".numAdd").text();
		num++;
		$(".numAdd").text(num);
	});
//	选择颜色
	$(".colorCloth").on("click",function(){
		$(".colorye").text($(this).children("span").text());
		$(this).css({"border-color":"red"}).siblings().css({"border-color":"#ccc"})
	});
	
	var thisSize;
	$(".numCloth").on("click",function(){
		thisSize = $(this).find("dt").text();
		$(this).css({"background":"red"}).siblings().css({"background":"none"});
	});
	$(".aljy2,.liyou").on("click",function(){
		var product = {
			id : $(".span2 span").text(),
			name : $(this).parent().parent().children("h4").children("span").text(),
			size : thisSize,
			prePrice : $(".sltm1").text(),
			nowPrice : $(".sltm2").text(),
			total    : $(".numAdd").text()
		};
		console.log(product);
					$.cookie.json = true;
					var products =  $.cookie("products");
					console.log(products);
					//判断是否读取到数组
					if(!products){
						//未读取到，说明是第一次添加购物车，则创建数组对象
						products = [];
					}
					//判断数组中是否存在当前选购的商品
					var index = findindex(product.id,products);
					//将当前次添加到购物车的商品包保存到数组中去
					if(index === -1){
						products.push(product);
					}else{
						products[index].total++;
					}
					//将数组保存回cookie中
					$.cookie("products",products,{expires:7,path:"/"});
					
					function findindex(id,as){
						for(var atrr in as){
							if(as[atrr].id === id){
								return atrr;
							}
						}
						return -1;
					}
//		console.log($.cookie("products"));
	});
		
		
		
		
		
		
		
		
		
		
		
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
		
		
		
//		这里是底部衣服的效果图
	function moveBig(obj){
				obj.each(function(index,element){
					var objW,objH,objWidth,objHeight;
					obj.eq(index).hover(function(){
							objW = $(this).width(),
							objH = $(this).height(),
							objWidth = objW *1.2,
							objHeight = objH *1.2;
						
						obj.eq(index).children("img").stop(true).animate({"width":objWidth,"height":objHeight},1000);
					},function(){
						obj.eq(index).children("img").stop(true).animate({"width":objW,"height":objH},1000);
					});
				});
			}
			moveBig($(".cloth"));
			
	

	var _ttTop = $(".f1").offset().top,
		winHeight = $(window).height();
		console.log(_ttTop);
	var isClick = false;
	$(window).on("scroll",function(){
		if(!isClick){
			//获取滚动距离
			var scrollTop = $(this).scrollTop();
			//判断什么时候显示滚动条
			if(scrollTop>_ttTop){
//				$(".f1").offset({"top":scrollTop});
				$(".f1").css({"position":"fixed"});
			}else{
				$(".f1").css({"position":"absolute"});
				return;
			}
			
			$(".floor").each(function(index,element){
						var _top = $(this).offset().top;//获取当前遍历到的楼层到文档中的距离顶部的绝对位置
						//判断是否该切换显示导航中楼层样式+9
						if(_top-winHeight/2 < scrollTop){
							$(".f1 li").eq(index).addClass("tismow").siblings().removeClass();
//							ind = index;
						}
						
			});	
			
			
		}
	});
	var ind;
//	下面写点击事件  点击谁 就到哪一层
	$(".ulzuo li").on("click",function(){
		isClick = true;
		$(this).addClass("tismow").siblings().removeClass();
		ind = $(this).index();
		var _top = $(".floor").eq(ind).offset().top;
//		$(".ulzuo").offset({"top":})
//		$(this).parents(".f1").css({"display":"fixed","top":0});
		$("html,body").stop(true).animate({"scrollTop":_top},1000,function(){
			isClick=false;
		});
	});
//	下面写提交评论的东西
	$(".clic").on("click",function(){
		if($(".neirong").val()===""){
			alert("你没有输入任何东西");
		}
		else{
			var html = "";
			html = "<li>"+$(".neirong").val()+"</li>";
			$(html).insertBefore($("#peopleDiscuss li:first"));
		}
		console.log($(".neirong").val());
	});

	
});