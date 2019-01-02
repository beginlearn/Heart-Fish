//用于画出canvas中的海草
function Haicao(){
	this.num=50;    //海草的数量
	//this.hShili=null;
	this.color='#311b49';   //海草的颜色
	this.posX=[];
	this.len=[];
	/*海草需要摆动，给它一个最大的摆动角度，比如10度*/
	this.posTop=[];     //存储摆动的海草顶部的位置
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
	//var x=0, y=0;
	for(var i=0; i<this.num; i++){
		ctx1.beginPath();
		ctx1.lineCap="round";
		ctx1.moveTo(this.posX[i], 600);
		ctx1.lineTo(this.posX[i], 600-this.len[i]);
		ctx1.strokeStyle=this.color;
		ctx1.globalAlpha=0.6;
		ctx1.lineWidth=12;
		ctx1.stroke();
	}
	ctx1.restore();
}
/*Haicao.start=function (){
	if(this.hShili){
		return;
	}
	else{
		this.hShili=new Haicao(ctx1, 50, '#311b49');
	}
	return new Haicao(ctx1, 50, '#311b49');
}*/