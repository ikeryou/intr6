

passVal = "";
cnt = 0;
isPlus = true;

// 初期設定
init();
function init() {
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  if(cnt % 2 == 0) {
    el = $('.pass');
    el.val(passVal);

    if(isPlus) {
      passVal += "a";
    } else {
      passVal = passVal.substr(0, passVal.length - 1);
    }

    if(passVal.length >= el.width() * 0.175) {
      // passVal = "";
      isPlus = false;
    }

    if(passVal.length <= 0) {
      isPlus = true;
    }
  }

  cnt++;

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
