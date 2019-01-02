//用于画出canvas中的海草
function Haicao(){
	this.num=50;    //海草的数量
	//this.hShili=null;
	this.color='#311b49';   //海草的颜色
	this.posX=[];
	this.len=[];
	/*海草需要摆动，给它一个最大的摆动角度，比如10度*/
	this.deg=0;
	this.direction=true;   //海草摆动方向
	this.posTopX=[];     //存储摆动的海草顶部的位置
	this.posTopY=[];
}
//定位出海草所在位置以及海草的长度
Haicao.prototype.init=function (){
	for(var i=0; i<this.num; i++){
		this.posX[i]=(i+1)*800/this.num+Math.floor((Math.random()-1)*20);
		this.len[i]=200+Math.random()*50;
	}
}
//画出海草
Haicao.prototype.huacao=function (){
	ctx1.save();
	var color=this.color;
	if(this.direction){
		this.deg+=0.01*deltaTime;
		if(this.deg>=10){
			this.deg=10;
			this.direction=false;
		}
	}
	else{
		this.deg-=0.01*deltaTime;
		if(this.deg<=-10){
			this.deg=-10;
			this.direction=true;
		}
	}
	
	//var x=0, y=0;
	for(var i=0; i<this.num; i++){
		ctx1.beginPath();
		ctx1.lineCap="round";
		ctx1.moveTo(this.posX[i], 600);
		this.posTopX[i]=this.posX[i]+this.len[i]*Math.sin(this.deg*Math.PI/180);
		this.posTopY[i]=Math.abs(this.len[i]*Math.cos(this.deg*Math.PI/180));
		ctx1.quadraticCurveTo(this.posX[i],600-this.len[i]/2,this.posTopX[i], 600-this.posTopY[i]);
		ctx1.strokeStyle=this.color;
		ctx1.globalAlpha=0.6;
		ctx1.lineWidth=12;
		ctx1.stroke();
	}
	ctx1.restore();
}
