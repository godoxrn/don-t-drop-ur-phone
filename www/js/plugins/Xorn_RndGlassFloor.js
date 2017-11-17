//============================================
//Xorn_RndGlassFloor.js
//============================================
/*:
*@plugindesc 随机玻璃关卡地图
*@author xorn

*@help

*/

var checkFloor = function (evt){
	if ($gameSwitches.value(2)){
		var i = $gameMap._glassList.length;
		var j = $gameMap._glassList[0].length;
		var id = Number(evt._eventId);
		if($gameMap._glassList[(id-1)%i][Math.floor((id-1)/i)] === 0){
			var _mapId = _mapId || $gameMap.mapId();
			$gameSelfSwitches.setValue([_mapId,evt._eventId,"D"],true);		
		}
	}
}




function Xorn_GlassRnd(maxX,maxY,x,y,tx,ty){
	$gameMap._glassList =[];
	for(var i=0;i<maxX;i++){
		$gameMap._glassList.push([]);
		for (var j=0;j<maxY;j++){
			$gameMap._glassList[i].push(-1);
		}
	}
	Array.prototype.shuffle = function() {
	var n = this.length;
		while(n > 1) {
			n--;
			var k = Math.floor(Math.random()*(n+1));
			var v = this[k];
			this[k] = this[n];
			this[n] = v;
		}
	}	
	Array.prototype.delNum = function(num) {
		for(var i = 0;i< this.length;i++){
			if (this[i] === num){
				return this.splice(i,1)
			}
		}		
		return this;
	}
	
	x = x-1
	y = y-1
	tx = tx-1
	ty = ty-1
	
	var xShift = xShift||0;
	var yShift = yShift||0;		
	$gameMap._glassList[x][y]=0;	
	var lastTemp = [x,y];
	
	for(var i = 0;i<( maxX * maxY );i++){
	//先试试从上到下，没有后方
	
		var drct = [0,1,2,3];
				
		var nx = x+xShift;
		var ny = y+yShift;
		if((nx === 0)||(nx>lastTemp[0])){drct.delNum(1);}	
		if((ny === 0)||(ny>lastTemp[1])){drct.delNum(0);}	
		if((nx === maxX-1)||(lastTemp[0]>nx )){drct.delNum(3);}
		if((ny === maxY-1)||(lastTemp[1]>ny )){drct.delNum(2);}		
		
		if( y === 0 ){
			if(ty === maxY - 1){
				drct.delNum(0);	
				if ((ny === maxY - 1)&&(nx < tx)){drct.delNum(1);}	
				if ((ny === maxY - 1)&&(nx > tx)){drct.delNum(3);}
			}
			if(tx === 0){
				drct.delNum(3);
				if ((nx === 0)&&(ny < ty)){drct.delNum(0);}	
				if ((nx === 0)&&(ny > ty)){drct.delNum(2);}	
			}
			if(tx === maxX - 1){
				drct.delNum(1);
				if ((nx === maxX - 1)&&(ny < ty)){drct.delNum(0);}	
				if ((nx === maxX - 1)&&(ny > ty)){drct.delNum(2);}	
			}
		}
		if( y === maxY -1 ){
			if(ty === 0){
				drct.delNum(2);	
				if ((ny === 0)&&(nx < tx)){drct.delNum(1);}	
				if ((ny === 0)&&(nx > tx)){drct.delNum(3);}
			}
			if(tx === 0){
				drct.delNum(3);
				if ((nx === 0)&&(ny < ty)){drct.delNum(0);}	
				if ((nx === 0)&&(ny > ty)){drct.delNum(2);}	
			}
			if(tx === maxX - 1){
				drct.delNum(1);
				if ((nx === maxX - 1)&&(ny < ty)){drct.delNum(0);}	
				if ((nx === maxX - 1)&&(ny > ty)){drct.delNum(2);}	
			}			
		}
		if( x === 0 ){
			if(ty === 0){
				drct.delNum(2);	
				if ((ny === 0)&&(nx < tx)){drct.delNum(1);}	
				if ((ny === 0)&&(nx > tx)){drct.delNum(3);}
			}
			if(tx === maxX - 1 ){
				drct.delNum(1);
				if ((nx === maxX - 1)&&(ny < ty)){drct.delNum(0);}	
				if ((nx === maxX - 1)&&(ny > ty)){drct.delNum(2);}	
			}
			if(ty === maxY - 1){
				drct.delNum(0);
				if ((ny === maxY - 1)&&(nx < tx)){drct.delNum(1);}	
				if ((ny === maxY - 1)&&(nx > tx)){drct.delNum(3);}
			}			
		}
		if( x === maxX - 1 ){
			if(ty === 0){
				drct.delNum(2);	
				if ((ny === 0)&&(nx < tx)){drct.delNum(1);}	
				if ((ny === 0)&&(nx > tx)){drct.delNum(3);}
			}
			if(tx === 0 ){
				drct.delNum(3);
				if ((nx === 0)&&(ny < ty)){drct.delNum(0);}	
				if ((nx === 0)&&(ny > ty)){drct.delNum(2);}	
			}
			if(ty === maxY - 1){
				drct.delNum(0);
				if ((ny === maxY - 1)&&(nx < tx)){drct.delNum(1);}	
				if ((ny === maxY - 1)&&(nx > tx)){drct.delNum(3);}
			}			
		}
		
		
		var j = Math.randomInt(drct.length);
		lastTemp[0] = nx;
		lastTemp[1] = ny;
		
		if(drct[j]===0){yShift = yShift - 1;$gameMap._glassList[x+xShift][y+yShift]=0; console.log("("+(x+xShift) + "," + (y+yShift)+")" + "lastTemp" + lastTemp[0]+"," + lastTemp[1]);}
		if(drct[j]===1){xShift = xShift - 1;$gameMap._glassList[x+xShift][y+yShift]=0; console.log("("+(x+xShift) + "," + (y+yShift)+")"+ "lastTemp" + lastTemp[0]+"," + lastTemp[1]);}
		if(drct[j]===2){yShift = yShift + 1;$gameMap._glassList[x+xShift][y+yShift]=0; console.log("("+(x+xShift) + "," + (y+yShift)+")"+ "lastTemp" + lastTemp[0]+"," + lastTemp[1]);}
		if(drct[j]===3){xShift = xShift + 1;$gameMap._glassList[x+xShift][y+yShift]=0; console.log("("+(x+xShift) + "," + (y+yShift)+")"+ "lastTemp" + lastTemp[0]+"," + lastTemp[1]);}
		
		if((x+xShift === tx)&&(y+yShift === ty)){
			break;
		}
	}
	
	
}