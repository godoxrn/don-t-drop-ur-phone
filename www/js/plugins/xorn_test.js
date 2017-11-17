
	function Window_Tips() {
    this.initialize.apply(this, arguments);
	}

	Window_Tips.prototype = Object.create(Window_Base.prototype);
	Window_Tips.prototype.constructor = Window_Tips;

	
	
	Window_Tips.prototype.initialize = function(x, y) {
		var width = this.windowWidth();
		var height = this.windowHeight();
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this.opacity = 0;
	};

	Window_Tips.prototype.windowWidth = function() {
		return 240; //自定义窗口的宽度
	};

	Window_Tips.prototype.windowHeight = function() {
		return this.fittingHeight(4); //自定义窗口的高度：通过设定窗口要容纳的行数来自动计算高度
	};

	getvar = function(){
		return  $gameVariables.value("1");
	};
	Window_Tips.prototype.update = function() {
		var x = this.textPadding();
		var width = this.contents.width - this.textPadding() * 2;
		this.contents.clear();

		//在这里绘制需要显示的内容
		this.drawIcon(191, 0, 0);
		this.drawText($gameVariables.value(15), 40, 0);
		
	};



	
	

var _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    this._tipsWindow = new Window_Tips(0, 0);
    this._tipsWindow.y = 0; //设置自定义窗口的Y坐标，由左上部的菜单命令窗口的Y轴坐标及其高度来决定
    this.addChild(this._tipsWindow);
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._transfer) {
        this.fadeInForTransfer();
        this._mapNameWindow.open();
        $gameMap.autoplay();
    } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
}