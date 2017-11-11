//=============================================================================
// Yanfly Engine Plugins - Common Event Menu
// YEP_CommonEventMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_CommonEventMenu = true;

var Yanfly = Yanfly || {};
Yanfly.CEM = Yanfly.CEM || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 公共事件菜单
 * @author Yanfly Engine Plugins
 *
 * @param ---Defaults---
 * @default
 *
 * @param Default Icon
 * @desc Default icon used for common events.
 * @default 160
 *
 * @param Default Help
 * @desc Default help description text used for common events.
 * @default Use <Help Description> comment tag to add a help description.
 *
 * @param Default Subtext
 * @desc Default subtext used for common events.
 * @default Subtext here!
 *
 * @param Default Cancel Event
 * @desc Default common event used for cancel.
 * Leave at 0 to make it not apply an event or -1 to disable.
 * @default 0
 *
 * @param ---Main Settings---
 * @default
 *
 * @param Window X
 * @desc Default X position for the window.
 * This can be a formula.
 * @default 0
 *
 * @param Window Y
 * @desc Default Y position for the window.
 * This can be a formula.
 * @default this.fittingHeight(2)
 *
 * @param Window Width
 * @desc Default width for the window.
 * This can be a formula.
 * @default Graphics.boxWidth / 2
 *
 * @param Window Height
 * @desc Default height for the Window.
 * This can be a formula.
 * @default Graphics.boxHeight - this.fittingHeight(2)
 *
 * @param Window Columns
 * @desc The number of columns for the window.
 * This can be a formula.
 * @default 1
 *
 * @param Window Opacity
 * @desc The opacity of the window skin for the window.
 * This can be a formula.
 * @default 255
 *
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 公共事件菜单允许制作自定义菜单设置，当你使用它时，你可以选择你希望执行
 * 的公共事件列表产生一个菜单。这个公共事件菜单允许你显示帮助信息，图片和
 * 的公共事件列表产生一个菜单。这个公共事件菜单允许你显示帮助信息，图片和
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * 这个公共事件菜单可以通过插件命令制作。你可以创建不同的菜单列表。下面是
 * 一些例子。
 *
 *    SetCommonEventMenuSettings Default Setup
 *    ClearCommonEventMenu
 *    AddCommonEventMenu 1 2 3 4 5
 *    SetCommonEventMenuCancel 0
 *    OpenCommonEventMenu
 *
 * 如果你想知道更多设置细节，请详细阅读帮助文件
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * MV中公共事件并没有他们的标签栏，所以我们使用事件中的注释命令。你可以使
 * 用下面的语句来简便的创建菜单:
 *
 * Common Event Comment Tags:
 *
 *   <Menu Name: x>
 *   - 菜单名字，如果没有设置，则显示公共事件名字.
 *
 *   <Icon: x>
 *   - 菜单图标，如果没有设置，则显示插件参数里的值.
 *
 *   <Picture: x>
 *   - 菜单图片，如果没有设置，则不会显示.
 *
 *   <Help Description>
 *    text
 *    text
 *   </Help Description>
 *   - 设置帮助文本框，如果没有设置，则显示插件参数里的值.
 *
 *   <Subtext>
 *    text
 *    text
 *   </Subtext>
 *   - 设置帮助下标文本，如果没有设置，则显示插件参数里的值.
 *
 * ============================================================================
 * Lunatic Mode - Enabling/Disabling Common Events
 * ============================================================================
 *
 * 如果你有JavaScript经验，可以使用下面的标签
 *
 * Common Event Comment Tags:
 *
 *   <Menu Enable Eval>
 *    if ($gameSwitches.value(10)) {
 *      enabled = true;
 *    } else {
 *      enabled = false;
 *    }
 *   </Menu Enable Eval>
 *   - 开关10打开，菜单才可以选择.
 *
 * ============================================================================
 * Lunatic Mode - Showing/Hiding Common Events
 * ============================================================================
 *
 * 如果你有JavaScript经验，可以使用下面的标签:
 *
 * Common Event Comment Tags:
 *
 *   <Menu Visible Eval>
 *    if ($gameSwitches.value(20)) {
 *      visible = true;
 *    } else {
 *      visible = false;
 *    }
 *   </Menu Visible Eval>
 *   - 开关20打开，菜单才可以显示.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * 你可以使用下面的插件命令:
 *
 * Plugin Command:
 *
 *   ---
 *
 *   ClearCommonEventMenu
 *   - 清除公共事件菜单所有的事件:
 *
 *   ---
 *
 *   AddCommonEventMenu 1
 *      - or -
 *   AddCommonEventMenu 2, 3, 4, 5
 *      - or -
 *   AddCommonEventMenu 6 through 10
 *   - 添加公共事件.
 *
 *   ---
 *
 *   SetCommonEventMenuCancel 20
 *   - 设置取消按钮执行的公共事件.
 *
 *   ---
 *
 *   DisableCommonEventMenuCancel
 *   EnableCommonEventMenuCancel
 *   - 关闭取消按钮0.
 *
 *   DisableCommonEventMenuConfirm
 *   EnableCommonEventMenuConfirm
 *   - This will disable the confirm button for the common event menu from
 *   being pressed. This is made for those who wish to use the menu only as a
 *   list and not a selectable menu. The Enable version will reenable the
 *   confirm function.
 *
 *   ---
 *
 *   OpenCommonEventMenu
 *   - 打开公共事件菜单。如果你使用了 Battle Engine Core，你可以在战斗中打开它。
 *
 *   ---
 *
 *   CommonEventMenuX 0
 *   CommonEventMenuY this.fittingHeight(2)
 *   CommonEventMenuWidth Graphics.boxWidth / 2
 *   CommonEventMenuHeight Graphics.boxHeight - this.fittingHeight(2)
 *   CommonEventMenuOpacity 255
 *   CommonEventMenuColumns 1
 *   这些插件命令可以调整菜单位置，宽高，透明度，列数。确保这些插件命令在
 *   OpenCommonEventMenu命令之前
 *
 *   ---
 *
 *   ShowCommonEventMenuHelp
 *   HideCommonEventMenuHelp
 *   - 对于后面的打开菜单命令，隐藏菜单帮助窗口
 *
 *   ---
 *
 *   CommonEventMenuHelpX 0
 *   CommonEventMenuHelpY 0
 *   CommonEventMenuHelpWidth Graphics.boxWidth
 *   CommonEventMenuHelpHeight this.fittingHeight(2)
 *   CommonEventMenuHelpOpacity 255
 *   这些插件命令可以调整菜单帮助窗口位置，宽高，透明度。确保这些插件命令在
 *   OpenCommonEventMenu命令之前.
 *
 *   ---
 *
 *   ShowCommonEventMenuPicture
 *   HideCommonEventMenuPicture
 *   - 对于后面的打开菜单命令，隐藏菜单图片.
 *
 *   ---
 *
 *   CommonEventMenuPictureX Graphics.boxWidth / 2
 *   CommonEventMenuPictureY this.fittingHeight(2)
 *   CommonEventMenuPictureWidth Graphics.boxWidth / 2
 *   CommonEventMenuPictureHeight this.fittingHeight(10)
 *   CommonEventMenuPictureOpacity 255
 *   这些插件命令可以调整菜单图片位置，宽高，透明度。确保这些插件命令在
 *   OpenCommonEventMenu命令之前
 *
 *   ---
 *
 *   ShowCommonEventMenuSubtext
 *   HideCommonEventMenuSubtext
 *   - 对于后面的打开菜单命令，隐藏菜单下标文本.
 *
 *   ---
 *
 *   CommonEventMenuSubtextX Graphics.boxWidth / 2
 *   CommonEventMenuSubtextY Graphics.boxHeight - height
 *   CommonEventMenuSubtextWidth Graphics.boxWidth / 2
 *   CommonEventMenuSubtextHeight Graphics.boxHeight - this.fittingHeight(2) -
 *     this.fittingHeight(10)
 *   CommonEventMenuSubtextOpacity 255
 *   - 这些插件命令可以调整菜单下标文本位置，宽高，透明度。确保这些插件命令在
 *   OpenCommonEventMenu命令之前.
 *
 *   ---
 *
 *   SetCommonEventMenuSettings Default Setup
 *   SetCommonEventMenuSettings Basic Setup
 *   - 设置菜单为默认设置，或者对于列表和帮助的基本设置
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Added 'EnableCommonEventMenuCancel' and 'EnableCommonEventMenuConfirm' for
 * users who don't wish to clear out their whole common event menu.
 *
 * Version 1.01:
 * - Added 'DisableCommonEventMenuConfirm' plugin command for those who wish to
 * use the Common Event Menu as a list rather than a menu.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_CommonEventMenu');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CEMIcon = Number(Yanfly.Parameters['Default Icon']);
Yanfly.Param.CEMHelpDescription = String(Yanfly.Parameters['Default Help']);
Yanfly.Param.CEMSubtext = String(Yanfly.Parameters['Default Subtext']);
Yanfly.Param.CEMCancel = Number(Yanfly.Parameters['Default Cancel Event']);

Yanfly.Param.CEMWindowX = String(Yanfly.Parameters['Window X']);
Yanfly.Param.CEMWindowY = String(Yanfly.Parameters['Window Y']);
Yanfly.Param.CEMWindowWidth = String(Yanfly.Parameters['Window Width']);
Yanfly.Param.CEMWindowHeight = String(Yanfly.Parameters['Window Height']);
Yanfly.Param.CEMWindowColumns = String(Yanfly.Parameters['Window Columns']);
Yanfly.Param.CEMWindowOpacity = String(Yanfly.Parameters['Window Opacity']);


//=============================================================================
// DataManager
//=============================================================================

Yanfly.CEM.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.CEM.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_CommonEventMenu) {
    this.processCEMNotetags1($dataCommonEvents);
    Yanfly._loaded_YEP_CommonEventMenu = true;
  }
  
  return true;
};

DataManager.convertCommentsToText = function(obj) {
  var comment = '';
  var length = obj.list.length;
  for (var i = 0; i < length; ++i) {
    var ev = obj.list[i];
    if ([108, 408].contains(ev.code)) {
      comment += obj.list[i].parameters[0] + '\n';
    }
  }
  return comment.split(/[\r\n]+/);
};

DataManager.processCEMNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = this.convertCommentsToText(obj);

    obj.iconIndex = Yanfly.Param.CEMIcon;
    obj.description = Yanfly.Param.CEMHelpDescription;
    obj.picture = '';
    obj.menuSettings = {
      name: obj.name,
      subtext: Yanfly.Param.CEMSubtext,
      enabled: 'enabled = true',
      show: 'visible = true'
    };
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<MENU NAME:[ ](.*)>/i)) {
        obj.menuSettings.name = String(RegExp.$1);
      } else if (line.match(/<ICON:[ ](\d+)>/i)) {
        obj.iconIndex = parseInt(RegExp.$1);
      } else if (line.match(/<PICTURE:[ ](.*)>/i)) {
        obj.picture = String(RegExp.$1);
      } else if (line.match(/<HELP DESCRIPTION>/i)) {
        evalMode = 'help description';
        obj.description = '';
      } else if (line.match(/<\/HELP DESCRIPTION>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'help description') {
        obj.description += line + '\n';
      } else if (line.match(/<SUBTEXT>/i)) {
        evalMode = 'subtext';
        obj.menuSettings.subtext = '';
      } else if (line.match(/<\/SUBTEXT>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'subtext') {
        obj.menuSettings.subtext += line + '\n';
      } else if (line.match(/<MENU ENABLE EVAL>/i)) {
        evalMode = 'menu enable eval';
        obj.menuSettings.enabled = '';
      } else if (line.match(/<\/MENU ENABLE EVAL>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'menu enable eval') {
        obj.menuSettings.enabled += line + '\n';
      } else if (line.match(/<MENU VISIBLE EVAL>/i)) {
        evalMode = 'menu visible eval';
        obj.menuSettings.show = '';
      } else if (line.match(/<\/MENU VISIBLE EVAL>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'menu visible eval') {
        obj.menuSettings.show += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.CEM.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.CEM.Game_System_initialize.call(this);
    this.initCommonEventMenuSettings();
};

Game_System.prototype.initCommonEventMenuSettings = function() {
    this._commonEventMenuSettings = {
      mainX: Yanfly.Param.CEMWindowX,
      mainY: Yanfly.Param.CEMWindowY,
      mainW: Yanfly.Param.CEMWindowWidth,
      mainH: Yanfly.Param.CEMWindowHeight,
      mainC: Yanfly.Param.CEMWindowColumns,
      mainO: Yanfly.Param.CEMWindowOpacity,

    }
    this._commonEventMenuData = [];
    this._commonEventMenuCancel = Yanfly.Param.CEMCancel;
    this._commonEventMenuConfirm = true;
};

Game_System.prototype.getCommonEventMenuSettings = function(key) {
    if (this._commonEventMenuSettings === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuSettings[key];
};

Game_System.prototype.setCommonEventMenuSetupKey = function(key, value) {
    if (this._commonEventMenuSettings === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuSettings[key] = value;
};

Game_System.prototype.getCommonEventMenuData = function() {
    if (this._commonEventMenuData === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuData;
};

Game_System.prototype.clearCommonEventMenu = function() {
    if (this._commonEventMenuData === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuData = [];
};

Game_System.prototype.addCommonEventMenu = function(arr) {
    if (this._commonEventMenuData === undefined) {
      this.initCommonEventMenuSettings();
    }
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
      this._commonEventMenuData.push(arr[i]);
    }
};

Game_System.prototype.getCommonEventMenuCancel = function() {
    if (this._commonEventMenuCancel === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuCancel;
};

Game_System.prototype.setCommonEventMenuCancel = function(value) {
    if (this._commonEventMenuCancel === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuCancel = value;
};

Game_System.prototype.canCommonEventMenuConfirm = function() {
    if (this._commonEventMenuConfirm === undefined) {
      this.initCommonEventMenuSettings();
    }
    return this._commonEventMenuConfirm;
};

Game_System.prototype.setCommonEventMenuConfirm = function(value) {
    if (this._commonEventMenuConfirm === undefined) {
      this.initCommonEventMenuSettings();
    }
    this._commonEventMenuConfirm = value;
};

Game_System.prototype.setCommonEventMenuSettings = function(settings) {
    this._commonEventMenuSettings = settings;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CEM.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.CEM.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ClearCommonEventMenu') {
    $gameSystem.clearCommonEventMenu();
  } else if (command === 'AddCommonEventMenu') {
    this.addCommonEventMenu(args);
  } else if (command === 'OpenCommonEventMenu') {
    this.openCommonEventMenu();
  } else if (command === 'SetCommonEventMenuCancel') {
    $gameSystem.setCommonEventMenuCancel(parseInt(args[0]));
  } else if (command === 'DisableCommonEventMenuCancel') {
    $gameSystem.setCommonEventMenuCancel(-1);
  } else if (command === 'DisableCommonEventMenuConfirm') {
    $gameSystem.setCommonEventMenuConfirm(false);
  } else if (command === 'EnableCommonEventMenuCancel') {
    $gameSystem.setCommonEventMenuCancel(0);
  } else if (command === 'EnableCommonEventMenuConfirm') {
    $gameSystem.setCommonEventMenuConfirm(true);
  // Main Settings
  } else if (command === 'CommonEventMenuX') {
    $gameSystem.setCommonEventMenuSetupKey('mainX', this.argsToString(args));
  } else if (command === 'CommonEventMenuY') {
    $gameSystem.setCommonEventMenuSetupKey('mainY', this.argsToString(args));
  } else if (command === 'CommonEventMenuWidth') {
    $gameSystem.setCommonEventMenuSetupKey('mainW', this.argsToString(args));
  } else if (command === 'CommonEventMenuHeight') {
    $gameSystem.setCommonEventMenuSetupKey('mainH', this.argsToString(args));
  } else if (command === 'CommonEventMenuOpacity') {
    $gameSystem.setCommonEventMenuSetupKey('mainO', this.argsToString(args));
  } else if (command === 'CommonEventMenuColumns') {
    $gameSystem.setCommonEventMenuSetupKey('mainC', this.argsToString(args));
  } else if (command === 'SetCommonEventMenuSettings') {
    this.setCommonEventMenuSettings(this.argsToString(args));
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
    var str = '';
    var length = args.length;
    for (var i = 0; i < length; ++i) {
      str += args[i] + ' ';
    }
    return str.trim();
};

Game_Interpreter.prototype.addCommonEventMenu = function(args) {
    var str = this.argsToString(args);
    var array = [];
    if (str.match(/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)) {
      array = Yanfly.Util.getRange(parseInt(RegExp.$1), parseInt(RegExp.$2));
    } else if (str.match(/(\d+(?:\s*,\s*\d+)*)/i)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
    }
    $gameSystem.addCommonEventMenu(array);
};

Game_Interpreter.prototype.openCommonEventMenu = function() {
    if ($gameParty.inBattle() && !Imported.YEP_BattleEngineCore) return;
    SceneManager._scene.openCommonEventMenu(this._mapId, this._eventId);
    this.wait(10);
};

Game_Interpreter.prototype.setCommonEventMenuSettings = function(name) {
    var settings;
    if (name.match(/DEFAULT SETUP/i)) {
      settings = {
        mainX: Yanfly.Param.CEMWindowX,
        mainY: Yanfly.Param.CEMWindowY,
        mainW: Yanfly.Param.CEMWindowWidth,
        mainH: Yanfly.Param.CEMWindowHeight,
        mainC: Yanfly.Param.CEMWindowColumns,
        mainO: Yanfly.Param.CEMWindowOpacity,

      }
    } else if (name.match(/BASIC SETUP/i)) {
      settings = {
        mainX: 0,
        mainY: 'this.fittingHeight(2)',
        mainW: 'Graphics.boxWidth',
        mainH: 'Graphics.boxHeight - this.fittingHeight(2)',
        mainC: 1,
        mainO: 255,

      }
    }
    if (settings) $gameSystem.setCommonEventMenuSettings(settings);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

function Window_CommonEventMenu() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventMenu.prototype = Object.create(Window_Command.prototype);
Window_CommonEventMenu.prototype.constructor = Window_CommonEventMenu;

Window_CommonEventMenu.prototype.initialize = function() {
    var width = eval($gameSystem.getCommonEventMenuSettings('mainW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('mainH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('mainX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('mainY'));
    this._cols = eval($gameSystem.getCommonEventMenuSettings('mainC'));
    this._eventId = 0;
    Window_Command.prototype.initialize.call(this, x, y);
    this.deactivate();
    this.openness = 0;
};

Window_CommonEventMenu.prototype.isCancelEnabled = function() {
    return $gameSystem.getCommonEventMenuCancel() >= 0;
};

Window_CommonEventMenu.prototype.setPictureWindow = function(win) {
    this._pictureWindow = win;
};

Window_CommonEventMenu.prototype.setSubtextWindow = function(win) {
    this._subtextWindow = win;
};

Window_CommonEventMenu.prototype.isOkEnabled = function() {
    if (!$gameSystem.canCommonEventMenuConfirm()) return false;
    return Window_Selectable.prototype.isOkEnabled.call(this);
};

Window_CommonEventMenu.prototype.setup = function(mapId, eventId) {
    this._mapId = mapId;
    this._eventId = eventId;
    this.activate();
    this.relocateMainWindow();
    this.open();
    this.select(0);
    this.refresh();
};

Window_CommonEventMenu.prototype.item = function() {
    return $dataCommonEvents[this.currentExt()];
};


Window_CommonEventMenu.prototype.mapId = function() {
    return this._mapId;
};

Window_CommonEventMenu.prototype.eventId = function() {
    return this._eventId;
};

Window_CommonEventMenu.prototype.relocateMainWindow = function() {
    var width = eval($gameSystem.getCommonEventMenuSettings('mainW'));
    var height = eval($gameSystem.getCommonEventMenuSettings('mainH'));
    var x = eval($gameSystem.getCommonEventMenuSettings('mainX'));
    var y = eval($gameSystem.getCommonEventMenuSettings('mainY'));
    this._cols = eval($gameSystem.getCommonEventMenuSettings('mainC'));
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.opacity = eval($gameSystem.getCommonEventMenuSettings('mainO'));
};



Window_CommonEventMenu.prototype.maxCols = function() {
    return Math.max(1, this._cols);
};

Window_CommonEventMenu.prototype.makeCommandList = function() {
    var data = $gameSystem.getCommonEventMenuData();
    var length = data.length;
    for (var i = 0; i < length; ++i) {
      var id = data[i];
      var ce = $dataCommonEvents[id];
      if (!ce) continue;
      if (this.includes(ce)) {
        var name = '\\i[' + ce.iconIndex + ']' + ce.menuSettings.name;
        var enabled = this.isEnabled(ce);
        this.addCommand(name, 'commonEvent', enabled, id);
      }
    }
};

Window_CommonEventMenu.prototype.includes = function(ce) {
    if (!ce) return false;
    if (ce.menuSettings.name === '') return false;
    var visible = true;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(ce.menuSettings.show);
    return visible;
};

Window_CommonEventMenu.prototype.isEnabled = function(ce) {
    if (!ce) return false;
    var enabled = true;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(ce.menuSettings.enabled);
    return enabled;
};

ImageManager.loadPicBack = function(filename) {
    return this.loadBitmap('img/pictures/', filename, 0, false);
};

Window_CommonEventMenu.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var align = this.itemTextAlign();
    this.resetFontSettings();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.resetTextColor();
    this.drawTextEx(this.commandName(index), rect.x, rect.y);
		
	

};



//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.createCommonEventMenuWindows = function() {
  //  this.createCommonEventMenuHelpWindow();
    this.createCommonEventMenuWindow();
  //  this.createCommonEventMenuPictureWindow();
 //   this.createCommonEventMenuSubtextWindow();
};


Scene_Base.prototype.createCommonEventMenuWindow = function() {
    this._commonEventMenuWindow = new Window_CommonEventMenu();
	this._picBack = new Sprite(ImageManager.loadPicBack("phoneBack"));


	
  //  this._commonEventMenuWindow.setHelpWindow(this._commonEventMenuHelpWindow);
    if ($gameSystem.canCommonEventMenuConfirm()) {
      this._commonEventMenuWindow.setHandler('ok', 
        this.onCommonEventMenuOk.bind(this));
    }
    this._commonEventMenuWindow.setHandler('cancel', 
      this.onCommonEventMenuCancel.bind(this));
};


Scene_Base.prototype.openCommonEventMenu = function(mapId, eventId) {
	this._picBack.anchor=new Point(0.5,0.5);   //设置锚点到其正中心
    this._picBack.x=Graphics.boxWidth/2;       //设置Logo的x坐标
    this._picBack.y=Graphics.boxHeight/2;      //设置Logo的y坐标
    this._picBack.move(Graphics.boxWidth*7/8, Graphics.boxHeight*3/4-15, Graphics.Width, Graphics.Height);
	this.addChild(this._picBack);
    this.addChild(this._commonEventMenuWindow);
    if (!this._commonEventMenuWindow) return;
    this._commonEventMenuWindow.setup(mapId, eventId);
    this._active = false;
};

Scene_Base.prototype.closeCommonEventMenuWindows = function() {
    this._commonEventMenuWindow.close();
	if(this._picBack){this.removeChild(this._picBack);}
    this._active = true;
};

Scene_Base.prototype.onCommonEventMenuOk = function() {
    this.closeCommonEventMenuWindows();
    var id = this._commonEventMenuWindow.currentExt();
    this.commonEventMenuSetupList(id);
};

Scene_Base.prototype.onCommonEventMenuCancel = function() {
    this.closeCommonEventMenuWindows();
    var id = $gameSystem.getCommonEventMenuCancel();
    this.commonEventMenuSetupList(id);
};

Scene_Base.prototype.commonEventMenuSetupList = function(id) {
    var commonEvent = $dataCommonEvents[id];
    if (!commonEvent) return;
    var mapId = this._commonEventMenuWindow.mapId();
    if (mapId === $gameMap.mapId()) {
      var eventId = this._commonEventMenuWindow.eventId();
    } else {
      var eventId = 0;
    }
    if ($gameParty.inBattle()) {
      $gameTroop._interpreter.setupChild(commonEvent.list, eventId);
    } else {
      $gameMap._interpreter.setupChild(commonEvent.list, eventId);
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.CEM.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.CEM.Scene_Map_createAllWindows.call(this);
    this.createCommonEventMenuWindows();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.CEM.Scene_Battle_createAllWindows =
    Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    Yanfly.CEM.Scene_Battle_createAllWindows.call(this);
    this.createCommonEventMenuWindows();
};

//=============================================================================
// End of File
//=============================================================================
