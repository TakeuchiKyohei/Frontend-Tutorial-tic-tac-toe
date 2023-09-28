// マークの宣言
const FIRST_MARK = "○";
const NEXT_MARK  = "×";

// ターン数
let count = 1;

// マス目のIDリスト
const IDS =[
  [0,1,2],
  [3,4,5],
  [6,7,8]
];

// 実行中のフラグ
let Run = true;

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

// 勝敗結果表示
function result(message){
  $("result").innerHTML = message;
  Run = false;
  // もう一度遊ぶボタンを表示
  $("again").style.display ="";
}

// click時に呼び出される関数
function click_action(event){
  // ゲーム実行中でなければ終了
  if (!Run){
    return;
  }
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
  // 勝敗判定
  if (judge_end()){
    return;
  }
  // ターン数を追加
  count ++;
  // 表示を切り替える
  change_display();
}

// 終了判定
function judge_end(){
  let end = false;
  // 横3マスが同じマーク
  for (let row=0;row < 3;row++){
    end = win(IDS[row][0],IDS[row][1],IDS[row][2]);
    if (end){
      result($(IDS[row][0]).value + "の勝ち");
      return true;
    }
  }
  // 縦3マスが同じマーク
  for (let col=0;col < 3;col++){
    end = win(IDS[0][col],IDS[1][col],IDS[2][col])
    if (end){
      result($(IDS[0][col]).value + "の勝ち");
      return true;
    }
  }
  // 斜め(右)3マスが同じマーク
  end = win(IDS[0][0],IDS[1][1],IDS[2][2])
  if (end){
    result($(IDS[0][0]).value + "の勝ち");
    return true;
  }
  // 斜め(左)3マスが同じマーク
  end = win(IDS[0][2],IDS[1][1],IDS[2][0])
  if (end){
    result($(IDS[0][2]).value + "の勝ち");
    return true;
  }

  // 引き分けの判定
  if (9 <=count ){
    result("引き分け");
    return true;
  }

  // ゲームが続行する場合はfalseを返す
  return false;
}

// 勝利を判定
function win(first_id, second_id, third_id){
  // 1つ目のマスがからの場合は処理を終了
  if ($(first_id).value == ""){
    return false;
  }
  // 2つ目のマスがからの場合は処理を終了
  if ($(second_id).value == ""){
    return false;
  }
  // 3つ目のマスがからの場合は処理を終了
  if ($(third_id).value == ""){
    return false;
  }
  // 3つのマスが同じ場合は勝利
  if ($(first_id).value  == $(second_id).value 
    &&$(second_id).value == $(third_id).value){
    return true;
  }
  // 3つのマスが同じじゃない場合は勝利ではない
  return false;
}

// もう一度遊ぶ
function reset_action(){
  // ターンを1に戻す
  count = 1;
  change_display();
  // マスを空にする
  for (let row=0;row < 3;row++){
    for (let col=0;col < 3;col++){
      $(IDS[row][col]).value = "";
    }
  }

  // 結果表示を空にする
  result("");

  // ゲームを実行中に戻す
  Run = true;

  // もう一度遊ぶボタンを非表示
  $("again").style.display = "none" ;
}

// 画面を読み込んだ時の処理
function load(){
  // マス目にイベントを設定する
  for (let row=0;row < 3;row++){
    for (let col=0;col < 3;col++){
      $(IDS[row][col]).onclick = click_action;
    }
  }
  $("again").onclick = reset_action;
  $("again").style.display = "none";
}

// 画面読み込み時のイベントの設定
window.onload = load;