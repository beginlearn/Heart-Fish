//画布宽度是800，高度是600，因此程序中出现的800或者600与此相关
		var oBox=document.getElementById('box');
		//获取背景canvas画布
		var oCbg=document.getElementById('bg');
		var ctx1=oCbg.getContext('2d');
		var ctxWidth=800;   //获取canvas标签的宽度和高度
		var ctxHeight=600;
		//获取表层canvas画布
		var oSurface=document.getElementById('biaomian');
		var ctx2=oSurface.getContext('2d');
		//获取遮罩层canvas画布
		var oZhezhao=document.getElementById('zhezhao');
		var ctx3=oZhezhao.getContext('2d');
		//对时间的要求，就是可以得到requstAnimationFrame函数的每次渲染间隔时间
		var lastTime=new Date().getTime();
		var currentTime=0;
		var deltaTime=0;

		//大鱼、小鱼各种图片是否加载完成
		var bigFishLoad=false;
		var smallFishLoad=false;
		//遮罩层是否删除
		var delZhezhao=true;