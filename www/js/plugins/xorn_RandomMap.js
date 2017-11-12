(function(){
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'XornRandom') {
			newType(args[0]);
		}
		if (command === 'XornTeleport') {
			XornTeleport(args[0]);
		}
		if (command === 'XornTestTeleport') {
			XornTestTeleport(args[0],args[1],args[2]);
		}
	};
})();

function XornTestTeleport(drct,swch,flag){
	var mapid = $gameMap._mapId;
	var mapTemp = findThisMap();
	var str;
	flagB = true;
	if(flag === "false"){
		flagB = false;
	}
	str = mapTemp.sideto[drct].split(",")
	if (mapTemp.idto[Number(drct)] < 0){
		$gameSwitches.setValue(swch,flagB);
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
	debugger;
	var mapid = $gameMap._mapId;
	var group = $gameVariables._data[1001] || 0;
	for(var mapin in $gameMap._mapList[group]){
		if($gameMap._mapList[group][mapin].ID === mapid){
			return $gameMap._mapList[group][mapin];
		}
	}
	return -1;
}

const mapTotal = 1;
const mapX = 61;
const mapY = 61;
const _map1X = 31;
const _map1Y = 31;
	
var _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
  _Game_Map_initialize.call(this);
  this._mapPoints= [];
  this._mapList= [];
};

	
function newType(num){
	
	num = num||0;
	
	$gameMap._mapList = mapList.concat();
	
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
	
	var listTemp = 0;	
	
	var xShift;
	var yShift;	
	
	$gameMap._mapPoints[num][_map1X][_map1Y]=0;
	
	var mapCopy = $gameMap._mapList[listTemp].concat();
	
	mapCopy.delfst();
	
	mapCopy.shuffle();
	
	for(var x=0;x<500;x++){
		
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
	
}