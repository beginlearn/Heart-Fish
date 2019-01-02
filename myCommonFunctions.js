	/*pos1是新的目标点，pos2相当于原点，其数据格式为pos1={
		x:0,
		y:0
	}*/
function getAngel(pos1, pos2) {
	var deltaX=pos1.x-pos2.x;
	var deltaY=pos1.y-pos2.y;
	if(deltaX>0 && deltaY<=0){
		if(deltaY===0){
			return 0;
		}
		return Math.atan(-deltaY/deltaX);
	}
	else if(deltaX===0){
		if(deltaY<0){
			console.log(1111111);
			return Math.PI/2;
		}
		if(deltaY>0){
			return 3*Math.PI/2;
		}
	}
	else if(deltaX<0 && deltaY<=0){
		if(deltaY===0){
			return Math.PI;
		}

		return Math.PI-Math.atan(deltaY/deltaX);
	}
	else if(deltaX<0 && deltaY>0){
		return Math.atan(-deltaY/deltaX)+Math.PI;
	}
	else{
		return 2*Math.PI-Math.atan(deltaY/deltaX);
	}
}

