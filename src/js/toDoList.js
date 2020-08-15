const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  PendingList = document.querySelector(".js-Pending"),
  FinishedList = document.querySelector(".js-Finished");

const Pending_LS = "Pending";
const Finished_LS = "Finished";
let Pending = [];
let Finished = [];
let id__p = 0; //PendingList의 id용 변수
let id__f = 0; //FinishedList의 id용 변수

//========================== 목록 그리기 ====================================

//목록 그리기 - Pending
function paintToDo__byPending(text) {
  const li = document.createElement("li");
  //요소 생성

  const finBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  id__p++;
  const newId = "a" + id__p;
  finBtn.innerText = "✔";
  finBtn.addEventListener("click", finishToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo__byPendingList);

  const span = document.createElement("span");
  span.innerText = text;
  li.id = newId;
  li.style.color = "white";
  //요소의 속성 붙이기

  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(delBtn);
  PendingList.appendChild(li); //요소를 특정한 곳에 붙이기

  const toDoObj = {
    text: text,
    id: newId
  };

  Pending.push(toDoObj); //배열에 값 넣기
  saveToDos__Pending();
}

//목록 그리기 - Finished
function paintToDo__byFinished(text) {
  const li = document.createElement("li"); //요소 생성

  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");

  id__f++;
  const newId = "b" + id__f;
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backToPending);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo__byFinishedList);

  const span = document.createElement("span");
  span.innerText = text;
  li.id = newId;
  li.style.color = "white";
  //요소의 속성 붙이기

  li.appendChild(span);
  li.appendChild(backBtn);
  li.appendChild(delBtn);
  FinishedList.appendChild(li); //요소를 특정한 곳에 붙이기

  const toDoObj = {
    text: text,
    id: newId
  };

  Finished.push(toDoObj); //배열에 값 넣기
  saveToDos__Finished();
}

//========================= 완료 & 보류 =====================================

//할 일 완료
function finishToDo(event) {
  const li = document.createElement("li");

  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");

  const target = event.target;
  const choice = target.parentNode;
  id__f++;
  const newId = "b" + id__f;
  const getText = choice.querySelector("span");
  const text = getText.innerText;

  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backToPending);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo__byFinishedList);

  const span = document.createElement("span");
  span.innerText = text;
  li.id = newId;
  li.style.color = "white";

  li.appendChild(span);
  li.appendChild(backBtn);
  li.appendChild(delBtn);

  PendingList.removeChild(choice);
  FinishedList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  //Pending에서 값을 지우고 Finished에 저장
  const cleanToDos = Pending.filter(function (Pending) {
    return Pending.id !== choice.id;
  });
  Pending = cleanToDos;

  Finished.push(toDoObj); //배열에 값 넣기

  saveToDos__Pending();
  saveToDos__Finished();
}

// 할 일 보류
function backToPending(event) {
  const li = document.createElement("li");

  const finBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  finBtn.innerText = "✔";
  finBtn.addEventListener("click", finishToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo__byPendingList);

  const target = event.target;
  const choice = target.parentNode;
  id__p++;
  const newId = "a" + id__p;
  const getText = choice.querySelector("span");
  const text = getText.innerText;

  finBtn.innerText = "✔";
  finBtn.addEventListener("click", finishToDo);
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo__byPendingList);

  const span = document.createElement("span");
  span.innerText = text;
  li.id = newId;
  li.style.color = "white";

  li.appendChild(span);
  li.appendChild(finBtn);
  li.appendChild(delBtn);

  FinishedList.removeChild(choice);
  PendingList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  //Finished에서 값을 지우고 Pending에 저장
  const cleanToDos = Finished.filter(function (Finished) {
    return Finished.id !== choice.id;
  });
  Finished = cleanToDos;

  Pending.push(toDoObj); //배열에 값 넣기

  saveToDos__Finished();
  saveToDos__Pending();
}

//=============================== 목록 삭제 ================================

//목록 삭제 - PendingList
function deleteToDo__byPendingList(event) {
  const target = event.target;
  const choice = target.parentNode;
  PendingList.removeChild(choice);
  const cleanToDos = Pending.filter(function (Pending) {
    return Pending.id !== choice.id;
  });

  Pending = cleanToDos;
  saveToDos__Pending();
}

//목록 삭제 - FinishedList
function deleteToDo__byFinishedList(event) {
  const target = event.target;
  const choice = target.parentNode;
  FinishedList.removeChild(choice);

  console.log("sex");
  const cleanToDos = Finished.filter(function (Finished) {
    return Finished.id !== choice.id;
  });

  Finished = cleanToDos;
  saveToDos__Finished();
}

//===================== 로컬 스토리지에 저장하기 ==============================

//★★★왜인지는 모르곘는데 setItem을 두 개 동시에 쓰면 저장이 안된다.★★★

//로컬 스토리지에 저장 - pending
function saveToDos__Pending() {
  localStorage.setItem(Pending_LS, JSON.stringify(Pending)); //object → string
  //localStorage.setItem(Finished_LS, JSON.stringify(Finished));
}

//로컬 스토리지에 저장 - Finished
function saveToDos__Finished() {
  //localStorage.setItem(Pending_LS, JSON.stringify(Pending)); //object → string
  localStorage.setItem(Finished_LS, JSON.stringify(Finished));
}

//============================================================================

//로컬 스토리지에 있는 값을 기반으로 목록 불러오기
function loadToDos() {
  const loadedToDos__Pending = localStorage.getItem(Pending_LS);
  if (loadedToDos__Pending !== null) {
    const parsedToDos = JSON.parse(loadedToDos__Pending); //string → object
    parsedToDos.forEach(function (toDo) {
      paintToDo__byPending(toDo.text);
    });
  }
  const loadedToDos__Finished = localStorage.getItem(Finished_LS);
  if (loadedToDos__Finished !== null) {
    const parsedToDos = JSON.parse(loadedToDos__Finished); //string → object
    parsedToDos.forEach(function (toDo) {
      paintToDo__byFinished(toDo.text);
    });
  }
}

//할 일 저장
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo__byPending(currentValue);
  toDoInput.value = "";
}

//초기화
function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
