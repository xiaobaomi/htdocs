(function() {
	
	//轮播图的显示框 今天是11月前的一天
	var container = document.getElementById("container"),
	
		//所有的图片区域
		list = document.getElementById("list"),
		//图片跳转按钮
		buttons = document.getElementById("buttons"),
		
		//向左翻按钮
		prev = document.getElementById("prev"),
		
		//向右翻按钮
		next = document.getElementById("next"),
		
		//轮播图实现动态效果
		timer = null,
		
		//缓冲运动的定时器
		buffer = null,
		
		//缓冲运动的定时器锁
		bufferSuo = false,
		
		//代表当前显示的图片
		onIndex = 0;
		
		//页面跳转
		function animate(obj, target, zd) {
			//使用缓冲运动
			var zTarget = null;
			if(obj.buttons) {
				zTarget = obj.target;
			}else {
				zTarget = (parseInt(getComputedStyle(list).left) + obj.target); 
			}
			clearInterval(buffer);
			bufferSuo = true;
			
				buffer = setInterval(function() {
					var speed = (zTarget - parseInt(getComputedStyle(list).left)) / 8; //速度
					speed = speed > 0? Math.ceil(speed): Math.floor(speed);
					list.style.left =  (parseInt(getComputedStyle(list).left) + speed) + 'px';

					if(parseInt(getComputedStyle(list).left) === zTarget) {
						clearInterval(buffer);
						bufferSuo = false;
						if(zd && parseInt(getComputedStyle(list).left) === target) {
							list.style.left = zd;
						}
					}	
				}, 30);
			
			
			
			btnOn();
			
		}
		
		//改变按钮高亮
		function btnOn() {
			buttons.getElementsByClassName("on")[0].className = '';
			buttons.getElementsByTagName('span')[onIndex].className = 'on';
		};
		
		//向上点击
		prev.onclick = function() {
			if(bufferSuo) {
				return false;
			}
			onIndex--;
			if(onIndex === -1) {
				onIndex = 4;
			}
			animate({target: 600, buttons: false}, 0, "-3000px");
			
		};
		
		//向下点击
		next.onclick = function() {
			if(bufferSuo) {
				return false;
			}
			onIndex++;
			if(onIndex === 5) {
				onIndex = 0;
			}
			animate({target: -600, buttons: false}, -3600, "-600px");
			 
			
		};
		
		buttons.onclick = function(ev) {
			var event = ev || event,
			    target = event.target,
				IndexTarget = 0;
				
			if(target.tagName === "SPAN") {
				onIndex = parseInt(target.getAttribute('data_index')),
				IndexTarget = (-600 * onIndex) - 600; //目标
				
				//使用缓冲运动
				animate({target: IndexTarget, buttons: true});
			}	
		};
		
		IntervalFn();
		
		//取消定时器
		container.onmouseover = function() {
			clearInterval(timer);
		};
		
		//鼠标离开，触法定时器
		container.onmouseout = function() {
			IntervalFn();
		};
		
		//定义定时器
		function IntervalFn() {
			//图片每隔2秒跳转一次
			timer = setInterval(function () {
				next.click();
			}, 2000);
		};
})();