//============================================
//Xorn_RndGlassFloor.js
//============================================
/*:
*@plugindesc 随机玻璃关卡地图
*@author xorn

*@help

*/

function Xorn_GlassRnd(x,y){
	$gameMap._glassList =[];
	for(var i=0;i<x;i++){
		$gameMap._glassList.push([]);
		for (var j=0;j<y;j++){
			$gameMap._glassList[i].push(-1);
		}
	}
}