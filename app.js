//define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// EventListeners function
function loadEventListeners(){
  // Get From Local Storage DOM event Listener
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add a Task
  form.addEventListener('submit',addTask);
  //Filter
  filter.addEventListener('keyup',filterTasks);
  //remove a Task
  taskList.addEventListener('click',removeTask);
  //Clear all Tasks
  clearBtn.addEventListener('click',clearTasks);
}

// get Tasks function
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task){
    // Create an Li element
  const li = createLiElement(task);
   // Push it to the DOM
  taskList.appendChild(li);
  })

}

// add task function
function addTask(e){
  if(taskInput.value===""){
    alert("No value entered by the user");
  }
  else{
  console.log(taskInput.value+' '+'task added');
  // Create an element
  const li = createLiElement(taskInput.value);
  // Push it to the DOM
  taskList.appendChild(li);
  // Store it in local Storage
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(taskInput.value);
  localStorage.setItem('tasks',JSON.stringify(tasks));

  taskInput.value ="";
  }
  e.preventDefault();
}

//Create An Li Element
function createLiElement(text){
  const li = document.createElement('li');
  li.className ='collection-item';
  li.appendChild(document.createTextNode(text));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  return li;
}

// Filter Tasks Function
function filterTasks(e){
  const val = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (li){
    //console.log(li.textContent.toLowerCase());
    if(li.textContent.toLowerCase().indexOf(val) !=-1){
      li.style.display ='block';
    }
    else{
      li.style.display = 'none';
    }
  })
}

//Remove a Task function
function removeTask(e){
  if(e.target.classList.contains('fa-remove')){
    e.target.parentElement.parentElement.remove();
    // remove Task from local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks =[];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear All Task function
function clearTasks(e){
  //console.log(taskList.children.length)
  
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  //delete from local storage
  clearTasksFromLocalStorage();
  e.preventDefault();
}

// Clear all tasks from local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
