//名簿
const memberList = [
  "今井さん",
  "河田さん",
  "後藤さん",
  "澤田さん",
  "鈴木さん",
  "瀬古さん",
  "ノムラさん",
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

//まだ渡してない人
const santaClaus = [...memberList];

//残りのプレゼント
const gift = [...memberList];

//決まった組み合わせ
const matching = [];

//「誰へ」のシャッフルのオンオフの制御
let timeId;

//何度も使うクラス
const btnStyle = "cursor-pointer  border border-solid rounded-full p-4";
const memberStyle = `${btnStyle} shadow-2xl bg-white font-dot`;

const clickStyle = "bg-present1 bg-cover h-28 w-28 font-bold";

const member = document.getElementById("member");
const from = document.getElementById("from");
const to = document.getElementById("to");
const btn = document.getElementById("btn");
const matchDisplay = document.getElementById("match");

//ロード時の実装
//①メンバーのタグを作成
//②id=memberのdiv内に追加
//③ランダムタグを作成
//④id=memberのdiv内の最後尾に追加
window.onload = () => {
  memberList.map((item) => {
    //①
    const div = document.createElement("div");
    div.innerText = item;
    div.id = item;
    div.className = memberStyle;
    div.onclick = () => addFrom(item);
    member.appendChild(div); //②
  });
  //③
  const div = document.createElement("div");
  div.innerText = "ランダム";
  div.id = "ランダム";
  div.className = `${btnStyle} bg-black text-white font-dot`;
  div.onclick = () => randomAddFrom(member);
  member.appendChild(div); //④
};

// 渡す人の名前タグを押したときの処理
// ①「誰から」に名前を追加
// ②名前タグの色変更
// ③プレゼントボタンを押せるようにする
// ④「誰へ」の欄がシャッフルされる
// *「誰から」に名前がある場合はクリック不可
// *「組み合わせ」配列の渡す側に名前がある場合は不可
// ①'「誰から」と同じ名前タグをクリックすると戻る
function addFrom(item) {
  const exist = matching.length ? matching.filter((i) => i.gift === item) : [];
  if (from.innerHTML === "" && exist.length === 0) {
    from.innerHTML = item; //①
    const name = document.getElementById(item);
    selectName(name); // ②③
    shuffleName(); //④
  } else if (from.innerHTML === item) {
    resetName(); //①' 
  }
}

// ランダムタグを押したときの処理
// ①まだ渡してない人の中から一人選ぶ(乱数生成)
// ②選ばれた人の名前を変色
// ③「誰から」の欄に選ばれた名前が入る
// ④「誰へ」の欄のシャッフル開始
// ①'「誰から」に名前があれば消す
function randomAddFrom() {
  if (!from.innerHTML && santaClaus.length) {
    const random = Math.floor(Math.random() * santaClaus.length);//①
    from.innerHTML = santaClaus[random];//①
    const name = document.getElementById(santaClaus[random]);
    selectName(name); //②③
    shuffleName(); //④
  } else if (from.innerHTML) {
    resetName(); //①'
  }
}

//「誰から」を押したとき
// ①指名のキャンセル
// ②名前一覧の変色を戻す
// *名前が無いときは無反応
from.addEventListener("click", () => clearName());
function clearName() {
  if (from.innerHTML) resetName(); //①②
}


//シャッフルボタンを押したとき
// ①シャッフルを止める
// ②ボタンを押せなくする
// *「誰から」と「誰へ」は被らない
// ③まだもらってない人から一人選ぶ(乱数生成)
// ④「誰へ」に表示
// ⑤まだもらってない人の配列から削除
// ⑥まだ渡してない人の配列から削除
// ⑦組み合わせ配列に追加
// ⑧組み合わせの表示
// ⑨「誰の」「誰へ」を削除

btn.addEventListener("click", () => addTo());
function addTo() {
  if (timeId) {
    resetInterval(); //①
  }
  clickReset(); //②
  //　残り2人になったとき最後の「誰から」と「誰へ」が被らないように場合分け
  if (gift.length === 2) {
    const mix = [...gift, ...santaClaus];
    const dup = new Set(mix);
    if (dup.size !== mix.length) {
      const dupName = mix.find(
        (person, index) => index !== mix.lastIndexOf(person)
      );
      to.innerHTML =
        from.innerHTML !== dupName
          ? dupName
          : gift.find((i) => i !== from.innerHTML);
    } else {
      //「誰から」の入力値を「誰へ」の選択肢から排除
      const removeFrom = gift.filter((item) => item !== from.innerHTML);
      const random = Math.floor(Math.random() * removeFrom.length); //③
      const takeGift = removeFrom[random]; //③
      to.innerHTML = takeGift; //④
    }
  } else {
    const removeFrom = gift.filter((item) => item !== from.innerHTML);
    const random = Math.floor(Math.random() * removeFrom.length); //③
    const takeGift = removeFrom[random]; //③
    to.innerHTML = takeGift; //④
  }

  const index = gift.indexOf(to.innerHTML); //⑤
  gift.splice(index, 1); //⑤
  //もらってない人がいなくなったらボタンを押せなくする
  if (gift.length === 0) {
    btn.disabled = true;
  }
  matching.push({ gift: from.innerText, person: to.innerText }); //⑦
  // 0.5秒待って処理
  setTimeout(() => {
    matchDisplay.innerHTML = ""; //「組み合わせ」内の削除
    const index2 = santaClaus.indexOf(from.innerHTML); //⑥
    santaClaus.splice(index2, 1); //⑥

    //⑧
    matching.map((item, index) => {
      const div = document.createElement("div");
      div.className = "text-2xl mt-2 rounded-full opacity-80 text-white";
      if (index % 2 === 0) div.className = `${div.className} bg-green-800`;
      if (index % 2 === 1) div.className = `${div.className} bg-red-700`;
      div.innerText = `${item.gift} → ${item.person}`;
      matchDisplay.appendChild(div);
    });
    to.innerHTML = ""; //⑨
    from.innerHTML = ""; //⑨
  }, 500);

  if (gift.length === 0) {
    const bodyBlinder = document.createElement("div");
    bodyBlinder.className =
      "opacity-60 bg-black w-full h-full fixed inset-0 z-10";
    document.body.appendChild(bodyBlinder);

    const result = document.createElement("div");
    result.className =
      "fixed inset-0 m-auto mx-20 my-12 rounded-2xl bg-present bg-[rgba(255,255,255,0.8)] bg-blend-lighten bg-opacity-90 z-20";
    document.body.appendChild(result);

    const reloadBtn = document.createElement("button");
    reloadBtn.innerHTML = "リセット";
    reloadBtn.className = `${btnStyle} bg-blue-700 text-white shadow-2xl font-dot absolute right-12 top-4`;
    reloadBtn.onclick = () => location.reload();
    result.appendChild(reloadBtn);

    const resultText = document.createElement("div");
    resultText.innerHTML = "結果";
    resultText.className = "text-4xl text-center font-dot my-8 ";
    result.appendChild(resultText);

    const container = document.createElement("div");
    container.className = "flex flex-wrap justify-center gap-4";
    result.appendChild(container);

    matching.map((item, index) => {
      const div = document.createElement("div");
      div.className =
        "text-2xl p-2 text-center rounded-full opacity-90 text-white w-[40%]";
      if ((index + 4) % 4 === 0 || (index + 4) % 4 === 3)
        div.className = `${div.className} bg-green-800`;
      else div.className = `${div.className} bg-red-700`;
      div.innerText = `${item.gift} → ${item.person}`;
      container.appendChild(div);
    });
  }
}

function shuffleName() {
  if (!timeId) {
    timeId = setInterval(() => {
      const random = Math.floor(Math.random() * gift.length);
      const name = gift[random];
      to.innerHTML = name;
    }, 100);
  }
}

function selectName(name) {
  name.className = `${btnStyle} bg-gray-600`;
  btn.disabled = false;
  btn.className = `${clickStyle} shadow-2xl bg-white rounded-full font-dot`;
  btn.innerHTML = "クリック！";
}

function resetName() {
  const name = document.getElementById(from.innerHTML);
  name.className = memberStyle;
  from.innerHTML = "";
  clickReset();
  if (timeId) {
    resetInterval();
  }
}

function clickReset() {
  btn.disabled = true;
  btn.className = clickStyle;
  btn.innerHTML = "";
}

function resetInterval() {
  clearInterval(timeId);
  to.innerHTML = "";
  timeId = undefined;
}
