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

//残りのプレゼント
const gift = [...memberList];

//もらった後の組み合わせ
const matching = [];

const btnStyle = "pointer border-black border border-solid rounded-full p-4";
const memberStyle = `${btnStyle} shadow-lg bg-white`;

let timeId;

const member = document.getElementById("member");
const from = document.getElementById("from");
const to = document.getElementById("to");
const btn = document.getElementById("btn");
const matchDisplay = document.getElementById("match");

//ロード時の実装
window.onload = () => {
  memberList.map((item, index) => {
    //メンバーのタグを作成して属性を付与
    const div = document.createElement("div");
    div.innerText = item;
    div.id = item;
    div.className = memberStyle;
    div.onclick = () => addFrom(item, index);
    //要素追加
    member.appendChild(div);
  });
};

// 名前を押したときの処理
// ①「from」に名前を追加
// ②名前一覧の色変更
// ③ボタンを押せなくする
// ④「誰へ」の欄がランダムで変わる
// *「from」に名前がある場合はクリック不可
// *「from」と同じ名前をクリックすると戻る
function addFrom(item, index) {
  if (from.innerHTML === "") {
    from.innerHTML = item; //①
    const name = document.getElementById(item);
    name.className = `${btnStyle} bg-black`; //②
    btn.disabled = false; //③
    if (!timeId) {
      timeId = setInterval(() => {
        const random = Math.floor(Math.random() * gift.length);
        const name = gift[random];
        to.innerHTML = name;
      }, 300);
    }
  } else if (from.innerHTML === item) {
    resetName();
  }
}

//「誰から」を押したとき
// ①指名のキャンセル
// ②名前一覧の変色を戻す
// *名前が無いときは無反応
from.addEventListener("click", () => clearName());
function clearName() {
  if (from.innerHTML) resetName();
}

function resetName() {
  const name = document.getElementById(from.innerHTML);
  name.className = memberStyle;
  from.innerHTML = "";
  btn.disabled = true;
  if (timeId) {
    clearInterval(timeId);
    to.innerHTML = "";
  }
}

//ボタンを押したとき
// ①乱数生成
// ②乱数に対応する人をピックアップ
// ③「誰に」に表示
// ④配列から削除
// ⑤組み合わせ配列に追加
// ⑥組み合わせの表示
// ⑦「誰の」「誰に」を削除

btn.addEventListener("click", () => addTo());
function addTo() {
  btn.disabled = true;
  const random = Math.floor(Math.random() * gift.length); //①
  const takeGift = gift[random]; //②
  to.innerHTML = takeGift; //③
  gift.splice(random, 1); //④
  //もらってない人がいなくなったらボタンを押せなくする
  if (gift.length === 0) {
    btn.disabled = true;
  }
  matching.push({ gift: from.innerText, person: takeGift }); //⑤
  setTimeout(() => {
    match.innerHTML = ""; //「組み合わせ」内の削除
    //⑥
    matching.map((item) => {
      const div = document.createElement("div");
      div.innerText = `${item.gift} → ${item.person}`;
      matchDisplay.appendChild(div);
    });
    to.innerHTML = ""; //⑦
    from.innerHTML = ""; //⑦
  }, 2000);
}
