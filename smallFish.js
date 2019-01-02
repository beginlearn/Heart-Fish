function smallFish() {
	/*存放各种图片对象*/
	this.babyFade=[];       //小鱼头部变化图
	
	this.eyeImg=[];       //眼睛眨动图片
	this.zayan=false;     //鱼眼睛是睁着还是眨眼了
	this.zayanTime=0;     //鱼眼睛经过多长时间眨动

	this.head=[];       //存储小鱼的头部
	this.tail=[];   //存放尾巴的1张图片
	//确定各种图片加载多少张
	this.countObj={
		tail:{
			count:0
		},
		head:{
			count:0
		},
		babyFade:{
			count:0
		},
		eyeImg:{
			count:0
		}
	};

	//this.babyFishPos={};   //存储小鱼的位置
	console.log(this.fishPos.x);
	this.fishPos={
		x:ctxWidth/2+100,
		y:ctxHeight/2+this.fishHeight+100  //加的this.fishHeight（即23）是鱼头高度
	};

	this.fishHeight=23;    //鱼的头部图片，尺寸为41×46,23相当于是高度的一半，相当于鱼头处鱼嘴巴的位置
	//小鱼是以鱼眼睛为中心画出整条鱼的
	this.options={ 
		eyePos:{
			x:0,
			y:0
		},
		//使鱼以鱼嘴为中心转动
		headPos:{
			x:-21,
			y:-18
		},
		tailPos:{
			x:11,
			y:-14
		}
	};
	this._init();
}

smallFish.prototype=new BigFish();
smallFish.prototype.constructor=smallFish;

//小鱼的图片预加载
smallFish.prototype._init=function (){

	//var obj=[];   //存储尾巴图片对象
	var tailSrc=["./src/babyTail0.png"];
	var head=["./src/baby.png"];
	//bigEat的20张图片地址
	var babyFade=["./src/babyFade0.png","./src/babyFade1.png","./src/babyFade2.png","./src/babyFade3.png","./src/babyFade4.png","./src/babyFade5.png","./src/babyFade6.png","./src/babyFade7.png","./src/babyFade8.png","./src/babyFade9.png","./src/babyFade10.png","./src/babyFade11.png","./src/babyFade12.png","./src/babyFade13.png","./src/babyFade14.png","./src/babyFade15.png","./src/babyFade16.png","./src/babyFade17.png","./src/babyFade18.png","./src/babyFade19.png"];

	//bigEye的2张图片地址
	var bigEye=["./src/babyEye0.png","./src/babyEye1.png"];

	for(var i=0; i<tailSrc.length; i++){
		//var imgO=new Image();
		this.tail.push({
			src:tailSrc[i],
			img:new Image()
		});
		this.head.push({
			src:head[i],
			img:new Image()
		});
	}
	for(var i=0; i<babyFade.length; i++){
		this.babyFade.push({
			src:babyFade[i],
			img:new Image()
		});
	}
	for(var i=0; i<bigEye.length; i++){
		this.eyeImg.push({
			src:bigEye[i],
			img:new Image()
		});
	}

	//图片预加载，避免出现卡顿现象
	for(var j=0; j<tailSrc.length; j++){
		this._imgLoad(this.tail[j], 'tail');
		this._imgLoad(this.head[j],'head');
	}
	for(var j=0; j<bigEye.length; j++){
		this._imgLoad(this.eyeImg[j], 'eyeImg');
	}
	for(var j=0; j<babyFade.length; j++){
		this._imgLoad(this.babyFade[j], 'babyFade');
	}
}

//画出小鱼
smallFish.prototype.init=function (){
	//此处是如果鱼身上的各种图片没有预加载完全，就先不画这条鱼
	for(var key in this.countObj){
		if(this.countObj[key].count<this[key].length){
			//console.log(key+'-'+this.countObj[key].count+'-'+this[key].length);
			smallFishLoad=false;
			return;
		}
	}
	smallFishLoad=true;
	//画出小鱼
	this.drawFish(this.options);  

	//定义鱼睁着眼睛的持续时间，以及眨眼睛需要的时间。这个时间是为了让大鱼小鱼眨眼睛的时间分开
	if(this.zayanTime>=800 && this.zayanTime<=900){
		this.zayan=true;
	}
	else{
		this.zayan=false;
		if(this.zayanTime>900){
			this.zayanTime=0;
		}
	}
}

smallFish.prototype.drawFish=function (options){
	//更换鱼眼睛的图片对象
	var eye=null;
	if(this.zayan){
		eye=this.eyeImg[1].img;
	}
	else{
		eye=this.eyeImg[0].img;
	}

	ctx2.save();
	/*如果有这一句话，就无法画出大鱼；即大鱼和小鱼对象中，只需要一个对象清除一次画布即可
	ctx2.clearRect(0, 0, 800, 600); */   	
	if(!bigFish.fishPos.x){
		//console.log(typeof(this.fishPos.x)+'---'+this.fishPos.x);
		this.fishPos={
			x:ctxWidth/2+100,
			y:ctxHeight/2+this.fishHeight+100  //加的this.fishHeight（即23）是鱼头高度
		}
	}
	else{
		var angel=getAngel(bigFish.fishPos, this.fishPos);
		var xChaju=bigFish.fishPos.x-this.fishPos.x;
		var yChaju=bigFish.fishPos.y-this.fishPos.y; 
		this.fishPos.x+=xChaju*0.001*deltaTime;
		this.fishPos.y+=yChaju*0.001*deltaTime;
	}
	ctx2.translate(this.fishPos.x, this.fishPos.y);
	/*
		此部分是在图中加一个小方块，可以对比鱼的位置，确定旋转中心
		ctx2.fillStyle="red";
		ctx2.fillRect(0,0,50,50);
	*/

	ctx2.rotate(Math.PI-angel);
	
	ctx2.drawImage(this.head[0].img, options.headPos.x, options.headPos.y);
	ctx2.drawImage(eye, options.eyePos.x, options.eyePos.y);
	ctx2.drawImage(this.tail[0].img,options.tailPos.x,options.tailPos.y);
	ctx2.restore();

	this.zayanTime+=deltaTime;
}