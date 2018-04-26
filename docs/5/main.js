

// -----------------------------------------
// Hover要素管理クラス
// -----------------------------------------
HoverMgr = function(el, num) {

  // 操作する要素
  this.el = el;

  // チェックボックス
  this.checkbox = [];

  // マウス乗ってるかどうか
  this.isOver = false;

  // アニメーション中かどうか
  this.isPlaying = false;

  // 進捗度
  this.rate = 0;

  this.boxNum = num;

};

// 初期化
HoverMgr.prototype.init = function() {

  this.el.on('mouseover', this._eRollOver.bind(this)).on('mouseout', this._eRollOut.bind(this));

  for(var i = 0; i < this.boxNum; i++) {
    this.el.append('<input type="checkbox">')
  }

  this.el.find('input').each((function(i,e) {
    this.checkbox.push($(e));
  }).bind(this));

};

// 更新
HoverMgr.prototype.update = function() {

  var len = this.checkbox.length;
  var now = ~~(this.rate * (len + 1));
  for(var i = 0; i < len; i++) {
    var cb =  this.checkbox[i];
    if(i < now) {
      cb.attr('checked', true);
    } else {
      cb.attr('checked', false);
    }
  }

};

// ロールオーバー
HoverMgr.prototype._eRollOver = function() {

  this.isOver = true;
  if(!this.isPlaying) {
    this._startRollOver();
  }

};

// ロールアウト
HoverMgr.prototype._eRollOut = function(e) {

  this.isOver = false;
  if(!this.isPlaying) {
    this._startRollOut();
  }

};

// ロールオーバーのアニメーション
HoverMgr.prototype._startRollOver = function() {

  this.isPlaying = true;
  TweenMax.to(this, 0.4, {
    rate:1,
    ease:Power3.easeOut,
    onComplete:this._eCompleteRollOver.bind(this)
  });

};

// ロールアウトのアニメーション
HoverMgr.prototype._startRollOut = function() {

  this.isPlaying = true;
  TweenMax.to(this, 0.5, {
    rate:0,
    ease:Power3.easeInOut,
    onComplete:this._eCompleteRollOut.bind(this)
  });

};

// ロールオーバーのアニメーション終わり
HoverMgr.prototype._eCompleteRollOver = function() {

  this.isPlaying = false;
  if(!this.isOver) {
    this._startRollOut();
  }

};

// ロールアウトのアニメーション終わり
HoverMgr.prototype._eCompleteRollOut = function() {

  this.isPlaying = false;
  if(this.isOver) {
    this._startRollOver();
  }

};
// -----------------------------------------



hoverItems = [];


// 初期設定
init();
function init() {

  var itemNum = 30;
  var inputNum = 15;

  $('.mv').empty();

  for(var i = 0; i < itemNum; i++) {
    $('.mv').append('<a class="item js-hover" href="javascript:void(0)"></a>')
  }

  $('.js-hover').each(function(i,e) {
    var o = new HoverMgr($(e), inputNum);
    o.init();
    hoverItems.push(o);
  });

  update();

}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {
  var len = hoverItems.length;
  for(var i = 0; i < len; i++) {
    hoverItems[i].update();
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
