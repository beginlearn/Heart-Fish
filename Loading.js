//Loading函数用于制作加载状态
function Loading(){
	this.pos=[{
			x:350,
			w:6,
			color:"blue",
			dir:'right'
		},
		{
			x:400,
			w:10,
			color:"red",
			dir:'left'
		},
		{
			x:450,
			w:6,
			color:'yellow',
			dir:'left'
		}
	];
}

Loading.prototype.init=function (){
	ctx3.clearRect(0, 0, ctxWidth, ctxHeight);
	for(var i=0; i<this.pos.length; i++){
		this.drawArc(this.pos[i]);
	}
	ctx3.font="20px Georgia";
	ctx3.fillText("loading......",350,350);
}

Loading.prototype.drawArc=function (options){

	//改变小球的位置
	if(options.dir==='right'){
		options.x+=2*0.1*deltaTime;
	}
	else{
		options.x-=0.1*deltaTime;
		//改变小球尺寸
		if(options.x>=400 && options.x<=450){
			options.w+=0.01*deltaTime;
		}
		else{
			options.w-=0.01*deltaTime;
		}
	}

	//防止小球移动的距离超出规定的位置
	if(options.x<=350){
		options.x=350;
		options.dir='right';
	}
	if(options.x>=450){
		options.x=450;
		options.dir='left';
	}

	//防止小球的尺寸超出规定
	if(options.w<=6){
		options.w=6;
	}
	if(options.w>=10){
		options.w=10;
	}
	
	ctx3.beginPath();
	ctx3.fillStyle=options.color;
	console.log(this.pos);
	ctx3.arc(options.x,300,options.w,0,2*Math.PI);
	ctx3.fill();
}