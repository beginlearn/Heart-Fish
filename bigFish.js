function BigFish() {
	this.head=new Image();  //初始化时，大鱼的默认图片
	/*存放各种图片对象*/
	this.bigEat=[];       //吃普通果实的图片
	this.bigEatBlue=[];   //吃蓝色果实的图片
	this.bigSwim=[];      //普通游动时的图片
	this.bigSwimBlue=[];  //蓝色游动时的图片
	this.eyeImg=[];       //眼睛眨动图片
	this.zayan=false;     //鱼眼睛是睁着还是眨眼了
	this.zayanTime=0;     //鱼眼睛经过多长时间眨动

	this.tail=[];   //存放尾巴的8张图片
	//确定各种图片加载多少张
	this.countObj={
		tail:{
			count:0
		},
		bigEat:{
			count:0
		},
		bigEatBlue:{
			count:0
		},
		bigSwim:{
			count:0
		},
		bigSwimBlue:{
			count:0
		},
		eyeImg:{
			count:0
		}
	};

	this.mousePos={};  //存储鼠标的位置
	this.fishPos={};   //存储大鱼的位置，这个是在制作小鱼游动时使用
	
	this.tailIndex=0;   // 尾巴摆动的图片索引

	this.timeJiange=0;     //鱼尾巴摆动的时间间隔
	this.fishHeight=27;    //鱼的头部图片，尺寸为50×55,27相当于是高度的一半，相当于鱼头处鱼嘴巴的位置
	this.options={ 
		eyePos:{
			x:19,
			y:-6
		},
		//使鱼以鱼嘴为中心转动
		headPos:{
			x:-5,
			y:-27
		},
		tailPos:{
			x:35,
			y:-21
		}
	};

	this._init();
	this._mouseEvent();
}

//鱼的初始化，主要是预加载图片
BigFish.prototype._init=function (){

	//var obj=[];   //存储尾巴图片对象
	var tailSrc=["./src/bigTail0.png","./src/bigTail1.png","./src/bigTail2.png","./src/bigTail3.png","./src/bigTail4.png","./src/bigTail5.png","./src/bigTail6.png","./src/bigTail7.png"];
	//bigEat的8张图片地址
	var bigEatImg=["./src/bigEat0.png","./src/bigEat1.png","./src/bigEat2.png","./src/bigEat3.png","./src/bigEat4.png","./src/bigEat5.png","./src/bigEat6.png","./src/bigEat7.png"];
	//bigEatBlue的8张图片地址
	var bigEatBlueImg=["./src/bigEatBlue0.png","./src/bigEatBlue1.png","./src/bigEatBlue2.png","./src/bigEatBlue3.png","./src/bigEatBlue4.png","./src/bigEatBlue5.png","./src/bigEatBlue6.png","./src/bigEatBlue7.png"];
	//bigSwim的8张图片地址
	var bigSwimImg=["./src/bigSwim0.png","./src/bigSwim1.png","./src/bigSwim2.png","./src/bigSwim3.png","./src/bigSwim4.png","./src/bigSwim5.png","./src/bigSwim6.png","./src/bigSwim7.png"];
	//bigSwimBlue的8张图片地址
	var bigSwimBlueImg=["./src/bigSwimBlue0.png","./src/bigSwimBlue1.png","./src/bigSwimBlue2.png","./src/bigSwimBlue3.png","./src/bigSwimBlue4.png","./src/bigSwimBlue5.png","./src/bigSwimBlue6.png","./src/bigSwimBlue7.png"];
	//bigEye的2张图片地址
	var bigEye=["./src/bigEye0.png","./src/bigEye1.png"];

	for(var i=0; i<tailSrc.length; i++){
		//var imgO=new Image();
		this.tail.push({
			src:tailSrc[i],
			img:new Image()
		});
		this.bigEat.push({
			src:bigEatImg[i],
			img:new Image()
		});
		this.bigEatBlue.push({
			src:bigEatBlueImg[i],
			img:new Image()
		});
		this.bigSwim.push({
			src:bigSwimImg[i],
			img:new Image()
		});
		this.bigSwimBlue.push({
			src:bigSwimBlueImg[i],
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
		this._imgLoad(this.bigEat[j],'bigEat');
		this._imgLoad(this.bigEatBlue[j],'bigEatBlue');
		this._imgLoad(this.bigSwim[j],'bigSwim');
		this._imgLoad(this.bigSwimBlue[j],'bigSwimBlue');
	}
	for(var j=0; j<bigEye.length; j++){
		this._imgLoad(this.eyeImg[j], 'eyeImg');
	}
}
//鼠标移动事件
BigFish.prototype._mouseEvent=function (){
	var that=this;
	oSurface.addEventListener('mousemove', function (ev){
		/*此处是解决一个小bug，因为drawFish方法中，判断this.mousePos.x是否存在，等于0时也被认为是假，
		当鼠标从canvas中移出时，大鱼可能会回到canvas中心位置，因此通过判断，让鼠标离开时，this.mousePos.x大于0*/
		var x=ev.offsetX;
		if(ev.offsetX<=0){
			x=1;
		}
		that.mousePos={
			x:x,
			y:ev.offsetY    
		}
	});
}

//在canvas中画出整条鱼，并跟随鼠标移动，其中鼠标与鱼的距离决定鱼游动的速度
BigFish.prototype.init=function (){
	//此处是如果鱼身上的各种图片没有预加载完全，就先不画这条鱼
	for(var key in this.countObj){
		if(this.countObj[key].count<this[key].length){
			bigFishLoad=false;
			return;
		}
	}
	bigFishLoad=true;
	//大鱼初始化时，鱼头时单独一个图片
	this.head.src="./src/big.png";
	//画出大鱼
	this.drawFish(this.options);

	//控制尾巴摆动速度,间隔50ms之后尾巴摇动至下一帧图片
	if(this.timeJiange>=50){
		this.timeJiange=0;
		this.tailIndex++
	}
	if(this.tailIndex>=this.tail.length){
		this.tailIndex=0;
	}   

	//定义鱼睁着眼睛的持续时间，以及眨眼睛需要的时间
	if(this.zayanTime>=1000 && this.zayanTime<=1100){
		this.zayan=true;
	}
	else{
		this.zayan=false;
		if(this.zayanTime>1100){
			this.zayanTime=0;
		}
	}
}

//与果实的碰撞检测
BigFish.prototype.eatFruit=function (){
	for(var i=0; i<fruit.pos.length; i++){
		if((Math.pow(Math.abs(this.fishPos.x-fruit.pos[i]['x']),2)+Math.pow(Math.abs(this.fishPos.y-fruit.pos[i]['y']),2))<=100){	
			fruit.pos[i]={};
			//console.log(fruit.fruitArr[i]);
		}
	}
}

//画出这条鱼，options中存储鱼头、眼睛、尾巴的位置
BigFish.prototype.drawFish=function (options){     
	//更换鱼眼睛的图片对象
	var eye=null;
	if(this.zayan){
		eye=this.eyeImg[1].img;
	}
	else{
		eye=this.eyeImg[0].img;
	}

	ctx2.save();
	ctx2.clearRect(0, 0, ctxWidth, ctxHeight);
	if(!this.mousePos.x){
		this.fishPos={
			x:ctxWidth/2,
			y:ctxHeight/2+this.fishHeight  //加的this.fishHeight（即27）是鱼头高度
		}
	}
	else{
		var angel=getAngel(this.mousePos, this.fishPos);
		var xChaju=this.mousePos.x-this.fishPos.x;
		var yChaju=this.mousePos.y-this.fishPos.y;   //减掉的27是鱼头高度
		this.fishPos.x+=xChaju*0.001*deltaTime;
		this.fishPos.y+=yChaju*0.001*deltaTime;
	}
	ctx2.translate(this.fishPos.x, this.fishPos.y);
	/*
		此部分是在图中加一个小方块，可以对比鱼的位置，确定旋转中心
		ctx2.fillStyle="red";
		ctx2.fillRect(0,0,5,5);
	*/

	ctx2.rotate(Math.PI-angel);
	
	ctx2.drawImage(this.head, options.headPos.x, options.headPos.y);
	ctx2.drawImage(eye, options.eyePos.x, options.eyePos.y);
	ctx2.drawImage(this.tail[this.tailIndex].img,options.tailPos.x,options.tailPos.y);
	ctx2.restore();

	this.timeJiange+=deltaTime;
	this.zayanTime+=deltaTime;
	this.eatFruit();
}

//图片预加载函数
BigFish.prototype._imgLoad=function (item, name){
	
	var img=item.img;
	var that=this;
	
	img.onload=function (){
		/*
			此处是为了测试Loading对象
			setTimeout(function (){
				that.countObj[name].count++;
			},1000);
		*/
		that.countObj[name].count++;
		img.onload=null;
	}
	img.onerror=function (){
		alert('图片加载失败！');
	}
	img.src=item.src;
}