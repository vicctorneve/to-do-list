const inputAddTask = document.querySelector('#input-new-task');
const btnAddTask = document.querySelector('#add-task');
const btnDeleteAllTasks = document.querySelector('.btn-delete-all-task');
let containerTask = document.querySelector('.container-task');
let toDoList = [];
let li;

inputAddTask.addEventListener('keypress', function(e) {
   if (e.keyCode === 13){
      if (!inputAddTask.value) return;
      createTask(inputAddTask.value);
   }
})
// function createCheckbox() {
//    const checkbox = document.createElement('input')
//    checkbox.type = 'checkbox';
//    return checkbox
// }
btnAddTask.addEventListener('click', function () {
   if (!inputAddTask.value) return;
   createTask(inputAddTask.value)
})

function createTask (textInput){
   createLi();
   // const checkbox = createCheckbox();
   // li.appendChild(checkbox);
   li.innerText = textInput;
   addClassLi();
   containerTask.appendChild(li);
   cleanInput();
   createBtnDelete();
   saveTasks();
   console.log(toDoList);
   toDoList.push(li);
   addBtnDeleteAllTasks();
}
function addBtnDeleteAllTasks() {
   toDoList.length >= 2 ? btnDeleteAllTasks.style.display = 'block' : btnDeleteAllTasks.style.display = 'none';
}

btnDeleteAllTasks.addEventListener('click', function () {
   containerTask.innerHTML = '';
   saveTasks();
})

function createLi() {li = document.createElement('li')}

function addClassLi() {li.classList.add('task');}
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



