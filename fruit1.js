//这个是产生果实的页面，规定画面上一直会有20个果实，当少于20个果实时随机产生新的果实，直到达到20个；
//屏幕上同时出现的蓝色果实不超过5个,不低于1个,"./src/blue.png"

function Fruit(){
	this.num=30;

	this.pos=[];   //存储果实生长所在的位置；
	this.posRipen=[];   //存储生长成熟的果实
	this.fruitArr=[];  //存储产生的果实
	this.width=[];    //存储果实生长过程的尺寸
	this.growSpeed=[];  //存储果实生长、浮动速度
	this.fruit=new Image();
	this.blue=new Image();
}
Fruit.prototype.fruitWidth=10;    //定义果实的尺寸
//随机产生30个果实，但是不让其生长，尺寸都是0；然后让其中的15个果实开始生长，并且监控生长的果实数量，如果有果实超出区域，就把果实再次设置为等待状态
Fruit.prototype.init=function (){
	for(var i=0; i<this.num; i++){
		this.fruit.src="./src/fruit.png";
		this.blue.src="./src/blue.png";
		//判断生出的果实时黄色还是蓝色
		this.fruitArr[i]=Math.random()-0.7>0 ? this.blue : this.fruit;
		//果实生长速度，并对速度大小进行限制，避免速度过快
		this.growSpeed[i]=0.01*Math.random()+0.001;
		if(this.growSpeed[i]>=0.01){
			this.growSpeed[i]=0.008;
		}

		var id=Math.floor(Math.random()*50);
		//避免出现重复的点位
		if(repeatArr(haicao.posX[id], this.pos)){
			this.pos[i]={
				x:haicao.posX[id],
				y:600-haicao.len[id]
			};
		}
		else{
			i--;
			continue;
		}
		this.width[i]=0;
	}
	//console.log(this.fruitArr);
}
//产生15个随机果实
Fruit.prototype.grow=function (){
	for(var i=0; i<this.num/2; i++){
		this.create(i);
		this.width[i]+=this.growSpeed[i]*deltaTime;
		if(this.width[i]>=this.fruitWidth){
			this.width[i]=this.fruitWidth;
		}
		//console.log(this.width[i]);
	}
}
//产生1个果实，并确定该果实是否向上飘还是在生长
Fruit.prototype.create=function (n){
	//console.log(haicao.posX);

	//因果实生长成熟，开始向上飘
	if(this.width[n]===this.fruitWidth){
		this.pos[n]['y']-=this.growSpeed[n]*10*deltaTime;
	}

	//果实上漂，不断重绘果实
	if(this.pos[n]['y']>=0){
		ctx1.drawImage(this.fruitArr[n], this.pos[n]['x']-this.width[n]/2,this.pos[n]['y']-this.width[n]/2, this.width[n],this.width[n]);
	}
	else{
		this._toZero(n);
		this.create(Math.floor(Math.random()*30));
	}
	
}
//若某个点位的果实消失或者被大鱼吃掉，就将该位置的数据归零，重新产生果实
Fruit.prototype._toZero=function (n){
	var id=Math.floor(Math.random()*50);
	if(repeatArr(haicao.posX[id], this.pos)){
		this.pos[n]={
			x:haicao.posX[id],
			y:600-haicao.len[id]
		};
		this.width[n]=0;
		this.fruitArr[n]=Math.random()-0.7>0 ? this.blue : this.fruit;
	}
	else{
		this._toZero(n);
	}
}

//确定某一个数据是否已经存在于数组中,此方法仅适用于特定数组形式，也可以将其定义为原型链上的方法
function repeatArr(data, arr){
	//此处应该用for循环，使用forEach得不到正确结果，与forEach函数默认返回值有关
	for(var i=0; i<arr.length; i++){
		if(arr[i]['x']===data){
			return false;
		}
	}
	return true;
}