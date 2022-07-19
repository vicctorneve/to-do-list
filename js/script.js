const inputAddTask = document.querySelector('#input-new-task');
const btnAddTask = document.querySelector('#add-task');
const btnDeleteAllTasks = document.querySelector('.btn-delete-all-task');
let containerTask = document.querySelector('.container-task');
let toDoList = [];
let li;

inputAddTask.addEventListener('keypress', function(e) {
   if (e.key === 'Enter'){
      if (!inputAddTask.value) return;
      createTask(inputAddTask.value);
   }
})
btnAddTask.addEventListener('click', function () {
   if (!inputAddTask.value) return;
   createTask(inputAddTask.value)
})
function createTask (textInput){
   createLi();
   li.innerText = textInput;
   addClassLi();
   containerTask.appendChild(li);
   cleanInput();
   createBtnDelete();
   saveTasks();
   toDoList.push(li);
   verifyQtdLi();
}
function createLi() {li = document.createElement('li')}

function addClassLi() {li.classList.add('task');}

function verifyQtdLi() {
   toDoList.length >= 2 ? btnDeleteAllTasks.style.display = 'block' : btnDeleteAllTasks.style.display = 'none';
}
btnDeleteAllTasks.addEventListener('click', function () {
   containerTask.innerHTML = '';
   toDoList = [];
   verifyQtdLi();
   saveTasks();
});

function cleanInput(){
   inputAddTask.value = '';
   inputAddTask.focus();
}

function addClassBtnDelete(btnDelete){
   btnDelete.setAttribute('class', 'delete');
   btnDelete.setAttribute('title', 'Delete task');
}

function createBtnDelete(){
   const btnDelete = document.createElement('button');
   li.appendChild(btnDelete);
   addClassBtnDelete(btnDelete);
}

document.addEventListener('click', function(e) {
   const el = e.target;
   if (el.classList.contains('delete')) {
      el.parentElement.remove();
      toDoList.pop();
      verifyQtdLi();
      saveTasks();
   }
});

function saveTasks() {
   const liTasks = containerTask.querySelectorAll('li');
   const toDoList = [];

   for (let task of liTasks) {
      let taskText = task.innerText;
      toDoList.push(taskText);
   }

   const taskJSON = JSON.stringify(toDoList);
   localStorage.setItem('tasks', taskJSON);
}

function addBackupTask(){
   const tasks = localStorage.getItem('tasks');
   const toDoList = JSON.parse(tasks);
   for (let task of toDoList) {
      createTask(task);
   }
}
addBackupTask();