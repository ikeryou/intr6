

// -----------------------------------------
// Hover要素管理クラス
// -----------------------------------------
HoverMgr = function(parent, id) {

  this.id = id;
  this.parent = parent;
  this.el;

  this.x = 0;
  this.y = 0;

  this.isFix = false;




  // チェックボックス
  this.checkbox = [];

  // マウス乗ってるかどうか
  this.isOver = false;

  // アニメーション中かどうか
  this.isPlaying = false;

  // 進捗度
  this.rate = 0;


};

// 初期化
HoverMgr.prototype.init = function() {

  //this.el.on('mouseover', this._eRollOver.bind(this)).on('mouseout', this._eRollOut.bind(this));

  this.parent.append('<input class="item" id="item' + this.id +'" type="checkbox">')
  this.el = $("#item" + this.id);

  // this.el.find('input').each((function(i,e) {
  //   this.checkbox.push($(e));
  // }).bind(this));

};

// 位置
HoverMgr.prototype.position = function(x, y) {

  this.x = x;
  this.y = y;

  this.el.css({
    left:this.x,
    top:this.y
  })

};

// 更新
HoverMgr.prototype.update = function() {

  // var len = this.checkbox.length;
  // var now = ~~(this.rate * (len + 1));
  // for(var i = 0; i < len; i++) {
  //   var cb =  this.checkbox[i];
  //   if(i < now) {
  //     cb.attr('checked', true);
  //   } else {
  //     cb.attr('checked', false);
  //   }
  // }

};


HoverMgr.prototype.check = function(bool, force) {

  if(this.isFix) {
    return
  }

  this.el.attr('checked', bool);

  if(force != null && force) {
    this.isFix = true;
  }

};
// -----------------------------------------



items = [];
minRange = 2;
stageSize = {width:0, height:0};
size = 13;
line = 40;
center = {x:0, y:0};
cnt = ~~(Math.random() * 10000);
debug = $('.debug input');


// 初期設定
init();
function init() {

  $('.mv').empty();

  var parent = $('.mv');
  parent.css({
    width:size * line,
    height:size * line
  });

  stageSize.width = size * line;
  stageSize.height = size * line;

  center.x = stageSize.width * 0.5 - size * 0.5;
  center.y = stageSize.height * 0.5 - size * 0.5;

  for(var x = 0; x < line; x++) {
    for(var y = 0; y < line; y++) {
      var o = new HoverMgr(parent, items.length);
      o.init();
      o.position(x * size, y * size);
      items.push(o);
    }
  }

  setFrame();

  update();

}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  var isDebug = debug.prop('checked');

  if(cnt % 60 == 0 || (isDebug)) {

    var len = items.length;
    for(var i = 0; i < len; i++) {
      item = items[i];
      item.update();
      item.check(false);
    }

    var date;
    if(isDebug) {
      date = new Date(cnt * 10);
    } else {
      date = new Date();
    }


    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // 秒針
    hari(stageSize.width * 0.4, map(second, 0, 360, 0, 60));

    // 長針
    hari(stageSize.width * 0.4, map(minute, 0, 360/60*59, 0, 59));

    // 短針;
    hari(stageSize.width * 0.3, map(hour, 0, (720/24)*23, 0, 23));

  }

  if(isDebug) {
    cnt += 10;
  } else {
    cnt++;
  }



  window.requestAnimationFrame(update);
}


function hari(length, angle) {

  var startX = center.x;
  var startY = center.y;

  var rad = radian(angle + 180) * -1;
  var endX = center.x + Math.sin(rad) * length;
  var endY = center.y + Math.cos(rad) * length;

  for(var i = 0; i <= 1; i += 0.05) {
    var dx = endX - startX;
    var dy = endY - startY;
    var x = startX + dx * i;
    var y = startY + dy * i;
    checked(x, y, false);
  }

}


function setFrame() {

  var radius = stageSize.width * 0.47;
  for(var angle = 0; angle <= 360; angle += 2) {
    var r = radian(angle);
    var x = center.x + Math.sin(r) * radius;
    var y = center.y + Math.cos(r) * radius;
    checked(x, y, true);
  }

}


function checked(x, y, force) {

  var minKey = 0;
  var min = 9999;
  var len = items.length;
  for(var i = 0; i < len; i++) {
    item = items[i];
    var dx = x - item.x;
    var dy = y - item.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    if(d < min) {
      min = d;
      minKey = i;
    }
    if(d <= minRange) {
      minKey = i;
      break;
    }
  }

   items[minKey].check(true, force);

}














// ----------------------------------------
// 度からラジアンに変換
// @val : 度
// ----------------------------------------
function radian(val) {
  return val * Math.PI / 180;
}

// ----------------------------------------
// ラジアンから度に変換
// @val : ラジアン
// ----------------------------------------
function degree(val) {
  return val * 180 / Math.PI;
}

// ----------------------------------------
// minからmaxまでランダム
// ----------------------------------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------
// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
// ----------------------------------------
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}
