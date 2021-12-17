//名簿
const memberList = [
  "今井さん",
  "河田さん",
  "後藤さん",
  "澤田さん",
  "鈴木さん",
  "瀬古さん",
  "ノムラ",
  "小木曽さん",
  "堀部さん",
  "水野さん",
  "武藤さん",
  "諸戸さん",
  "安田さん",
  "谷藤さん",
  "堀部先生",
  "櫻井さん",
];

//もらってない人
const wait = [...memberList];
//残りのプレゼント
const gift = [...memberList];

//もらった後の組み合わせ
const matching = [];

const member = document.getElementById("member");
const from = document.getElementById("from");
const to = document.getElementById("to");
const btn = document.getElementById("btn");

//ロード時の実装
window.onload = () => {
  memberList.map((item, index) => {
    //タグを作成して属性を付与
    const div = document.createElement("div");
    div.innerText = item;
    div.id = item;
    div.className = "pointer";
    div.onclick = () => addFrom(item, index);
    //要素追加
    member.appendChild(div);
  });
};

//「誰の」のところに名前追加
function addFrom(item, index) {
  from.innerHTML = item;
  wait.splice(index, 1);
  btn.disabled = false;
}

//ボタンを押したとき
// ①乱数生成
// ②乱数に対応する人をピックアップ
// ③「誰に」に表示
// ④配列から削除
// ⑤組み合わせに追加
// ⑥「誰の」「誰に」を削除

btn.addEventListener("click", () => addTo());
function addTo() {
  //もらってない人がいなくなったらボタンを押せなくする
  if (gift.length === 0) {
    btn.disabled = true;
  }
  const random = Math.floor(Math.random() * gift.length); //①
  const takeGift = gift[random]; //②
  to.innerHTML = takeGift; //③
  gift.splice(random, 1); //④
  console.log(gift.length);
}
