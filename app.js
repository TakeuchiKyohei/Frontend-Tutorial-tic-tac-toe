// IDからオブジェクトを取得
function $(id){
  // オブジェクト取得
  return document.getElementById(id);
}

// click時に呼び出される関数
function click_action(event){
  // clickされたマス目のIDの取得
  let id = event.target.id;
  // IDからオブジェクトを取得
  let object = $(id);
  // オブジェクトにマークを記載
  object.value = "○";
}

// 画面を読み込んだ時の処理
function load(){
  // マス目にイベントを設定する
  $(0).onclick = click_action;
  $(1).onclick = click_action;
  $(2).onclick = click_action;
  $(3).onclick = click_action;
  $(4).onclick = click_action;
  $(5).onclick = click_action;
  $(6).onclick = click_action;
  $(7).onclick = click_action;
  $(8).onclick = click_action;
}

// 画面読み込み時のイベントの設定
window.onload = load;