//Global Variables
const input = document.getElementById("txtTaskName");
const form = document.getElementById("form");
const addButton = document.getElementById("btnAddNewTask");
const clearButton = document.getElementById("btnAddNewClear");
const progressBar = document.getElementById("progress-bar");
const taskList = document.getElementById("task-list");
const deleteTaskItem = document.getElementById("delete-task-item");
const infoGiverPTag = document.getElementById("info-giver");
const calculationResult = document.getElementById("calculation-result");
const body = document.querySelector("body");
let toDoList = [];

// Macro Function

let allEvents = () => {
  addButton.addEventListener("click", newAdd);
  clearButton.addEventListener("click", deleteAll);
  taskList.addEventListener("click", deleteItem);
  taskList.addEventListener("click", editItem);
  body.addEventListener("click", infoGiver);
};

// Micro Functions
let newAdd = (e) => {
  e.preventDefault();

  if (input.value == "") {
    alert("Please enter a value");
    return;
  }

  const li = document.createElement("li");
  li.classList = "list-group-item list-group-item-warning";
  li.setAttribute("id", "task-item");
  li.innerHTML = `
        <input class="form-check-input mt-1" type="checkbox" id="checkbox" onclick="updateLi(this)" value="" aria-label="Checkbox for following text input">
  `;

  //   li.appendChild(document.createTextNode(input.value));
  let label = document.createElement("label");
  label.innerText = input.value;
  li.appendChild(label);

  const aDelete = document.createElement("a");
  aDelete.classList = "btn btn-sm btn-outline-danger float-end";
  aDelete.setAttribute("href", "#");
  aDelete.setAttribute("id", "delete-task-item");
  aDelete.innerHTML = "Delete";

  const aEdit = document.createElement("a");
  aEdit.classList = "btn btn-sm btn-outline-success float-end me-2";
  aEdit.setAttribute("href", "#");
  aEdit.setAttribute("id", "edit-task-item");
  aEdit.innerHTML = "Edit";

  li.appendChild(aDelete);
  li.appendChild(aEdit);
  taskList.appendChild(li);

  let taskItemLength = document.querySelectorAll("#task-item").length;
  toDoList.push({ id: taskItemLength, task: input.value });
  console.log(toDoList);

  input.value = "";
};

let updateLi = (value) => {
  if (value.checked) {
    value.parentElement.classList = "list-group-item list-group-item-success";
    infoGiver();
  } else {
    value.parentElement.classList = "list-group-item list-group-item-warning";
    infoGiver();
  }
};

let deleteAll = (e) => {
  taskList.innerHTML = "";
  toDoList = [];
};

let deleteItem = (e) => {
  if (e.target.id === "delete-task-item") {
    e.target.parentElement.remove();
    return;
  }
};

let editItem = (e) => {
  if (e.target.id === "edit-task-item") {
    let div = document.createElement("div");
    div.classList = "d-flex align-items-center";
    div.innerHTML = `
    <input type=text id="change-input" placeholder="Enter the task that you want to change">
    <button id="change-input-button" class="btn btn-sm btn-outline-success ms-3">Change</button>
    `;
    div.children[0].style.width = "500px";
    e.target.parentElement.appendChild(div);

    const changeInput = document.getElementById("change-input");
    const changeInputButton = document.getElementById("change-input-button");

    changeInputButton.addEventListener("click", function () {
      e.target.previousElementSibling.previousElementSibling.textContent =
        changeInput.value;
      //   changeInput.value = "";
      div.remove();
    });

    return;
  }
};

let liCounter = () => {
  let liTags = document.querySelectorAll("li");
  console.log(liTags.length);
  return liTags.length;
};

let checkedCounter = () => {
  let myArray = [];
  let inputTags = document.querySelectorAll("input");
  for (let i of inputTags) {
    if (i.checked) {
      myArray.push(i);
    }
  }

  if (clearButton.onclick) {
    myArray = [];
  }

  console.log(myArray.length);
  return myArray.length;
};

let infoGiver = () => {
  checkedCounter();
  let checkedCount = checkedCounter();
  let allCount = liCounter();
  let result = Math.floor((checkedCount / allCount) * 100);

  result = isNaN(result) ? 0 : result;

  infoGiverPTag.innerHTML = `
  ${checkedCount} tasks are finished, ${allCount} tasks are waiting for being finished!
  `;

  calculationResult.innerText = result;

  progressBar.children[0].style.width = result + "%";
  progressBar.children[0].setAttribute("aria-valuenow", result);
};

// Executing Functions

allEvents();
