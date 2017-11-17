//============================================
//xorn_RandomMap.js
//============================================
/*:
*@plugindesc 随机地图用插件
*@author xorn


* @param mapTotal
* @desc  
* @default 5

* @param mapVar
* @desc  
* @default 100

*@help


*插件命令：
*XornRandom x 
*随机地图，x是地图集的id

*XornTeleport  x
*传送，0,1,2,3分别代表上，左，下，右


*脚本命令：
*XornTestTeleport(x,this,flag)
*用于测试当前门是否可开启，x为方向。
end
*/



(function(){
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'XornRandom') {
			XornRandom(args[0]);
		}
		if (command === 'XornTeleport') {
			XornTeleport(args[0]);
		}
		if (command === 'XornTestTeleport') {
			XornTestTeleport(args[0],args[1],args[2]);
		}
	};
})();

function XornTestTeleport(drct,evt,flag){
	var mapid = $gameMap._mapId;
	var mapTemp = findThisMap();
	var str;
	flagB = true;
	if(flag === "false"){
		flagB = false;
	}
	str = mapTemp.sideto[drct].split(",")
	if (mapTemp.idto[Number(drct)] < 0){
		//$gameSwitches.setValue(swch,flagB);
		var _mapId = _mapId || $gameMap.mapId();
		$gameSelfSwitches.setValue([_mapId,evt._eventId,"D"],true);		
	}
}


function XornTeleport(drct){
	var mapid = $gameMap._mapId;
	var mapTemp = findThisMap();
	var str;
	var a = Number(drct) + 2;
	if(a>3){
		a=a-4;
	}
	str = mapTemp.sideto[a].split(",")
	if (mapTemp.idto[Number(drct)] >= 0){
		$gamePlayer.reserveTransfer(mapTemp.idto[Number(drct)], Number(str[0]), Number(str[1]), 0, 0);
	}
}

var findThisMap = function (){
	var mapid = $gameMap._mapId;
	var param = PluginManager.parameters('xorn_randomMap');
	var mapVar = Number(param['mapVar']);
	
	var group = $gameVariables._data[mapVar] || 0;
	for(var mapin in $gameMap._mapList[group]){
		if($gameMap._mapList[group][mapin].ID === mapid){
			return $gameMap._mapList[group][mapin];
		}
	}
	return -1;
}

const mapX = 61;
const mapY = 61;
const _map1X = 31;
const _map1Y = 31;
	
var _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
  _Game_Map_initialize.call(this);
  this._mapPoints= [];
  this._mapList= [];
  this._glassList = [];
};
	
	

function XornRandom(num){
	
	num = num||0;
	
	$gameMap._mapList = JsonEx.makeDeepCopy(mapList);
	
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
	
	Array.prototype.delfst = function() {
		return this.splice(0,1)
	}
	
	//总共多少地图
	var param = PluginManager.parameters('xorn_randomMap');
	
	var mapTotal = String(param['mapTotal']);
	var mapVar = Number(param['mapVar']);
	
	$gameVariables.setValue(mapVar,num);
	debugger;
	
	
	
	while(true){
		
		$gameMap._mapPoints =[];
		for(var n=0;n<mapTotal;n++){
			$gameMap._mapPoints.push([]);
			for(var i=0;i<mapX;i++){
				$gameMap._mapPoints[n].push([]);
				for (var j=0;j<mapY;j++){
					$gameMap._mapPoints[n][i].push(-1);
				}
			}
		}
		
		var listTemp = num;			
		var xShift;
		var yShift;	
		
		$gameMap._mapPoints[num][_map1X][_map1Y]=0;	
	
		$gameMap._mapList = JsonEx.makeDeepCopy(mapList);
		
		var mapCopy = JsonEx.makeDeepCopy($gameMap._mapList[listTemp]);
		
		mapCopy.delfst();		
		mapCopy.shuffle();
	
		for(var x=0;x<9999;x++){
			
			xShift = 0;
			yShift = 0;
			
			idTemp = 0;
			
			var cont = true;
			
			while((mapCopy.length>0)&&(cont)){
				if ($gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]===-1){
					cont = false;
					break;
				}		
				
				var i0 = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[0] 
				var i1 = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[1]
				var i2 = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[2] 
				var i3 = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[3] 
				
				i0 = (i0 === -1 || i0 === idTemp)
				i1 = (i1 === -1 || i1 === idTemp)
				i2 = (i2 === -1 || i2 === idTemp)
				i3 = (i3 === -1 || i3 === idTemp)
							
				if(i0 && i1 && i2 && i3 ){
					break;
				}
				
				var rnd = Math.randomInt(4);
				
				if($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[rnd] !== -1){
					if ($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[rnd]===-2){
						var a = rnd + 2;
						if(a>3){
							a=a-4;
						}
						if($gameMap._mapList[listTemp][mapCopy[0].index].idto[a] === -1){
							mapCopy.shuffle();
							break;
						}					
						$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[rnd] = mapCopy[0].ID					
						$gameMap._mapList[listTemp][mapCopy[0].index].idto[a] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].ID
						
						var idT = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].ID
						
						if(rnd===0){yShift = yShift - 1;}
						if(rnd===1){xShift = xShift - 1;}
						if(rnd===2){yShift = yShift + 1;}
						if(rnd===3){xShift = xShift + 1;}
						
						
						$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift] = mapCopy[0].index;
						
						//如果上方地块已有
						if($gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift-1]!==-1){
							if(($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift-1]].idto[2]===-2)&&($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[0]===-2)){
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift-1]].idto[2] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].ID
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[0] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift-1]].ID
							}
						}
						if($gameMap._mapPoints[num][_map1X+xShift-1][_map1Y+yShift]!==-1){
							if(($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift-1][_map1Y+yShift]].idto[3]===-2)&&($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[1]===-2)){
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift-1][_map1Y+yShift]].idto[3] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].ID
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[1] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift-1][_map1Y+yShift]].ID
							}
						}
						if($gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift+1]!==-1){
							if(($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift+1]].idto[0]===-2)&&($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[2]===-2)){
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift+1]].idto[0] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].ID
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[2] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift+1]].ID
							}
						}
						if($gameMap._mapPoints[num][_map1X+xShift+1][_map1Y+yShift]!==-1){
							if(($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift+1][_map1Y+yShift]].idto[1]===-2)&&($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[3]===-2)){
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift+1][_map1Y+yShift]].idto[1] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].ID
								$gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[0] = $gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift+1][_map1Y+yShift]].ID
							}
						}
						
						
						mapCopy.delfst();
						break;
					}else{
						if($gameMap._mapList[listTemp][$gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift]].idto[rnd] !== idTemp){
							idTemp = $gameMap._mapPoints[num][_map1X+xShift][_map1Y+yShift];
							if(rnd===0){yShift = yShift - 1;}
							if(rnd===1){xShift = xShift - 1;}
							if(rnd===2){yShift = yShift + 1;}
							if(rnd===3){xShift = xShift + 1;}
							continue;
						}
						break;
					};
				}else{
					break;
				}			
			}		
			if(mapCopy.length === 0){
				break;
			}
			if(!cont){
				break;
			}
		}
		if(mapCopy.length === 0){
			break;
		}		
	}
	
}