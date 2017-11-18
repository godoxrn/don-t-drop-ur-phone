//============================================
//Xorn_RndGlassFloor.js
//============================================
/*:
*@plugindesc 随机玻璃关卡地图
*@author xorn
* @param soundBeamSwitch
* @desc  满足高频音波条件时，开启哪个自开关？
* @default D

* @param soundBeamTotal
* @desc  当前玻璃地板的总数量由哪个变量决定？
* @default 99


* @param soundBeamRng
* @desc  当前音波范围变量？
* @default 17

* @param soundBeamFloorName
* @desc  只有符合这个名字的事件才会被音波波及
* @default glassFloor

* @param glassSwitchTrue
* @desc  满足条件的地板触发自开关。
* @default C

* @param glassSwitchFalse
* @desc  不满足条件的地板触发自开关。
* @default B

*@help

首先建立地块事件
·事件id要保证从1~目标数量。
·使用checkFloor(this,x)来确定当前地块是否是危险地块。
·开关需要在参数中自己定义


然后建立一个事件
·调用Xorn_GlassRnd(maxX,maxY,x,y,tx,ty)方法。
·打开一个开关（id自定义）。程度会在变量（默认为99）中输入当前maxX*maxY的数量，以确认当前地块范围。


 checkFloor(this,num):
 ·this用来取到本事件的id，num用来输入当前需要识别的开关id。
 ·本函数用于判断当前事件是否是玻璃地板，并触发对应的自开关。
 
 Xorn_GlassRnd(maxX,maxY,x,y,tx,ty)
 ·用来为数组随机，确认哪个是危险地块，数组保存在$gameMap中，可以存档。
 ·必须先调用此事件才行。
 

*/

var checkFloor = function (evt,num){
	var param = PluginManager.parameters('Xorn_RndGlassFloor');
	var swchT = String(param['glassSwitchTrue']);
	var swchF = String(param['glassSwitchFalse']);
	
	if($gameSwitches.value(Number(num))){
		var i = $gameMap._glassList.length;
		var j = $gameMap._glassList[0].length;
		var id = Number(evt._eventId);
		if($gameMap._glassList[(id-1)%i][Math.floor((id-1)/i)] === 0){
			var _mapId = _mapId || $gameMap.mapId();
			$gameSelfSwitches.setValue([_mapId,evt._eventId,swchT],true);		
		}else{
			var _mapId = _mapId || $gameMap.mapId();
			$gameSelfSwitches.setValue([_mapId,evt._eventId,swchF],true);	
		}
	}
}

function soundBeamFloor(){	
	var param = PluginManager.parameters('Xorn_RndGlassFloor');
	var swch = String(param['soundBeamSwitch']);
	var fName = String(param['soundBeamFloorName']);
	var sVar = $gameVariables.value(Number(param['soundBeamTotal']));
	var rng = $gameVariables.value(Number(param['soundBeamRng']));
	for (var all_Event in $dataMap.events){			
		if (!$dataMap.events[all_Event]){
			continue;
		}
		
		if($dataMap.events[all_Event].id > sVar){
			continue;			
		}
		
		if($dataMap.events[all_Event].name !== fName){
			continue;
		}
						
		if(Math.abs($dataMap.events[all_Event].x-$gamePlayer._x)+Math.abs($dataMap.events[all_Event].y-$gamePlayer._y)<=rng){
			var _mapId = _mapId || $gameMap.mapId();
			$gameSelfSwitches.setValue([_mapId,$dataMap.events[all_Event].id,swch],true);		
		}
	}
}




function Xorn_GlassRnd(maxX,maxY,x,y,tx,ty){
	var param = PluginManager.parameters('Xorn_RndGlassFloor');
	var sVar = Number(param['soundBeamTotal']);
	$gameVariables.setValue(sVar,maxX*maxY);
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