// マークの宣言
const FIRST_MARK = "○";
const NEXT_MARK  = "×";

// ターン数
let count = 1;

// IDからオブジェクトを取得
function $(id){
  // オブジェクト取得
  return document.getElementById(id);
}

// ターン判定
function turn_judge(){
  let turn = count % 2;
  return turn == 1;
}

// ターン表示を切り替える
function change_display(){
  if (turn_judge()){
    $("display").innerHTML = FIRST_MARK + "の番";
  }else{
    $("display").innerHTML = NEXT_MARK + "の番";
  }
}

// click時に呼び出される関数
function click_action(event){
  // clickされたマス目のIDの取得
  let id = event.target.id;
  // IDからオブジェクトを取得
  let object = $(id);
  // すでにマークが設定されている場合処理終了
  if (object.value != ""){
    return;
  }
  // オブジェクトにマークを記載
  if (turn_judge()){
    object.value = FIRST_MARK;
  }else{
    object.value = NEXT_MARK;
  }
  // ターン数を追加
  count ++;
  // 表示を切り替える
  change_display();
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