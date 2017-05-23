$(function(){
	$.cookie.json = true;
	//读取购物车中的商品
	var products = $.cookie("products");
	console.log(products);
	var html = "";
	if(!products||products.length===0){
		$(".trMylo").show();
	}else{
		$.each(products, function(index,element) {			
		html = "<tr><td class='id'></td><td class='name'></td><td class='size'></td><td class='price'></td><td class='nowPrice'></td><td class='anmout'></td><td class='subtotal'></td><td class='opa'></td></tr>";
		console.log(element);
		var a = element.total * element.prePrice;
			$(html).appendTo(".tabBody").data("product",element)
			.children(".id").text(element.id).end()
			.children(".name").html("<img src='img/20181_stg_"+ element.id +".jpg' />" + element.name).end()
			.children(".size").text(element.size).end()
			.children(".price").html("¥"+"<span>"+element.nowPrice+"</span>").end()
			.children(".nowPrice").html("¥"+"<span>"+element.prePrice+"</span>").end()
			.children(".anmout").html("<span class='lefta'>-</span><input type='text' style='width: 20px;text-align:center;' value='" + element.total + "'><span class='righta'>+</span>").end()
			.children(".subtotal").html("¥"+"<span>"+a+"</span>").end()
			.children(".opa").html("<a href='javascript:;'>删除</a>");
		});
	
	}
	
	//删除 购物车中的物品
				function deleRou($row){
					var product = $row.data("product");
					//找出当前删除的这个元素在数组当中是第几个元素
					var index	=	$.inArray(product,products);
					//从数组中删除该索引出的元素
					products.splice(index,1);
					//将删除元素后的数组继续保存回cookie中
					$.cookie("products",products,{expires:7,path:"/"});
					//从页面删除行
					$row.remove();
					if(!products||products.length === 0){
						location.reload();
					}
//					calcTotal();
				}
				
				$(".opa a").click(function(){
					var $row =	$(this).parents("tr");
					//获取到缓存在行上的商品数据
					deleRou($row);		
					calcTotal();
				});
//				计算商品原价和商品折扣还有总价
				function calcTotal(){
					var total = 0;
					var delA  = 0;
					var allyuan = 0;
					$(".tabBody").find(".subtotal").each(function(index,element){
						total += parseFloat($(this).children("span").text());
					});
					
					$(".tabBody").find(".anmout").each(function(index,element){
						allyuan += parseFloat($(this).children("input").val()*$(this).parent().children(".price").children("span").text()); 
					});
					
					delA = allyuan - total;
					
					//显示出合计的金额
					$(".lijia>span").text(total);
					$(".allYuan").text(allyuan);
					$(".allDel").text(delA);
					
				}
				calcTotal();
//	$(".allYuan").text()
//先写删除所有行
	$("#clearall").click(function(){
//					alert("1");
					products="";
					$.cookie("products",products,{expires:7,path:"/"});
					$(".tabBody").remove();
					if(!products||products.length === 0){				
						location.reload();
					}
			});
//	这里开始写数量的加减,在页面上就可以进行的那个 恩 对的.
//	这里开始写加减乘除了.哈哈哈哈
	//加数量
				$(".righta").click(function(){
					var amount = parseInt($(this).prev().val());
					$(this).prev().val(amount+1);
					var price = parseFloat($(this).parent().parent().children(".nowPrice").children("span").text());
					$(this).parent().parent().children(".subtotal").children("span").text(price*(amount+1));				
					calcTotal();				
					$(this).parents("tr").data("product").total = amount+1;			
					$.cookie("products",products,{expires:7,path:"/"});
				});
				$(".lefta").click(function(){
					var amount = parseInt($(this).next().val());
					if(amount<=1){
						return;
					}
					$(this).next().val(amount-1);

					var price = parseFloat($(this).parent().parent().children(".nowPrice").children("span").text());
					$(this).parent().parent().children(".subtotal").children("span").text(price*(amount+1));				
					calcTotal();				
					$(this).parents("tr").data("product").total = amount-1;			
					$.cookie("products",products,{expires:7,path:"/"});
				})
//	下面是点击那个小叉叉就可以关掉横幅	
	$(".redHint span").on("click",function(){
		$(this).parent().remove();
	});
	$("#litIdt span").on("click",function(){
		$(this).parent().remove();
	});
});
