

// -----------------------------------------
// Hover要素管理クラス
// -----------------------------------------
HoverMgr = function(el) {

  // 操作する要素
  this.el = el;

  // アニメーションさせる要素
  this.tg = this.el.find('> .inner');

  // マウス乗ってるかどうか
  this.isOver = false;

  // アニメーション中かどうか
  this.isPlaying = false;

};

// 初期化
HoverMgr.prototype.init = function() {

  this.el.on('mouseover', this._eRollOver.bind(this)).on('mouseout', this._eRollOut.bind(this));

  TweenMax.set(this.tg, {
    rotationX:0,
    rotationY:0,
    rotationZ:0
  });

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
  TweenMax.to(this.tg, 0.6, {
    rotationX:180,
    rotationY:180,
    rotationZ:180,
    backgroundColor:0xce371f,
    ease:Expo.easeOut,
    onComplete:this._eCompleteRollOver.bind(this)
  });

};

// ロールアウトのアニメーション
HoverMgr.prototype._startRollOut = function() {

  this.isPlaying = true;
  TweenMax.to(this.tg, 0.5, {
    rotationX:0,
    rotationY:0,
    rotationZ:0,
    backgroundColor:0xdb5392,
    ease:Expo.easeInOut,
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





// 初期設定
init();
function init() {

  $('.js-hover').each(function(i,e) {

    var o = new HoverMgr($(e));
    o.init();

  });

  update();

}

// 毎フレーム実行
// 今回は無視
window.requestAnimationFrame(update);
function update() {
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
