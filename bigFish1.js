function BigFish() {
	this.head=new Image();
	this.eye=new Image();
	this.tail=new Image();
	this.tailSrc=[];
	this.mousePos={};
	this.fishPos={};
	this._mouseEvent();
	this.tailIndex=0;

	this.timeJiange=0;    //确定尾巴摇动速度
	this.options={ 
		eyePos:{
			x:19,
			y:21
		},
		headPos:{
			x:0,
			y:0
		},
		tailPos:{
			x:40,
			y:6
		}
	};

	this._init();
	this._mouseEvent();
}
BigFish.prototype._init=function (){
	var count=0;

	this.tailSrc=["./src/bigTail0.png","./src/bigTail1.png","./src/bigTail2.png","./src/bigTail3.png","./src/bigTail4.png","./src/bigTail5.png","./src/bigTail6.png","./src/bigTail7.png"];
}
//鼠标移动事件
BigFish.prototype._mouseEvent=function (){
	var that=this;
	oCSurface.addEventListener('mousemove', function (ev){
		//console.log(111);
		that.mousePos={
			x:ev.offsetX,
			y:ev.offsetY-27     //减掉的27是鱼头高度
		}
	});

	oCSurface.addEventListener('mouseout', function (){
		this.onmousemove=null;
	});
}

BigFish.prototype.init=function (){
	this.head.src="./src/bigSwim0.png";
	this.eye.src="./src/bigEye0.png";
	this.tail.src=this.tailSrc[this.tailIndex];
	//画出大鱼
	this.drawFish(this.options);
	this.tailIndex++
	/*if(this.timeJiange>=100){
		this.timeJiange=0;
		this.tailIndex++
	}*/
	if(this.tailIndex>=this.tailSrc.length){
		this.tailIndex=0;
	}   
}

BigFish.prototype.drawFish=function (options){     //options中存储鱼头、眼睛、尾巴的位置
	ctx2.save();
	ctx2.clearRect(0, 0, ctxWidth, ctxHeight);
	if(this.mousePos.x){
		var angel=getAngel(this.mousePos, this.fishPos);
		var xChaju=this.mousePos.x-this.fishPos.x;
		var yChaju=this.mousePos.y-this.fishPos.y;
		this.fishPos.x+=xChaju*0.001*deltaTime;
		this.fishPos.y+=yChaju*0.001*deltaTime;
		ctx2.translate(this.fishPos.x, this.fishPos.y);
		ctx2.rotate(Math.PI-angel);

	}
	else{
		ctx2.translate(ctxWidth/2, ctxHeight/2);
		this.fishPos={
			x:ctxWidth/2,
			y:ctxHeight/2
		}
	}
	
	//ctx2.fillRect(0,0,100,100);
	ctx2.drawImage(this.head, options.headPos.x, options.headPos.y);
	ctx2.drawImage(this.eye, options.eyePos.x, options.eyePos.y);
	ctx2.drawImage(this.tail,options.tailPos.x,options.tailPos.y);
	ctx2.restore();

	this.timeJiange+=deltaTime;
}
