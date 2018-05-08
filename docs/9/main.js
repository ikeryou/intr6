

// -----------------------------------------
//
// -----------------------------------------
Item = function(parent, id) {

  this.parent = parent;
  this.id = id;
  this.el;

  this.rate = 0;

  this.isFocus = false;

  this.onComplete;

  this.angle = 0;
  this.speed = 0;
  this.x = 0;
  this.y = 0;
  this.grav = 0;
  this.range = 0;

};

// 初期化
Item.prototype.init = function() {

  this.parent.append('<input class="item" id="item' + this.id + '" type="password">');
  this.el = $('#item' + this.id);



  this.reset();

};

// 更新
Item.prototype.update = function() {

  var w = this.el.width();
  var password = '';
  var len = ~~(w * 0.19 * this.rate);
  for(var i = 0; i < len; i++) {
    password += 'a';
  }
  this.el.val(password);

  var radius = Math.min(window.innerWidth, window.innerHeight) * 0.45;
  var cx = window.innerWidth * 0.5;
  var cy = window.innerHeight * 0.5;
  var angle = 180 + (360 / itemNum) * this.id;
  TweenMax.set(this.el, {
    x:cx + Math.sin(radian(angle)) * radius - w * 0.5,
    y:cy + Math.cos(radian(angle)) * radius,
    rotationZ:angle * -1,
    force3D:true
  });



  // if(this.isFocus) {
  //   this.el.attr('autofocus', true);
  // } else {
  //   this.el.attr('autofocus', false);
  // }

  // this.y += this.grav;
  //
  // TweenMax.set(this.el, {
  //   x:this.x,
  //   y:this.y,
  //   rotationZ:map(Math.sin(radian(this.angle)), 90 - this.range, 90 + this.range, -1, 1),
  //   force3D:true
  // });
  //
  // this.angle += this.speed;
  //
  // if(this.y >= window.innerHeight * 1.1) {
  //   this._reset();
  // }

};

Item.prototype.start = function() {

  this.el.focus();
  this.isFocus = true;
  this.rate = 0;
  TweenMax.to(this, speed, {
    rate:1,
    ease:Power0.easeNone,
    onComplete:this._eComplete.bind(this)
  });

};


Item.prototype._eComplete = function() {

  this.isFocus = false;
  this.onComplete(this.id);

};




//
Item.prototype.reset = function() {

  this.rate = 0;

  this.angle = Math.random() * 360;
  this.speed = random(-1, 1);
  this.x = random(0, window.innerWidth);
  this.y = -this.el.width() * 2;
  this.grav = random(2, 4);
  this.range = random(20, 40);

};
// -----------------------------------------



mv = $('.mv');
items = [];
speed = 0.3;
itemNum = 20;


// 初期設定
init();
function init() {

  mv.empty();

  for(var i = 0; i < itemNum; i++) {
    var item = new Item(mv, i);
    item.init();
    item.onComplete = _eComplete.bind(window);
    items.push(item);
  }

  items[0].start();

  update();

}


function _eComplete(id) {

  var next = id + 1;
  if(next >= items.length) {
    next = 0;
    for(var i = 0; i < items.length; i++) {
      items[i].reset();
    }
  }
  items[next].start();
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {
  var len = items.length;
  for(var i = 0; i < len; i++) {
    items[i].update();
  }
  window.requestAnimationFrame(update);
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
