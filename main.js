const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

//ローカルストレージに保存されているデータを取得
const todos = JSON.parse(localStorage.getItem("todos"));

//ローカルストレージにデータがあれば、forEachで一つずつ取り出してadd関数に渡す
if (todos) {
	todos.forEach((todo) => {
		add(todo);
	});
}
//form要素にsubmitイベントを追加
form.addEventListener("submit", function (e) {
	e.preventDefault();
	input.value;
	add();
});

//add機能を実装する関数
function add(todo) {
	let todoText = input.value;
	//ローカルストレージにデータがあれば、todoTextに代入
	if (todo) {
		todoText = todo.text;
	}
	//todoTextが空でなければ、li要素を作成
	if (todoText) {
		const li = document.createElement("li");
        //li要素にtodoTextを代入
		li.innerText = todoText;
        //li要素にlist-group-itemクラスを追加
		li.classList.add("list-group-item");

        //todoがあり、completedがtrueなら、li要素に罫線を追加
		if (todo && todo.completed) {
            //li要素にtext-decoration-line-throughクラスを追加
			li.classList.add("text-decoration-line-through");
		}
		//li要素に削除イベントを追加
		li.addEventListener("contextmenu", function (e) {
			e.preventDefault();
			li.remove();
			saveData();
		});
		//li要素に罫線追加のイベントを追加
		li.addEventListener("click", function () {
            //クラスを追加すると罫線が追加される
			li.classList.toggle("text-decoration-line-through");
            //ローカルストレージにデータを保存
			saveData();
		});
		//ul要素にli要素を追加
		ul.appendChild(li);
        //input要素のvalueを空にする
		input.value = "";
        //ローカルストレージにデータを保存
		saveData();
	}
}

//ローカルストレージにデータを保存する関数
function saveData() {
	const lists = document.querySelectorAll("li");
	//新しい空の配列を作成
	let todos = [];
	//listsにあるli要素を一つずつ取り出して、オブジェクトを作成し、配列に追加
	lists.forEach((list) => {
		//オブジェクトを作成
		let todo = {
			text: list.innerText,
			completed: list.classList.contains("text-decoration-line-through"),
		};
		//配列に追加
		todos.push(todo);
	});
	//ローカルストレージにデータを保存
	localStorage.setItem("todos", JSON.stringify(todos));
}
