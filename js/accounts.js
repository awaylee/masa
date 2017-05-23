$(function(){
//	$(".ddtmo select")
	var opiu = $(".ddtmo select").eq(1).html();
	var opii = $(".ddtmo select").eq(2).html();
	$.get(
		"data/address.json",
		function(data){
			var html="";
			var arry = eval(data);
//			console.log(arry);
			var am = [];
			$.each(arry, function(index,element) {
//				console.log(element);
//				console.log(index)
				html += "<option>"+element.name+"</option>";
				am.push(element.name);
			});

			$(html).appendTo($(".ddtmo select").eq(0));
			var selected_val;
			$(".ddtmo select").eq(0).change(function(){
				
				
//		console.log($(".ddtmo select").eq(1));
				
				
				selected_val = $(".ddtmo select").eq(0).val();
//				console.log(selected_val);
			var indexaa = $.inArray(selected_val,am);
			var city = "";
			var bm = [];
			var areaa = "";
			var cm =[];
//				console.log(indexaa);
				if(indexaa>=0){
//					city = null;
					city +=	opiu;
					$.each(arry[indexaa].city,function(index,element){
//						console.log(element.name);
						
						city += "<option>"+element.name+"</option>";
						bm.push(element.name);
					});
					
					$(".ddtmo select").eq(1).html(city);
//					$(city).appendTo($(".ddtmo select").eq(1));
					$(".ddtmo select").eq(2).html(opii);
					var selected_val1;
					$(".ddtmo select").eq(1).change(function(){
						
					selected_val1 = $(this).val();
					console.log(selected_val1);
					var indexab = $.inArray(selected_val1,bm);
					console.log(indexab);
						if(indexab>=0){
							areaa="";
							areaa += opii;

							$.each(arry[indexaa].city[indexab].area,function(index,element){
								areaa += "<option>"+element+"</option>";
								cm.push(element);
							});
							$(".ddtmo select").eq(2).html(areaa);
//							$(areaa).appendTo($(".ddtmo select").eq(2));
						}
					});
					
				}
				
			});
//			console.log(selected_val);
			
		},
		"text"
	)
	
//	下面开始写商品信息结算页面的
	var products = $.cookie("products");
	var lalla = JSON.parse(products);
	var mRl = "";
	var ttm = "";
	$.each(lalla, function(index,element) {
		console.log(element);
		mRl="<tr><td class='id'>款号</td><td class='name'>商品</td><td class='size'>尺寸</td><td class='price'>原价</td><td class='nowPrice'>现价</td><td class='anmout'>数量</td><td class='subtotal'>小计</td></tr>";
		$(mRl).appendTo(".bolaa").
		children(".id").text(element.id).end()
		.children(".name").text(element.name).end()
		.children(".size").text(element.size).end()
		.children(".price").text(element.nowPrice).end()
		.children(".nowPrice").text(element.prePrice).end()
		.children(".anmout").text(element.total).end()
		.children(".subtotal").text(element.total*element.prePrice);
		
		
//		ttm ="<div class='res'><div class='sYuan'>商品原价</div><divclass='addPri'>+</div><div class='yFei'>运费</div><div class='jianPri'>-</div><div class='sZhe'>商品折扣</div><div class='squel'>=</div><div class='yFu'>应付金额</div></div>";

		$(".res:first").clone(true).appendTo("#result")
		.children(".sYuan").text(element.nowPrice*element.total).end()
		.children(".yFei").text(0).end()
		.children(".sZhe").text(element.nowPrice*element.total-element.prePrice*element.total).end()
		.children(".yFu").text(element.prePrice*element.total);
	});
	
//	if($("#settlement:checkbox:checked")){
//		
//	}
	var faBtn=false;
	var luBtn=false;
	$("#faBot").on("click",function(){
		faBtn = !faBtn;
		if(faBtn){
			$(".settleHead").show();
		}else{
			$(".settleHead").hide();
		}
	}); 
	$("#luoBt").on("click",function(){
		luBtn = !luBtn;
		if(luBtn){
			$(".beizhu").show();			
		}else{
			$(".beizhu").hide();
		}

	});
	$("#Submitorders").on("click",function(){
		var btn = false;
		if($("#yourName").val()===""){
			$(".lqw1").show();
			btn  = false;
		}else{
			$(".lqw1").hide();
			btn  = true;
		}
		if($("#address").val()===""){
			$(".lqw2").show();
			btn  = false;
		}else{
			$(".lqw2").hide();
			btn  = true;
		}
		if($("#phoneNumber").val()===""){
			$(".lqw3").show();
			btn  = false;
		}else{
			$(".lqw3").hide();
			btn  = true;
		}
//		if($("#yourName").val()===""||$("#address").val()===""||$("#phoneNumber").val()===""){
////			alert("请回去看看是什么没写");
//		}else{
	if(btn){
		window.location = "successAAAA.html";
	}
			
//		}
	});
	
	
})
