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

const member = document.getElementById("member");

window.onload = () => {
  memberList.map((i) => {
    const div = document.createElement("div");
    div.innerText = i;
    div.id = i;
    member.appendChild(div);
  });
};
